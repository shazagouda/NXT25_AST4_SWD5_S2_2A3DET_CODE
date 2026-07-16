using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;

namespace A3DET_CODE.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IActionResult> Dashboard()
        {
            var userCount = await _userManager.Users.CountAsync();
            var totalProjects = await _context.Projects.CountAsync();
            var pendingReports = await _context.Reports.CountAsync(r => r.Status == "Pending");
            var pendingEscrows = await _context.Bookings
                .CountAsync(b => b.PaymentStatus == "Paid" && b.Contract != null && b.Contract.Status == "FullySigned");

            ViewBag.UserCount = userCount;
            ViewBag.TotalProjects = totalProjects;
            ViewBag.PendingReports = pendingReports;
            ViewBag.PendingEscrows = pendingEscrows;

            return View();
        }

        public async Task<IActionResult> Reports()
        {
            var reports = await _context.Reports
                .Include(r => r.Reporter)
                .Include(r => r.ReportedUser)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return View(reports);
        }

        [HttpPost]
        public async Task<IActionResult> ResolveReport(int reportId, string resolutionNote, string actionToTake)
        {
            var report = await _context.Reports
                .Include(r => r.ReportedUser)
                .FirstOrDefaultAsync(r => r.Id == reportId);

            if (report == null) return NotFound();

            var adminUser = await _userManager.GetUserAsync(User);

            report.Status = "Resolved";
            report.ResolvedAt = DateTime.UtcNow;
            report.ResolvedBy = adminUser?.Id;
            report.ResolutionNote = resolutionNote;

            if (actionToTake == "BanUser" && report.ReportedUser != null)
            {
                report.ReportedUser.IsActive = false;
                await _userManager.UpdateAsync(report.ReportedUser);
            }

            await _context.SaveChangesAsync();

            TempData["Success"] = "Report resolved successfully.";
            return RedirectToAction(nameof(Reports));
        }

        public async Task<IActionResult> Users()
        {
            var users = await _userManager.Users.OrderByDescending(u => u.CreatedAt).ToListAsync();
            return View(users);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ToggleUserStatus(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            if (user.Role == "Admin")
            {
                TempData["Error"] = "Cannot ban the Admin."; 
                return RedirectToAction(nameof(Users));
            }

            user.IsActive = !user.IsActive;
            await _userManager.UpdateAsync(user);

            TempData["Success"] = user.IsActive
                ? $"{user.FullName} has been unbanned."
                : $"{user.FullName} has been banned.";

            return RedirectToAction(nameof(Users));
        }

        // ============================================================
        // ADMIN ONLY: View All Bookings
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Bookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam)
                .Include(b => b.Contract)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return View(bookings);
        }

        // ============================================================
        // ADMIN ONLY: Cancel & Refund Booking
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CancelBooking(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.Contract)
                .FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null) return NotFound();

            if (booking.Status == "Cancelled")
            {
                TempData["Error"] = "Booking is already cancelled.";
                return RedirectToAction(nameof(Bookings));
            }

            // Refund if payment was made ("Paid" or "Released")
            if (booking.PaymentStatus == "Paid" || booking.PaymentStatus == "Released")
            {
                var adminUser = await _userManager.GetUsersInRoleAsync("Admin");
                var mainAdmin = adminUser.FirstOrDefault();
                if (mainAdmin != null)
                {
                    // Refund BookerUser (they get their TotalPrice back)
                    var booker = await _userManager.FindByIdAsync(booking.BookerUserId);
                    if (booker != null)
                    {
                        if (booking.PaymentStatus == "Released")
                        {
                            // Try to claw back NetAmount from target user
                            string? targetUserId = null;
                            if (booking.TargetType == "Mentor")
                            {
                                var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.Id == booking.TargetMentorId);
                                targetUserId = mentor?.UserId;
                            }
                            else if (booking.TargetType == "Student")
                            {
                                targetUserId = booking.TargetStudentId;
                            }

                            if (targetUserId != null)
                            {
                                var target = await _userManager.FindByIdAsync(targetUserId);
                                if (target != null)
                                {
                                    target.WalletBalance -= booking.NetAmount;
                                    _context.WalletTransactions.Add(new WalletTransaction
                                    {
                                        UserId = target.Id,
                                        Type = "Withdraw",
                                        Amount = booking.NetAmount,
                                        Description = $"Clawed back for cancelled booking #{booking.Id}",
                                        CreatedAt = DateTime.UtcNow
                                    });
                                    await _userManager.UpdateAsync(target);
                                }
                            }

                            // Refund 10% from admin
                            mainAdmin.WalletBalance -= booking.PlatformFee;
                            _context.WalletTransactions.Add(new WalletTransaction
                            {
                                UserId = mainAdmin.Id,
                                Type = "Withdraw",
                                Amount = booking.PlatformFee,
                                Description = $"Reversed Platform Fee for cancelled booking #{booking.Id}",
                                CreatedAt = DateTime.UtcNow
                            });
                        }
                        else // PaymentStatus == "Paid"
                        {
                            // Deduct the whole TotalPrice from Admin wallet
                            mainAdmin.WalletBalance -= booking.TotalPrice;
                            _context.WalletTransactions.Add(new WalletTransaction
                            {
                                UserId = mainAdmin.Id,
                                Type = "Withdraw",
                                Amount = booking.TotalPrice,
                                Description = $"Refunded escrow for cancelled booking #{booking.Id}",
                                CreatedAt = DateTime.UtcNow
                            });
                        }

                        // Credit booker
                        booker.WalletBalance += booking.TotalPrice;
                        _context.WalletTransactions.Add(new WalletTransaction
                        {
                            UserId = booker.Id,
                            Type = "Earned",
                            Amount = booking.TotalPrice,
                            Description = $"Refunded for cancelled booking #{booking.Id}",
                            CreatedAt = DateTime.UtcNow
                        });

                        await _userManager.UpdateAsync(booker);
                        await _userManager.UpdateAsync(mainAdmin);
                    }
                }
                booking.PaymentStatus = "Refunded";
            }

            booking.Status = "Cancelled";
            if (booking.Contract != null)
            {
                booking.Contract.Status = "Cancelled";
            }

            await _context.SaveChangesAsync();

            TempData["Success"] = $"Booking #{booking.Id} has been successfully cancelled and refunded.";
            return RedirectToAction(nameof(Bookings));
        }
    }
}
