using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Contract;
using A3DET_CODE.Services.Interfaces;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ContractController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<ContractController> _logger;

        public ContractController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            IEmailService emailService,
            ILogger<ContractController> logger)
        {
            _userManager = userManager;
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        // ============================================================
        // GET: /Contract/View/5
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> View(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var contract = await _context.Contracts
                .Include(c => c.Booking)
                    .ThenInclude(b => b.BookerUser)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetStudent)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetTeam)
                .Include(c => c.PartyAUser)
                .Include(c => c.PartyBUser)
                .Include(c => c.PartyBTeam)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contract == null) return NotFound();

            // Check access
            if (contract.PartyAUserId != user.Id && contract.PartyBUserId != user.Id)
                return Forbid();

            var viewModel = MapToViewModel(contract, user.Id);
            return View("View", viewModel);
        }

        // ============================================================
        // GET: /Contract/Sign/5
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Sign(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var contract = await _context.Contracts
                .Include(c => c.Booking)
                    .ThenInclude(b => b.BookerUser)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetStudent)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetTeam)
                .Include(c => c.PartyAUser)
                .Include(c => c.PartyBUser)
                .Include(c => c.PartyBTeam)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contract == null) return NotFound();

            bool isPartyA = contract.PartyAUserId == user.Id;
            bool isPartyB = contract.PartyBUserId == user.Id;

            if (!isPartyA && !isPartyB) return Forbid();

            // Check if already signed
            if (isPartyA && contract.PartyASignedAt.HasValue)
            {
                TempData["Info"] = "You have already signed this contract.";
                return RedirectToAction("View", new { id });
            }
            if (isPartyB && contract.PartyBSignedAt.HasValue)
            {
                TempData["Info"] = "You have already signed this contract.";
                return RedirectToAction("View", new { id });
            }

            var viewModel = MapToViewModel(contract, user.Id);
            return View("Sign", viewModel);
        }

        // ============================================================
        // POST: /Contract/Sign — process signature
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Sign(SignContractViewModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Please draw your signature and agree to the terms.";
                return RedirectToAction("Sign", new { id = model.ContractId });
            }

            var contract = await _context.Contracts
                .Include(c => c.PartyAUser)
                .Include(c => c.PartyBUser)
                .Include(c => c.Booking)
                .FirstOrDefaultAsync(c => c.Id == model.ContractId);

            if (contract == null) return NotFound();

            bool isPartyA = contract.PartyAUserId == user.Id;
            bool isPartyB = contract.PartyBUserId == user.Id;

            if (!isPartyA && !isPartyB) return Forbid();

            // Apply signature
            if (isPartyA && !contract.PartyASignedAt.HasValue)
            {
                contract.PartyASignature = model.SignatureData;
                contract.PartyASignedAt = DateTime.UtcNow;

                if (contract.PartyBSignedAt.HasValue)
                    contract.Status = "FullySigned";
                else
                    contract.Status = "PartyASigned";

                _logger.LogInformation("✅ Party A ({Name}) signed contract {ContractNumber}", user.FullName, contract.ContractNumber);
            }
            else if (isPartyB && !contract.PartyBSignedAt.HasValue)
            {
                contract.PartyBSignature = model.SignatureData;
                contract.PartyBSignedAt = DateTime.UtcNow;

                if (contract.PartyASignedAt.HasValue)
                    contract.Status = "FullySigned";
                else
                    contract.Status = "PartyBSigned";

                _logger.LogInformation("✅ Party B ({Name}) signed contract {ContractNumber}", user.FullName, contract.ContractNumber);
            }

            await _context.SaveChangesAsync();

            // Send notification emails
            if (contract.Status == "FullySigned")
            {
                // Both signed — send fully executed email to BOTH parties
                var contractDetails = $@"
                    <p style='margin:4px 0; color:#0A1628;'><strong>Contract:</strong> {contract.ContractNumber}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Service:</strong> {contract.Title}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Amount:</strong> ${contract.TotalAmount:F2}</p>
                    <p style='margin:4px 0; color:#0A1628;'><strong>Start Date:</strong> {contract.StartDate:MMM dd, yyyy}</p>";

                await _emailService.SendContractFullySignedAsync(
                    contract.PartyAUser.Email ?? "", contract.PartyAUser.FullName,
                    contract.PartyBUser?.Email ?? "", contract.PartyBUser?.FullName ?? "Service Provider",
                    contract.ContractNumber, contractDetails);

                // Mark booking as active
                if (contract.Booking != null)
                {
                    contract.Booking.Status = "InProgress";

                    await _context.SaveChangesAsync();
                }

                // Notify admin about the fully signed contract ready for funds release
                var adminUser = await _userManager.GetUsersInRoleAsync("Admin");
                var mainAdmin = adminUser.FirstOrDefault();
                if (mainAdmin != null && !string.IsNullOrEmpty(mainAdmin.Email))
                {
                    await _emailService.SendEmailAsync(mainAdmin.Email,
                        $"Escrow Action Required: Contract {contract.ContractNumber} Fully Signed",
                        $"<p>Contract <strong>{contract.ContractNumber}</strong> has been fully signed by both parties.</p>" +
                        $"<p>The total amount of <strong>${contract.TotalAmount:F2}</strong> is currently held in your Escrow wallet.</p>" +
                        $"<p>Please review the booking and release the net funds to the provider from your Escrow Dashboard.</p>");
                }

                TempData["Success"] = "🎉 Contract fully signed! Both parties have been notified via email.";
            }
            else
            {
                // One party signed — notify the other
                var otherPartyEmail = isPartyA ? (contract.PartyBUser?.Email ?? "") : (contract.PartyAUser.Email ?? "");
                var otherPartyName = isPartyA ? (contract.PartyBUser?.FullName ?? "Service Provider") : contract.PartyAUser.FullName;

                await _emailService.SendContractSignedAsync(otherPartyEmail, otherPartyName, user.FullName, contract.ContractNumber);

                TempData["Success"] = "✍️ Contract signed successfully! Waiting for the other party's signature.";
            }

            return RedirectToAction("View", new { id = contract.Id });
        }

        // ============================================================
        // GET: /Contract/MyContracts
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> MyContracts()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var contracts = await _context.Contracts
                .Include(c => c.Booking)
                    .ThenInclude(b => b.BookerUser)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetStudent)
                .Include(c => c.Booking)
                    .ThenInclude(b => b.TargetTeam)
                .Include(c => c.PartyAUser)
                .Include(c => c.PartyBUser)
                .Include(c => c.PartyBTeam)
                .Where(c => (c.PartyAUserId == user.Id || c.PartyBUserId == user.Id) && c.Status == "FullySigned")
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            var viewModel = new MyContractsViewModel
            {
                CurrentUserId = user.Id,
                Contracts = contracts.Select(c => MapToViewModel(c, user.Id)).ToList()
            };

            return View(viewModel);
        }

        // ============================================================
        // HELPER: Map Contract to ViewModel
        // ============================================================
        private ContractViewModel MapToViewModel(Models.Contract c, string currentUserId)
        {
            string partyBName = c.PartyBUser?.FullName ?? c.PartyBTeam?.Name ?? "Unknown";
            string partyBEmail = c.PartyBUser?.Email ?? "";
            string partyBRole = c.PartyBUser?.Role ?? "Service Provider";
            string partyBInitials = partyBName.Length > 0 ? partyBName.Substring(0, 1).ToUpper() : "?";

            return new ContractViewModel
            {
                Id = c.Id,
                ContractNumber = c.ContractNumber,
                BookingId = c.BookingId,
                PartyAName = c.PartyAUser?.FullName ?? "Unknown",
                PartyAEmail = c.PartyAUser?.Email ?? "",
                PartyARole = c.PartyAUser?.Role ?? "Client",
                PartyAInitials = c.PartyAUser?.FullName?.Length > 0 ? c.PartyAUser.FullName.Substring(0, 1).ToUpper() : "?",
                PartyASignature = c.PartyASignature,
                PartyASignedAt = c.PartyASignedAt,
                PartyBName = partyBName,
                PartyBEmail = partyBEmail,
                PartyBRole = partyBRole,
                PartyBInitials = partyBInitials,
                PartyBSignature = c.PartyBSignature,
                PartyBSignedAt = c.PartyBSignedAt,
                Title = c.Title,
                Description = c.Description,
                Terms = c.Terms,
                TotalAmount = c.TotalAmount,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Status = c.Status,
                CreatedAt = c.CreatedAt,
                TargetType = c.Booking?.TargetType ?? "",
                Topic = c.Booking?.Topic,
                DurationMinutes = c.Booking?.DurationMinutes ?? 0,
                HourlyRate = c.Booking?.HourlyRate ?? 0,
                PlatformFee = c.Booking?.PlatformFee ?? 0,
                CurrentUserId = currentUserId,
                IsPartyA = c.PartyAUserId == currentUserId,
                IsPartyB = c.PartyBUserId == currentUserId,
                CanSign = (c.PartyAUserId == currentUserId && !c.PartyASignedAt.HasValue) ||
                          (c.PartyBUserId == currentUserId && !c.PartyBSignedAt.HasValue)
            };
        }
    }
}
