using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Wallet;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class WalletController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<WalletController> _logger;

        public WalletController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            ILogger<WalletController> logger)
        {
            _userManager = userManager;
            _context = context;
            _logger = logger;
        }

        // GET: /Wallet
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            var transactions = await _context.WalletTransactions
                .Where(t => t.UserId == user.Id)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            var vm = new WalletViewModel
            {
                Balance = user.WalletBalance,
                Role = role,
                Transactions = transactions
            };

            return View(vm);
        }

        // POST: /Wallet/Deposit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Deposit(decimal amount, string cardNumber)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            // Only Students & Companies can deposit
            if (role == "Mentor")
            {
                TempData["Error"] = "Mentors cannot deposit. You receive earnings from bookings.";
                return RedirectToAction("Index");
            }

            if (amount <= 0)
            {
                TempData["Error"] = "Please enter a valid amount.";
                return RedirectToAction("Index");
            }

            if (string.IsNullOrWhiteSpace(cardNumber) || cardNumber.Length < 16)
            {
                TempData["Error"] = "Please enter a valid card number.";
                return RedirectToAction("Index");
            }

            // Simulate card charge
            user.WalletBalance += amount;

            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = user.Id,
                Type = "Deposit",
                Amount = amount,
                Description = $"Deposit via card ending in {cardNumber[^4..]}",
                CreatedAt = DateTime.UtcNow
            });

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"${amount:F2} has been added to your wallet successfully!";
            return RedirectToAction("Index");
        }

        // POST: /Wallet/Withdraw
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Withdraw(decimal amount, string cardNumber)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            // Companies can only deposit, not withdraw
            if (role == "Company")
            {
                TempData["Error"] = "Companies cannot withdraw. You can only deposit and pay for bookings.";
                return RedirectToAction("Index");
            }

            if (amount <= 0)
            {
                TempData["Error"] = "Please enter a valid amount.";
                return RedirectToAction("Index");
            }

            if (string.IsNullOrWhiteSpace(cardNumber) || cardNumber.Length < 16)
            {
                TempData["Error"] = "Please enter a valid card number.";
                return RedirectToAction("Index");
            }

            if (user.WalletBalance < amount)
            {
                TempData["Error"] = $"Insufficient balance. Your balance is ${user.WalletBalance:F2}.";
                return RedirectToAction("Index");
            }

            user.WalletBalance -= amount;

            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = user.Id,
                Type = "Withdraw",
                Amount = amount,
                Description = $"Withdrawal to card ending in {cardNumber[^4..]}",
                CreatedAt = DateTime.UtcNow
            });

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"${amount:F2} has been withdrawn successfully!";
            return RedirectToAction("Index");
        }

        // ============================================================
        // ADMIN ONLY: View Pending Transfers
        // ============================================================
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AdminTransfers()
        {
            var pendingBookings = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor).ThenInclude(m => m!.User)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam)
                .Include(b => b.Contract)
                .Where(b => b.PaymentStatus == "Paid" && b.Contract != null && b.Contract.Status == "FullySigned")
                .OrderBy(b => b.CreatedAt)
                .ToListAsync();

            return View(pendingBookings);
        }

        // ============================================================
        // ADMIN ONLY: Release Funds to Target
        // ============================================================
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ReleaseFunds(int bookingId)
        {
            var adminUser = await _userManager.GetUserAsync(User);
            if (adminUser == null) return Unauthorized();

            var booking = await _context.Bookings
                .Include(b => b.Contract)
                .FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null) return NotFound();

            if (booking.PaymentStatus != "Paid" || booking.Contract?.Status != "FullySigned")
            {
                TempData["Error"] = "This booking is not eligible for funds release.";
                return RedirectToAction("AdminTransfers");
            }

            // Determine Target UserId
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

            if (targetUserId == null)
            {
                TempData["Error"] = "Could not find the target user to release funds to.";
                return RedirectToAction("AdminTransfers");
            }

            var targetUser = await _userManager.FindByIdAsync(targetUserId);
            if (targetUser == null)
            {
                TempData["Error"] = "Target user not found.";
                return RedirectToAction("AdminTransfers");
            }

            // Release Funds
            var releaseAmount = booking.NetAmount;

            if (adminUser.WalletBalance < releaseAmount)
            {
                TempData["Error"] = "System Admin wallet does not have enough funds to release this escrow! Balance: $" + adminUser.WalletBalance;
                return RedirectToAction("AdminTransfers");
            }

            // Deduct from Admin
            adminUser.WalletBalance -= releaseAmount;
            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = adminUser.Id,
                Type = "Withdraw", // Or a new type "ReleasedEscrow"
                Amount = releaseAmount,
                Description = $"Released escrow for booking #{booking.Id}",
                CreatedAt = DateTime.UtcNow
            });

            // Add to Target
            targetUser.WalletBalance += releaseAmount;
            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = targetUser.Id,
                Type = "Earned",
                Amount = releaseAmount,
                Description = $"Earned for booking #{booking.Id} \u2014 {booking.Topic}",
                CreatedAt = DateTime.UtcNow
            });

            booking.PaymentStatus = "Released";

            await _userManager.UpdateAsync(adminUser);
            await _userManager.UpdateAsync(targetUser);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Successfully released ${releaseAmount:F2} to {targetUser.FullName}.";
            return RedirectToAction("AdminTransfers");
        }
    }
}
