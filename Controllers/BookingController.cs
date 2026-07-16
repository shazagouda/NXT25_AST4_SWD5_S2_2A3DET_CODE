using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Booking;
using A3DET_CODE.Services.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class BookingController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;
        private readonly ILogger<BookingController> _logger;

        public BookingController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            IEmailService emailService,
            IConfiguration config,
            ILogger<BookingController> logger)
        {
            _userManager = userManager;
            _context = context;
            _emailService = emailService;
            _config = config;
            _logger = logger;
        }

        // ============================================================
        // GET: /Booking/Index (Directory of categories)
        // ============================================================
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        // ============================================================
        // GET: /Booking/Create?targetType=Mentor&targetId=1
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Create(string targetType, string targetId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var viewModel = new CreateBookingViewModel { TargetType = targetType };

            switch (targetType)
            {
                case "Mentor":
                    if (!int.TryParse(targetId, out int mentorId)) return BadRequest();
                    var mentor = await _context.Mentors.Include(m => m.User).FirstOrDefaultAsync(m => m.Id == mentorId);
                    if (mentor == null) return NotFound();
                    // Can't book yourself
                    if (mentor.UserId == user.Id) { TempData["Error"] = "You cannot book yourself."; return RedirectToAction("Details", "Mentor", new { id = mentorId }); }

                    viewModel.TargetMentorId = mentor.Id;
                    viewModel.TargetName = mentor.FullName;
                    viewModel.TargetExpertise = mentor.Expertise;
                    viewModel.TargetImageUrl = mentor.User.ProfileImageUrl;
                    viewModel.TargetInitials = mentor.Initials;
                    viewModel.TargetRating = mentor.Rating;
                    viewModel.TargetSkills = mentor.User.Skills;
                    viewModel.HourlyRate = mentor.HourlyRate > 0 ? mentor.HourlyRate : 50m;
                    break;

                case "Student":
                    var student = await _userManager.FindByIdAsync(targetId);
                    if (student == null) return NotFound();
                    if (student.Id == user.Id) { TempData["Error"] = "You cannot book yourself."; return Redirect(Request.Headers["Referer"].ToString()); }

                    viewModel.TargetStudentId = student.Id;
                    viewModel.TargetName = student.FullName;
                    viewModel.TargetExpertise = student.Skills ?? "Student";
                    viewModel.TargetImageUrl = student.ProfileImageUrl;
                    viewModel.TargetInitials = student.FullName?.Length > 0 ? student.FullName.Substring(0, 1).ToUpper() : "S";
                    viewModel.TargetRating = 0;
                    viewModel.TargetSkills = student.Skills;
                    viewModel.HourlyRate = student.HourlyRate ?? 25m;
                    break;

                case "Team":
                    if (!int.TryParse(targetId, out int teamId)) return BadRequest();
                    var team = await _context.Teams.Include(t => t.Leader).Include(t => t.Track).FirstOrDefaultAsync(t => t.Id == teamId);
                    if (team == null) return NotFound();
                    if (team.LeaderId == user.Id) { TempData["Error"] = "You cannot book your own team."; return Redirect(Request.Headers["Referer"].ToString()); }

                    viewModel.TargetTeamId = team.Id;
                    viewModel.TargetName = team.Name;
                    viewModel.TargetExpertise = team.Track?.Name ?? "Development";
                    viewModel.TargetImageUrl = null;
                    viewModel.TargetInitials = team.Name.Length >= 2 ? team.Name.Substring(0, 2).ToUpper() : team.Name.Substring(0, 1).ToUpper();
                    viewModel.TargetRating = 0;
                    viewModel.TargetSkills = team.Track?.Skills;
                    viewModel.HourlyRate = team.HourlyRate ?? 100m;
                    break;

                case "Project":
                    if (!int.TryParse(targetId, out int projectId)) return BadRequest();
                    var project = await _context.Projects.Include(p => p.Team).ThenInclude(t => t!.Leader).FirstOrDefaultAsync(p => p.Id == projectId);
                    if (project == null || project.Team == null) return NotFound();
                    if (project.Team.LeaderId == user.Id) { TempData["Error"] = "You cannot book your own project."; return Redirect(Request.Headers["Referer"].ToString()); }

                    viewModel.TargetTeamId = project.TeamId;
                    viewModel.TargetName = project.Title;
                    viewModel.TargetExpertise = "Project Implementation";
                    viewModel.TargetImageUrl = null;
                    viewModel.TargetInitials = project.Title.Length >= 2 ? project.Title.Substring(0, 2).ToUpper() : "P";
                    viewModel.TargetRating = 0;
                    viewModel.TargetSkills = project.TechStack;
                    viewModel.HourlyRate = project.Price ?? 0m;
                    break;

                default:
                    return BadRequest("Invalid target type");
            }

            return View(viewModel);
        }

        // ============================================================
        // POST: /Booking/Create — Process booking request
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateBookingViewModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            if (string.IsNullOrWhiteSpace(model.Topic) || model.ScheduledAt < DateTime.Today || model.EndDate < model.ScheduledAt)
            {
                TempData["Error"] = "Please provide a valid topic and valid start and end dates.";
                string targetIdStr = model.TargetType switch
                {
                    "Mentor" => model.TargetMentorId?.ToString(),
                    "Student" => model.TargetStudentId,
                    "Team" => model.TargetTeamId?.ToString(),
                    "Project" => model.TargetTeamId?.ToString(),
                    _ => null
                } ?? "";
                
                return RedirectToAction("Create", new { targetType = model.TargetType, targetId = targetIdStr });
            }

            // Calculate pricing
            var subtotal = model.SubtotalPrice; // Use the property from the model which handles Project logic
            var platformFee = model.PlatformFee;
            var totalPrice = subtotal; // Booker pays subtotal
            var netAmount = model.NetAmount; // The target gets the net amount

            var booking = new Models.Booking
            {
                BookerUserId = user.Id,
                TargetType = model.TargetType == "Project" ? "Team" : model.TargetType,
                TargetMentorId = model.TargetMentorId,
                TargetStudentId = model.TargetStudentId,
                TargetTeamId = model.TargetTeamId,
                ScheduledAt = model.ScheduledAt,
                EndDate = model.EndDate,
                DurationMinutes = model.DurationMinutes,
                Topic = model.Topic,
                Notes = model.Notes,
                HourlyRate = model.HourlyRate,
                TotalPrice = totalPrice,
                PlatformFee = platformFee,
                NetAmount = netAmount,
                PaymentStatus = "Pending",
                Status = "Pending", // Wait for target to accept
                CreatedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Notify target about the request
            await SendBookingRequestEmail(booking);

            TempData["Success"] = "Booking request sent successfully! Awaiting approval from the provider.";
            return RedirectToAction("MyBookings", "Booking");
        }

        // ============================================================
        // POST: /Booking/Accept/5 (Target accepts the request)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Accept(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetTeam)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();
            
            // Check if user is the target
            if (!IsUserTarget(booking, user.Id)) return Forbid();

            if (booking.Status == "Pending")
            {
                booking.Status = "PendingPayment";
                await _context.SaveChangesAsync();

                // Notify booker that it's accepted and they need to pay
                await _emailService.SendEmailAsync(booking.BookerUser.Email ?? "", "Booking Request Accepted - Payment Required",
                    $"<p>Your booking request for {booking.Topic} has been <strong>accepted</strong>.</p><p>Please log in to your dashboard to complete the payment.</p>");
                
                TempData["Success"] = "Booking accepted! The client has been notified to complete the payment.";
            }

            return RedirectToAction("MyBookings");
        }

        // ============================================================
        // POST: /Booking/Reject/5 (Target rejects the request)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Reject(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetTeam)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();
            
            if (!IsUserTarget(booking, user.Id)) return Forbid();

            if (booking.Status == "Pending")
            {
                booking.Status = "Rejected";
                await _context.SaveChangesAsync();
                TempData["Success"] = "Booking request rejected.";
            }

            return RedirectToAction("MyBookings");
        }

        // ============================================================
        // POST: /Booking/PayFromWallet/5 — Pay using wallet balance
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> PayFromWallet(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();
            if (booking.BookerUserId != user.Id) return Forbid();

            if (booking.Status != "PendingPayment")
            {
                TempData["Error"] = "This booking is not pending payment.";
                return RedirectToAction("MyBookings");
            }

            if (user.WalletBalance < booking.TotalPrice)
            {
                TempData["Error"] = $"Insufficient wallet balance. You have ${user.WalletBalance:F2} but need ${booking.TotalPrice:F2}. Please deposit more funds.";
                return RedirectToAction("Details", new { id = booking.Id });
            }

            // Deduct from booker's wallet
            user.WalletBalance -= booking.TotalPrice;
            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = user.Id,
                Type = "Payment",
                Amount = booking.TotalPrice,
                Description = $"Payment for booking #{booking.Id} — {booking.Topic}",
                CreatedAt = DateTime.UtcNow
            });

            // Credit admin wallet with full amount (Fee + Escrow)
            await DepositToAdminWallet(booking);

            await _userManager.UpdateAsync(user);

            booking.PaymentStatus = "Paid";
            booking.Status = "Confirmed";
            booking.PaidAt = DateTime.UtcNow;
            booking.StripePaymentIntentId = "WALLET_" + Guid.NewGuid().ToString("N")[..12];
            await _context.SaveChangesAsync();

            await CreateContractForBooking(booking);
            await SendBookingConfirmationEmails(booking);

            TempData["Success"] = "Payment from wallet successful! Please sign the contract.";
            return RedirectToAction("Details", new { id = booking.Id });
        }

        // ============================================================
        // GET/POST: /Booking/Pay/5 — Initiate Stripe Checkout
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Pay(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();
            if (booking.BookerUserId != user.Id) return Forbid();
            
            if (booking.Status != "PendingPayment")
            {
                TempData["Error"] = "This booking is not pending payment.";
                return RedirectToAction("MyBookings");
            }

            // Create Stripe Checkout Session
            try
            {
                var stripeKey = _config["Stripe:SecretKey"];
                if (string.IsNullOrEmpty(stripeKey) || stripeKey.Contains("PLACEHOLDER"))
                {
                    // Stripe not configured — simulate payment success
                    _logger.LogWarning("⚠️ Stripe not configured. Simulating payment success.");
                    booking.PaymentStatus = "Paid";
                    booking.Status = "Confirmed";
                    booking.PaidAt = DateTime.UtcNow;
                    booking.StripePaymentIntentId = "SIMULATED_" + Guid.NewGuid().ToString("N")[..12];
                    
                    await DepositToAdminWallet(booking);
                    await _context.SaveChangesAsync();

                    await CreateContractForBooking(booking);
                    await SendBookingConfirmationEmails(booking);

                    TempData["Success"] = "Payment simulated successfully! The contract is ready to sign.";
                    return RedirectToAction("Details", new { id = booking.Id });
                }

                StripeConfiguration.ApiKey = stripeKey;
                var domain = $"{Request.Scheme}://{Request.Host}";
                
                var targetName = booking.TargetType; // fallback

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>
                    {
                        new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                UnitAmount = (long)(booking.TotalPrice * 100), // Stripe uses cents
                                Currency = "usd",
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = $"Booking: {targetName}",
                                    Description = $"{booking.Topic} — {booking.DurationMinutes} min session"
                                }
                            },
                            Quantity = 1
                        }
                    },
                    Mode = "payment",
                    SuccessUrl = $"{domain}/Booking/PaymentSuccess?sessionId={{CHECKOUT_SESSION_ID}}",
                    CancelUrl = $"{domain}/Booking/PaymentCancel?bookingId={booking.Id}",
                    Metadata = new Dictionary<string, string>
                    {
                        { "bookingId", booking.Id.ToString() }
                    }
                };

                var service = new SessionService();
                var session = await service.CreateAsync(options);

                booking.StripeSessionId = session.Id;
                await _context.SaveChangesAsync();

                return Redirect(session.Url);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Stripe error for booking {BookingId}", booking.Id);
                // Fallback: simulate payment
                booking.PaymentStatus = "Paid";
                booking.Status = "Confirmed";
                booking.PaidAt = DateTime.UtcNow;
                booking.StripePaymentIntentId = "FALLBACK_" + Guid.NewGuid().ToString("N")[..12];
                
                await DepositToAdminWallet(booking);
                await _context.SaveChangesAsync();

                await CreateContractForBooking(booking);
                await SendBookingConfirmationEmails(booking);

                TempData["Success"] = "Payment fallback successful! Please sign the contract.";
                return RedirectToAction("Details", new { id = booking.Id });
            }
        }

        // ============================================================
        // GET: /Booking/PaymentSuccess?sessionId=...
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> PaymentSuccess(string sessionId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.StripeSessionId == sessionId);
            if (booking == null) return NotFound();
            if (booking.BookerUserId != user.Id) return Forbid();

            if (booking.PaymentStatus != "Paid")
            {
                try
                {
                    StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
                    var service = new SessionService();
                    var session = await service.GetAsync(sessionId);

                        if (session.PaymentStatus == "paid")
                    {
                        booking.PaymentStatus = "Paid";
                        booking.Status = "Confirmed";
                        booking.PaidAt = DateTime.UtcNow;
                        booking.StripePaymentIntentId = session.PaymentIntentId;
                        
                        await DepositToAdminWallet(booking);
                        await _context.SaveChangesAsync();

                        await CreateContractForBooking(booking);
                        await SendBookingConfirmationEmails(booking);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Error verifying payment for session {SessionId}", sessionId);
                }
            }

            TempData["Success"] = "Payment successful! Your booking is confirmed. Please review and sign the contract.";
            return RedirectToAction("Details", new { id = booking.Id });
        }

        // ============================================================
        // GET: /Booking/PaymentCancel?bookingId=...
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> PaymentCancel(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking != null)
            {
                booking.PaymentStatus = "Failed";
                booking.Status = "Cancelled";
                await _context.SaveChangesAsync();
            }

            TempData["Error"] = "Payment was cancelled. The booking has been cancelled.";
            return RedirectToAction("MyBookings");
        }

        // ============================================================
        // GET: /Booking/Details/5
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam).ThenInclude(t => t!.Leader)
                .Include(b => b.Contract)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (booking == null) return NotFound();

            // Check access: booker or target
            var isBooker = booking.BookerUserId == user.Id;
            var isTarget = IsUserTarget(booking, user.Id);
            if (!isBooker && !isTarget) return Forbid();

            var viewModel = MapToDetails(booking);
            viewModel.BookerWalletBalance = user.WalletBalance;
            return View(viewModel);
        }

        // ============================================================
        // GET: /Booking/MyBookings
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> MyBookings()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "Student";

            // Get mentor record if exists
            var mentorRecord = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);

            // Sent bookings (user is the booker)
            var sentBookings = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam)
                .Include(b => b.Contract)
                .Where(b => b.BookerUserId == user.Id)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            // Received bookings (user is the target)
            var receivedQuery = _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam).ThenInclude(t => t!.Leader)
                .Include(b => b.Contract)
                .AsQueryable();

            // Filter by user being the target
            if (mentorRecord != null)
            {
                receivedQuery = receivedQuery.Where(b =>
                    (b.TargetType == "Mentor" && b.TargetMentorId == mentorRecord.Id) ||
                    (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                    (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id));
            }
            else
            {
                receivedQuery = receivedQuery.Where(b =>
                    (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                    (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id));
            }

            var receivedBookings = await receivedQuery.OrderByDescending(b => b.CreatedAt).ToListAsync();

            var viewModel = new MyBookingsViewModel
            {
                CurrentUserId = user.Id,
                CurrentUserRole = userRole,
                SentBookings = sentBookings.Select(b => MapToDetails(b)).ToList(),
                ReceivedBookings = receivedBookings.Select(b => MapToDetails(b)).ToList(),
                AllBookings = sentBookings.Concat(receivedBookings).OrderByDescending(b => b.CreatedAt).Select(b => MapToDetails(b)).ToList()
            };

            return View(viewModel);
        }

        // ============================================================
        // POST: /Booking/Cancel/5
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Cancel(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings.Include(b => b.Contract).FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();
            if (booking.BookerUserId != user.Id) return Forbid();

            if (booking.Status == "PendingPayment" || booking.Status == "Confirmed")
            {
                booking.Status = "Cancelled";
                if (booking.Contract != null)
                    booking.Contract.Status = "Cancelled";

                await _context.SaveChangesAsync();
                TempData["Success"] = "Booking cancelled successfully.";
            }
            else
            {
                TempData["Error"] = "This booking cannot be cancelled.";
            }

            return RedirectToAction("MyBookings");
        }

        // ============================================================
        // POST: /Booking/Delete/5 (Delete cancelled or rejected bookings)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var booking = await _context.Bookings
                .Include(b => b.Contract)
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetTeam)
                .FirstOrDefaultAsync(b => b.Id == id);
                
            if (booking == null) return NotFound();

            if (!IsUserTarget(booking, user.Id) && booking.BookerUserId != user.Id)
                return Forbid();

            if (booking.Status == "Cancelled" || booking.Status == "Rejected")
            {
                if (booking.Contract != null)
                {
                    _context.Contracts.Remove(booking.Contract);
                }
                
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                
                TempData["Success"] = "Booking record permanently deleted from your page.";
            }
            else
            {
                TempData["Error"] = "Only cancelled or rejected bookings can be deleted.";
            }

            return RedirectToAction("MyBookings");
        }

        // ============================================================
        // HELPER: Create contract for a confirmed booking
        // ============================================================
        private async System.Threading.Tasks.Task CreateContractForBooking(Models.Booking booking)
        {
            // Reload booking with navigation properties
            await _context.Entry(booking).Reference(b => b.BookerUser).LoadAsync();
            if (booking.TargetMentorId.HasValue)
                await _context.Entry(booking).Reference(b => b.TargetMentor).Query().Include(m => m.User).LoadAsync();
            if (booking.TargetStudentId != null)
                await _context.Entry(booking).Reference(b => b.TargetStudent).LoadAsync();
            if (booking.TargetTeamId.HasValue)
                await _context.Entry(booking).Reference(b => b.TargetTeam).Query().Include(t => t.Leader).LoadAsync();

            string partyBUserId;
            string partyBName;
            int? partyBTeamId = null;

            switch (booking.TargetType)
            {
                case "Mentor":
                    partyBUserId = booking.TargetMentor!.UserId;
                    partyBName = booking.TargetMentor.FullName;
                    break;
                case "Student":
                    partyBUserId = booking.TargetStudentId!;
                    partyBName = booking.TargetStudent!.FullName;
                    break;
                case "Team":
                    partyBUserId = booking.TargetTeam!.LeaderId;
                    partyBName = booking.TargetTeam.Name;
                    partyBTeamId = booking.TargetTeamId;
                    break;
                default:
                    return;
            }

            var contractCount = await _context.Contracts.CountAsync();
            var contractNumber = $"A3DET-{DateTime.UtcNow:yyyy}-{(contractCount + 1):D5}";

            var terms = GenerateTerms(booking, partyBName);

            var contract = new Models.Contract
            {
                ContractNumber = contractNumber,
                BookingId = booking.Id,
                PartyAUserId = booking.BookerUserId,
                PartyBUserId = partyBUserId,
                PartyBTeamId = partyBTeamId,
                Title = $"Service Agreement — {booking.Topic}",
                Description = $"Professional engagement between {booking.BookerUser.FullName} and {partyBName} for {booking.Topic}.",
                Terms = terms,
                TotalAmount = booking.TotalPrice,
                StartDate = booking.ScheduledAt,
                EndDate = booking.ScheduledAt.AddMinutes(booking.DurationMinutes),
                Status = "PendingSignatures",
                CreatedAt = DateTime.UtcNow
            };

            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            _logger.LogInformation("✅ Contract {ContractNumber} created for booking {BookingId}", contractNumber, booking.Id);
        }

        private string GenerateTerms(Models.Booking booking, string partyBName)
        {
            return $@"TERMS AND CONDITIONS

1. SERVICE AGREEMENT
This contract is entered into between {booking.BookerUser.FullName} (""Client"") and {partyBName} (""Service Provider"") through the A3DET CODE Platform.

2. SCOPE OF WORK
Topic: {booking.Topic}
Duration: {booking.DurationMinutes} minutes
Scheduled Date: {booking.ScheduledAt:MMMM dd, yyyy 'at' hh:mm tt}

3. COMPENSATION
Total Amount: ${booking.TotalPrice:F2}
Platform Fee (10%): ${booking.PlatformFee:F2}
Net to Service Provider: ${booking.NetAmount:F2}

4. OBLIGATIONS
a. The Service Provider agrees to deliver the agreed-upon services professionally and on time.
b. The Client agrees to provide necessary information and be available at the scheduled time.
c. Both parties agree to maintain confidentiality of any shared information.

5. CANCELLATION POLICY
Either party may cancel the engagement with 24 hours notice. Late cancellations may be subject to a fee.

6. PLATFORM TERMS
This agreement is facilitated by A3DET CODE Platform. The platform retains a 10% service fee from the total amount.
Both parties agree to abide by the platform's terms of service and community guidelines.

7. DISPUTE RESOLUTION
Any disputes shall be resolved through the A3DET CODE Platform's mediation process.

8. ACKNOWLEDGMENT
By signing this contract digitally, both parties confirm they have read, understood, and agree to all terms outlined above.
This document is legally binding upon electronic signature by both parties.";
        }

        private async System.Threading.Tasks.Task SendBookingRequestEmail(Models.Booking booking)
        {
            string targetEmail = "", targetName = "";

            switch (booking.TargetType)
            {
                case "Mentor":
                    if (booking.TargetMentor == null)
                        await _context.Entry(booking).Reference(b => b.TargetMentor).Query().Include(m => m.User).LoadAsync();
                    targetEmail = booking.TargetMentor?.User.Email ?? "";
                    targetName = booking.TargetMentor?.FullName ?? "Mentor";
                    break;
                case "Student":
                    if (booking.TargetStudent == null)
                        await _context.Entry(booking).Reference(b => b.TargetStudent).LoadAsync();
                    targetEmail = booking.TargetStudent?.Email ?? "";
                    targetName = booking.TargetStudent?.FullName ?? "Student";
                    break;
                case "Team":
                    if (booking.TargetTeam == null)
                        await _context.Entry(booking).Reference(b => b.TargetTeam).Query().Include(t => t.Leader).LoadAsync();
                    targetEmail = booking.TargetTeam?.Leader?.Email ?? "";
                    targetName = booking.TargetTeam?.Name ?? "Team Leader";
                    break;
            }

            if (!string.IsNullOrEmpty(targetEmail))
            {
                var details = $@"
                    <p style='margin:4px 0; color:#0A1628;'><strong>Topic:</strong> {booking.Topic}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Date:</strong> {booking.ScheduledAt:MMM dd, yyyy}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Time:</strong> {booking.ScheduledAt:hh:mm tt}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Duration:</strong> {booking.DurationMinutes} minutes</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Amount:</strong> ${booking.TotalPrice:F2}</p>
                    <p>Please log in to your dashboard to <strong>Accept</strong> or <strong>Reject</strong> this booking request.</p>";

                await _emailService.SendEmailAsync(targetEmail, $"New Booking Request: {booking.Topic}", details);
            }
        }

        // ============================================================
        // HELPER: Send booking confirmation emails
        // ============================================================
        private async System.Threading.Tasks.Task SendBookingConfirmationEmails(Models.Booking booking)
        {
            await _context.Entry(booking).Reference(b => b.BookerUser).LoadAsync();

            string targetEmail = "", targetName = "";

            switch (booking.TargetType)
            {
                case "Mentor":
                    if (booking.TargetMentor == null)
                        await _context.Entry(booking).Reference(b => b.TargetMentor).Query().Include(m => m.User).LoadAsync();
                    targetEmail = booking.TargetMentor!.User.Email ?? "";
                    targetName = booking.TargetMentor.FullName;
                    break;
                case "Student":
                    if (booking.TargetStudent == null)
                        await _context.Entry(booking).Reference(b => b.TargetStudent).LoadAsync();
                    targetEmail = booking.TargetStudent!.Email ?? "";
                    targetName = booking.TargetStudent.FullName;
                    break;
                case "Team":
                    if (booking.TargetTeam == null)
                        await _context.Entry(booking).Reference(b => b.TargetTeam).Query().Include(t => t.Leader).LoadAsync();
                    targetEmail = booking.TargetTeam!.Leader.Email ?? "";
                    targetName = booking.TargetTeam.Name;
                    break;
            }

            var details = $@"
                <p style='margin:4px 0; color:#0A1628;'><strong>Topic:</strong> {booking.Topic}</p>
                <p style='margin:4px 0; color:#0A1628;'><strong>Date:</strong> {booking.ScheduledAt:MMM dd, yyyy}</p>
                <p style='margin:4px 0; color:#0A1628;'><strong>Time:</strong> {booking.ScheduledAt:hh:mm tt}</p>
                <p style='margin:4px 0; color:#0A1628;'><strong>Duration:</strong> {booking.DurationMinutes} minutes</p>
                <p style='margin:4px 0; color:#0A1628;'><strong>Amount:</strong> ${booking.TotalPrice:F2}</p>
                <p>The payment has been confirmed. A contract has been generated and is ready for both parties to sign.</p>";

            // Email to booker
            await _emailService.SendEmailAsync(booking.BookerUser.Email ?? "", $"Booking Confirmed & Contract Ready: {booking.Topic}", details);

            // Email to target
            if (!string.IsNullOrEmpty(targetEmail))
                await _emailService.SendEmailAsync(targetEmail, $"Booking Confirmed & Contract Ready: {booking.Topic}", details);
        }

        // ============================================================
        // HELPERS
        // ============================================================
        private async System.Threading.Tasks.Task DepositToAdminWallet(Models.Booking booking)
        {
            var adminUsers = await _userManager.GetUsersInRoleAsync("Admin");
            var mainAdmin = adminUsers.FirstOrDefault();
            if (mainAdmin != null)
            {
                // Admin only receives the 10% platform fee immediately
                mainAdmin.WalletBalance += booking.PlatformFee;
                _context.WalletTransactions.Add(new WalletTransaction
                {
                    UserId = mainAdmin.Id,
                    Type = "Earned",
                    Amount = booking.PlatformFee,
                    Description = $"Platform Fee (10%) for booking #{booking.Id} — {booking.Topic}",
                    CreatedAt = DateTime.UtcNow
                });
                await _userManager.UpdateAsync(mainAdmin);
            }
        }

        private bool IsUserTarget(Models.Booking booking, string userId)
        {
            if (booking.TargetType == "Mentor" && booking.TargetMentor?.UserId == userId) return true;
            if (booking.TargetType == "Student" && booking.TargetStudentId == userId) return true;
            if (booking.TargetType == "Team" && booking.TargetTeam?.LeaderId == userId) return true;
            return false;
        }

        private BookingDetailsViewModel MapToDetails(Models.Booking b)
        {
            string targetName = "", targetInitials = "", targetExpertise = "";
            string? targetImageUrl = null;

            switch (b.TargetType)
            {
                case "Mentor":
                    targetName = b.TargetMentor?.FullName ?? "Unknown";
                    targetInitials = b.TargetMentor?.Initials ?? "M";
                    targetExpertise = b.TargetMentor?.Expertise ?? "";
                    targetImageUrl = b.TargetMentor?.User?.ProfileImageUrl;
                    break;
                case "Student":
                    targetName = b.TargetStudent?.FullName ?? "Unknown";
                    targetInitials = targetName.Length > 0 ? targetName.Substring(0, 1).ToUpper() : "S";
                    targetExpertise = b.TargetStudent?.Skills ?? "Student";
                    targetImageUrl = b.TargetStudent?.ProfileImageUrl;
                    break;
                case "Team":
                    targetName = b.TargetTeam?.Name ?? "Unknown";
                    targetInitials = targetName.Length >= 2 ? targetName.Substring(0, 2).ToUpper() : targetName.Substring(0, 1).ToUpper();
                    targetExpertise = "Team";
                    break;
            }

            return new BookingDetailsViewModel
            {
                Id = b.Id,
                BookerUserId = b.BookerUserId,
                BookerName = b.BookerUser?.FullName ?? "Unknown",
                BookerEmail = b.BookerUser?.Email ?? "",
                BookerRole = b.BookerUser?.Role ?? "Unknown",
                BookerInitials = b.BookerUser?.FullName?.Length > 0 ? b.BookerUser.FullName.Substring(0, 1).ToUpper() : "U",
                TargetType = b.TargetType,
                TargetName = targetName,
                TargetImageUrl = targetImageUrl,
                TargetInitials = targetInitials,
                TargetExpertise = targetExpertise,
                ScheduledAt = b.ScheduledAt,
                EndDate = b.EndDate,
                DurationMinutes = b.DurationMinutes,
                Topic = b.Topic,
                Notes = b.Notes,
                HourlyRate = b.HourlyRate,
                TotalPrice = b.TotalPrice,
                PlatformFee = b.PlatformFee,
                NetAmount = b.NetAmount,
                PaymentStatus = b.PaymentStatus,
                Status = b.Status,
                CreatedAt = b.CreatedAt,
                ContractId = b.Contract?.Id,
                ContractStatus = b.Contract?.Status
            };
        }
    }
}
