using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Notification;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class NotificationsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public NotificationsController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: /Notifications
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Dashboard");
        }

        // GET: /Notifications/GetUnreadCount — called by JS to show badge on bell
        [HttpGet]
        public async Task<IActionResult> GetUnreadCount()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Json(new { count = 0 });

            int count = 0;

            // 1. Pending Join Requests for teams led by user
            var leaderTeamIds = await _context.Teams
                .Where(t => t.LeaderId == user.Id)
                .Select(t => t.Id)
                .ToListAsync();

            if (leaderTeamIds.Any())
            {
                count += await _context.JoinRequests
                    .CountAsync(jr => leaderTeamIds.Contains(jr.TeamId) && jr.Status == "Pending");
            }

            // 2. Pending Bookings where user is the target
            var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);
            var pendingBookings = await _context.Bookings
                .Include(b => b.TargetTeam)
                .Where(b => b.Status == "Pending")
                .ToListAsync();

            count += pendingBookings.Count(b =>
                (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id));

            // 3. Outgoing Bookings waiting for payment by user
            count += await _context.Bookings
                .CountAsync(b => b.BookerUserId == user.Id && b.Status == "PendingPayment");

            // 4. Released payment bookings where user is the target
            var releasedBookings = await _context.Bookings
                .Include(b => b.TargetTeam)
                .Where(b => b.PaymentStatus == "Released")
                .ToListAsync();

            count += releasedBookings.Count(b =>
                (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id));

            // Subtract dismissed notifications from count
            var dismissedIds = await _context.DismissedNotifications
                .Where(d => d.UserId == user.Id)
                .Select(d => d.NotificationId)
                .ToListAsync();

            // Build the same notification IDs to check against dismissed
            var allNotifIds = new List<string>();

            if (leaderTeamIds.Any())
            {
                var joinRequestIds = await _context.JoinRequests
                    .Where(jr => leaderTeamIds.Contains(jr.TeamId) && jr.Status == "Pending")
                    .Select(jr => jr.Id)
                    .ToListAsync();
                allNotifIds.AddRange(joinRequestIds.Select(id => $"join_{id}"));
            }

            allNotifIds.AddRange(pendingBookings
                .Where(b => (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                            (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                            (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                .Select(b => $"booking_{b.Id}"));

            var pendingPaymentIds = await _context.Bookings
                .Where(b => b.BookerUserId == user.Id && b.Status == "PendingPayment")
                .Select(b => b.Id)
                .ToListAsync();
            allNotifIds.AddRange(pendingPaymentIds.Select(id => $"pay_{id}"));

            allNotifIds.AddRange(releasedBookings
                .Where(b => (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                            (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                            (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                .Select(b => $"released_{b.Id}"));

            // Final count = total active minus dismissed ones
            int dismissedCount = allNotifIds.Count(id => dismissedIds.Contains(id));
            count = allNotifIds.Count - dismissedCount;

            return Json(new { count });
        }

        // GET: /Notifications/GetDropdownContent
        [HttpGet]
        public async Task<IActionResult> GetDropdownContent()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Content("<div class='p-3 text-center'>Please log in</div>");

            // Load dismissed notification IDs for this user
            var dismissedIds = (await _context.DismissedNotifications
                .Where(d => d.UserId == user.Id)
                .Select(d => d.NotificationId)
                .ToListAsync()).ToHashSet();

            var notifications = new List<NotificationViewModel>();

            var leaderTeamIds = await _context.Teams
                .Where(t => t.LeaderId == user.Id).Select(t => t.Id).ToListAsync();

            if (leaderTeamIds.Any())
            {
                var joinRequests = await _context.JoinRequests.Include(jr => jr.User).Include(jr => jr.Team)
                    .Where(jr => leaderTeamIds.Contains(jr.TeamId) && jr.Status == "Pending").ToListAsync();
                foreach (var jr in joinRequests)
                {
                    notifications.Add(new NotificationViewModel
                    {
                        Id = $"join_{jr.Id}",
                        Title = "Join Request",
                        Message = $"{jr.User.FullName} requested to join \"{jr.Team.Name}\".",
                        Timestamp = jr.RequestedAt,
                        ActionUrl = jr.Team.ProjectId.HasValue ? Url.Action("Details", "Projects", new { id = jr.Team.ProjectId.Value }) ?? "" : Url.Action("PendingRequests", "Teams", new { id = jr.TeamId }) ?? "",
                        IconClass = "bi bi-person-plus-fill text-warning",
                        Status = "Pending"
                    });
                }
            }

            var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);
            var pendingBookings = await _context.Bookings.Include(b => b.BookerUser).Include(b => b.TargetTeam).Where(b => b.Status == "Pending").ToListAsync();
            foreach (var b in pendingBookings)
            {
                if ((b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                    (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                    (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                {
                    notifications.Add(new NotificationViewModel
                    {
                        Id = $"booking_{b.Id}",
                        Title = "Booking Request",
                        Message = $"{b.BookerUser.FullName} wants to book for \"{b.Topic}\".",
                        Timestamp = b.CreatedAt,
                        ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                        IconClass = "bi bi-calendar-plus-fill text-primary",
                        Status = "Pending"
                    });
                }
            }

            var myPendingPayments = await _context.Bookings.Where(b => b.BookerUserId == user.Id && b.Status == "PendingPayment").ToListAsync();
            foreach (var b in myPendingPayments)
            {
                notifications.Add(new NotificationViewModel
                {
                    Id = $"pay_{b.Id}",
                    Title = "Payment Required",
                    Message = $"Your booking \"{b.Topic}\" was accepted. Please pay.",
                    Timestamp = b.CreatedAt,
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = "bi bi-credit-card-fill text-danger",
                    Status = "PendingPayment"
                });
            }

            var myJoinRequests = await _context.JoinRequests.Include(jr => jr.Team).Where(jr => jr.UserId == user.Id && (jr.Status == "Accepted" || jr.Status == "Rejected")).ToListAsync();
            foreach (var jr in myJoinRequests)
            {
                notifications.Add(new NotificationViewModel
                {
                    Id = $"join_res_{jr.Id}",
                    Title = jr.Status == "Accepted" ? "Approved" : "Rejected",
                    Message = $"Your request to join \"{jr.Team.Name}\" was {(jr.Status == "Accepted" ? "approved" : "rejected")}.",
                    Timestamp = jr.RespondedAt ?? jr.RequestedAt,
                    ActionUrl = jr.Team.ProjectId.HasValue ? Url.Action("Details", "Projects", new { id = jr.Team.ProjectId.Value }) ?? "" : Url.Action("Details", "Teams", new { id = jr.TeamId }) ?? "",
                    IconClass = jr.Status == "Accepted" ? "bi bi-check-circle-fill text-success" : "bi bi-x-circle-fill text-danger",
                    Status = jr.Status
                });
            }

            var myBookingResponses = await _context.Bookings.Where(b => b.BookerUserId == user.Id && (b.Status == "Confirmed" || b.Status == "Rejected" || b.Status == "Cancelled")).ToListAsync();
            foreach (var b in myBookingResponses)
            {
                notifications.Add(new NotificationViewModel
                {
                    Id = $"booking_res_{b.Id}",
                    Title = $"Booking {b.Status}",
                    Message = $"Booking \"{b.Topic}\" is {b.Status.ToLower()}.",
                    Timestamp = b.PaidAt ?? b.CreatedAt,
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = b.Status == "Confirmed" ? "bi bi-calendar-check-fill text-success" : "bi bi-info-circle-fill text-secondary",
                    Status = b.Status
                });
            }

            // Released payments — notify target user
            var releasedBookings = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetTeam)
                .Where(b => b.PaymentStatus == "Released")
                .ToListAsync();

            foreach (var b in releasedBookings)
            {
                if ((b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                    (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                    (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                {
                    notifications.Add(new NotificationViewModel
                    {
                        Id = $"released_{b.Id}",
                        Title = "Payment Released",
                        Message = $"${b.NetAmount:F2} for \"{b.Topic}\" released to your wallet.",
                        Timestamp = b.CompletedAt ?? b.PaidAt ?? b.CreatedAt,
                        ActionUrl = Url.Action("Index", "Wallet") ?? "",
                        IconClass = "bi bi-wallet-fill text-success",
                        Status = "Released"
                    });
                }
            }

            foreach (var n in notifications)
            {
                n.IsRead = dismissedIds.Contains(n.Id);
            }

            notifications = notifications
                .OrderByDescending(n => n.Timestamp)
                .Take(50)
                .ToList();
            return PartialView("_NotificationDropdown", notifications);
        }

        // POST: /Notifications/Dismiss — dismiss a single notification and redirect
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Dismiss(string notificationId, string? redirectUrl)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            if (!string.IsNullOrEmpty(notificationId))
            {
                var exists = await _context.DismissedNotifications
                    .AnyAsync(d => d.UserId == user.Id && d.NotificationId == notificationId);

                if (!exists)
                {
                    _context.DismissedNotifications.Add(new DismissedNotification
                    {
                        UserId = user.Id,
                        NotificationId = notificationId,
                        DismissedAt = DateTime.UtcNow
                    });
                    await _context.SaveChangesAsync();
                }
            }

            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest" || Request.Headers["Accept"].ToString().Contains("application/json"))
            {
                return Json(new { success = true });
            }

            if (!string.IsNullOrEmpty(redirectUrl) && Url.IsLocalUrl(redirectUrl))
                return Redirect(redirectUrl);

            return RedirectToAction(nameof(Index));
        }

        // POST: /Notifications/DismissAll — dismiss all visible notifications
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DismissAll()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            // Build all current notification IDs for this user (same logic as Index)
            var notifications = new List<string>();

            var leaderTeamIds = await _context.Teams
                .Where(t => t.LeaderId == user.Id).Select(t => t.Id).ToListAsync();

            if (leaderTeamIds.Any())
            {
                var joinRequestIds = await _context.JoinRequests
                    .Where(jr => leaderTeamIds.Contains(jr.TeamId) && jr.Status == "Pending")
                    .Select(jr => jr.Id).ToListAsync();
                notifications.AddRange(joinRequestIds.Select(id => $"join_{id}"));
            }

            var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);

            var pendingBookings = await _context.Bookings.Include(b => b.TargetTeam).Where(b => b.Status == "Pending").ToListAsync();
            notifications.AddRange(pendingBookings
                .Where(b => (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                            (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                            (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                .Select(b => $"booking_{b.Id}"));

            var pendingPaymentIds = await _context.Bookings
                .Where(b => b.BookerUserId == user.Id && b.Status == "PendingPayment")
                .Select(b => b.Id).ToListAsync();
            notifications.AddRange(pendingPaymentIds.Select(id => $"pay_{id}"));

            var myJoinRequests = await _context.JoinRequests
                .Where(jr => jr.UserId == user.Id && (jr.Status == "Accepted" || jr.Status == "Rejected"))
                .Select(jr => jr.Id).ToListAsync();
            notifications.AddRange(myJoinRequests.Select(id => $"join_res_{id}"));

            var myBookingResponseIds = await _context.Bookings
                .Where(b => b.BookerUserId == user.Id && (b.Status == "Confirmed" || b.Status == "Rejected" || b.Status == "Cancelled"))
                .Select(b => b.Id).ToListAsync();
            notifications.AddRange(myBookingResponseIds.Select(id => $"booking_res_{id}"));

            var releasedBookings = await _context.Bookings.Include(b => b.TargetTeam).Where(b => b.PaymentStatus == "Released").ToListAsync();
            notifications.AddRange(releasedBookings
                .Where(b => (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                            (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                            (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id))
                .Select(b => $"released_{b.Id}"));

            // Get already dismissed
            var alreadyDismissed = (await _context.DismissedNotifications
                .Where(d => d.UserId == user.Id)
                .Select(d => d.NotificationId)
                .ToListAsync()).ToHashSet();

            // Add new dismissals
            var newDismissals = notifications.Where(id => !alreadyDismissed.Contains(id)).ToList();
            foreach (var nId in newDismissals)
            {
                _context.DismissedNotifications.Add(new DismissedNotification
                {
                    UserId = user.Id,
                    NotificationId = nId,
                    DismissedAt = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync();

            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest" || Request.Headers["Accept"].ToString().Contains("application/json"))
            {
                return Json(new { success = true });
            }

            TempData["Success"] = "All notifications marked as read.";
            return RedirectToAction(nameof(Index));
        }
    }
}
