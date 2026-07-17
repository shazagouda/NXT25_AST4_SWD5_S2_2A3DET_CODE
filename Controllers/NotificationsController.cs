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
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var notifications = new List<NotificationViewModel>();

            // 1. Pending Join Requests for teams where user is leader
            var leaderTeamIds = await _context.Teams
                .Where(t => t.LeaderId == user.Id)
                .Select(t => t.Id)
                .ToListAsync();

            if (leaderTeamIds.Any())
            {
                var joinRequests = await _context.JoinRequests
                    .Include(jr => jr.User)
                    .Include(jr => jr.Team)
                    .Where(jr => leaderTeamIds.Contains(jr.TeamId) && jr.Status == "Pending")
                    .ToListAsync();

                foreach (var jr in joinRequests)
                {
                    string actionUrl = jr.Team.ProjectId.HasValue
                        ? Url.Action("Details", "Projects", new { id = jr.Team.ProjectId.Value }) ?? ""
                        : Url.Action("PendingRequests", "Teams", new { id = jr.TeamId }) ?? "";

                    notifications.Add(new NotificationViewModel
                    {
                        Id = $"join_{jr.Id}",
                        Title = "Team Join Request",
                        Message = $"{jr.User.FullName} requested to join your team \"{jr.Team.Name}\".",
                        Timestamp = jr.RequestedAt,
                        Status = "Pending",
                        Type = "JoinRequest",
                        ActionUrl = actionUrl,
                        IconClass = "bi bi-person-plus-fill text-warning",
                        SenderName = jr.User.FullName,
                        TargetName = jr.Team.Name
                    });
                }
            }

            // 2. Incoming Booking requests where user is the target (Status == "Pending")
            var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);

            var pendingBookings = await _context.Bookings
                .Include(b => b.BookerUser)
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetTeam)
                .Where(b => b.Status == "Pending")
                .ToListAsync();

            foreach (var b in pendingBookings)
            {
                bool isTarget =
                    (b.TargetType == "Mentor" && mentor != null && b.TargetMentorId == mentor.Id) ||
                    (b.TargetType == "Student" && b.TargetStudentId == user.Id) ||
                    (b.TargetType == "Team" && b.TargetTeam != null && b.TargetTeam.LeaderId == user.Id);

                if (!isTarget) continue;

                string msg = b.TargetType == "Team" && b.TargetTeam != null
                    ? $"{b.BookerUser.FullName} requested to book your team \"{b.TargetTeam.Name}\" for \"{b.Topic}\"."
                    : $"{b.BookerUser.FullName} requested to book you for \"{b.Topic}\".";

                notifications.Add(new NotificationViewModel
                {
                    Id = $"booking_{b.Id}",
                    Title = "New Booking Request",
                    Message = msg,
                    Timestamp = b.CreatedAt,
                    Status = "Pending",
                    Type = "Booking",
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = "bi bi-calendar-plus-fill text-primary",
                    SenderName = b.BookerUser.FullName,
                    TargetName = b.Topic ?? "Session"
                });
            }

            // 3. Outgoing Bookings waiting for user's payment (Status == "PendingPayment")
            var myPendingPayments = await _context.Bookings
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam)
                .Where(b => b.BookerUserId == user.Id && b.Status == "PendingPayment")
                .ToListAsync();

            foreach (var b in myPendingPayments)
            {
                string targetName = "Provider";
                if (b.TargetType == "Mentor" && b.TargetMentor != null) targetName = b.TargetMentor.FullName;
                else if (b.TargetType == "Student" && b.TargetStudent != null) targetName = b.TargetStudent.FullName;
                else if (b.TargetType == "Team" && b.TargetTeam != null) targetName = b.TargetTeam.Name;

                notifications.Add(new NotificationViewModel
                {
                    Id = $"pay_{b.Id}",
                    Title = "Payment Required",
                    Message = $"Your booking for \"{b.Topic}\" with {targetName} was accepted. Please complete payment to confirm.",
                    Timestamp = b.CreatedAt,
                    Status = "PendingPayment",
                    Type = "Booking",
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = "bi bi-credit-card-fill text-danger",
                    SenderName = targetName,
                    TargetName = b.Topic ?? "Session"
                });
            }

            // 4. Responses to user's own Join Requests (Accepted or Rejected)
            var myJoinRequests = await _context.JoinRequests
                .Include(jr => jr.Team)
                .Where(jr => jr.UserId == user.Id && (jr.Status == "Accepted" || jr.Status == "Rejected"))
                .ToListAsync();

            foreach (var jr in myJoinRequests)
            {
                bool accepted = jr.Status == "Accepted";
                string actionUrl = jr.Team.ProjectId.HasValue
                    ? Url.Action("Details", "Projects", new { id = jr.Team.ProjectId.Value }) ?? ""
                    : Url.Action("Details", "Teams", new { id = jr.TeamId }) ?? "";

                notifications.Add(new NotificationViewModel
                {
                    Id = $"join_res_{jr.Id}",
                    Title = accepted ? "Join Request Approved" : "Join Request Rejected",
                    Message = $"Your request to join team \"{jr.Team.Name}\" was {(accepted ? "approved! Welcome aboard." : "rejected.")}",
                    Timestamp = jr.RespondedAt ?? jr.RequestedAt,
                    Status = jr.Status,
                    Type = "JoinRequest",
                    ActionUrl = actionUrl,
                    IconClass = accepted ? "bi bi-check-circle-fill text-success" : "bi bi-x-circle-fill text-danger",
                    SenderName = "Team Leader",
                    TargetName = jr.Team.Name
                });
            }

            // 5. Responses to user's sent Bookings (Confirmed, Rejected, Cancelled)
            var myBookingResponses = await _context.Bookings
                .Include(b => b.TargetMentor)
                .Include(b => b.TargetStudent)
                .Include(b => b.TargetTeam)
                .Where(b => b.BookerUserId == user.Id &&
                            (b.Status == "Confirmed" || b.Status == "Rejected" || b.Status == "Cancelled"))
                .ToListAsync();

            foreach (var b in myBookingResponses)
            {
                string targetName = "Provider";
                if (b.TargetType == "Mentor" && b.TargetMentor != null) targetName = b.TargetMentor.FullName;
                else if (b.TargetType == "Student" && b.TargetStudent != null) targetName = b.TargetStudent.FullName;
                else if (b.TargetType == "Team" && b.TargetTeam != null) targetName = b.TargetTeam.Name;

                string icon = b.Status switch
                {
                    "Confirmed" => "bi bi-calendar-check-fill text-success",
                    "Rejected" => "bi bi-calendar-x-fill text-danger",
                    _ => "bi bi-info-circle-fill text-secondary"
                };

                notifications.Add(new NotificationViewModel
                {
                    Id = $"booking_res_{b.Id}",
                    Title = $"Booking {b.Status}",
                    Message = $"Your booking for \"{b.Topic}\" with {targetName} is {b.Status.ToLower()}.",
                    Timestamp = b.PaidAt ?? b.CreatedAt,
                    Status = b.Status,
                    Type = "Booking",
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = icon,
                    SenderName = targetName,
                    TargetName = b.Topic ?? "Session"
                });
            }

            // Sort newest first
            notifications = notifications.OrderByDescending(n => n.Timestamp).ToList();
            return View(notifications);
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

            return Json(new { count });
        }

        // GET: /Notifications/GetDropdownContent
        [HttpGet]
        public async Task<IActionResult> GetDropdownContent()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Content("<div class='p-3 text-center'>Please log in</div>");

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
                    Title = $"Booking {b.Status}",
                    Message = $"Booking \"{b.Topic}\" is {b.Status.ToLower()}.",
                    Timestamp = b.PaidAt ?? b.CreatedAt,
                    ActionUrl = Url.Action("Details", "Booking", new { id = b.Id }) ?? "",
                    IconClass = b.Status == "Confirmed" ? "bi bi-calendar-check-fill text-success" : "bi bi-info-circle-fill text-secondary",
                    Status = b.Status
                });
            }

            notifications = notifications.OrderByDescending(n => n.Timestamp).Take(10).ToList();
            return PartialView("_NotificationDropdown", notifications);
        }
    }
}
