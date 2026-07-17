using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Services;
using A3DET_CODE.ViewModels.Chat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ChatController : Controller
    {
        private readonly IChatService _chatService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ChatController(IChatService chatService, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _chatService = chatService;
            _userManager = userManager;
            _context = context;
        }

        // ============================================
        // عرض قائمة المحادثات
        // ============================================
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var groups = await _chatService.GetUserChatsAsync(user.Id);

            var viewModel = new ChatIndexViewModel
            {
                UserId = user.Id,
                Groups = groups.Select(g => new ChatGroupSummary
                {
                    Id = g.Id,
                    Name = g.IsPrivate ? GetPrivateChatName(g, user.Id) : g.Name ?? "مجموعة",
                    IsPrivate = g.IsPrivate,
                    LastMessage = g.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault()?.Content,
                    LastMessageTime = g.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault()?.SentAt,
                    AvatarColor = g.IsPrivate ? "linear-gradient(135deg,#2563eb,#0d9488)" : "linear-gradient(135deg,#0d9488,#2563eb)",
                    AvatarLetter = g.IsPrivate
                        ? (GetPrivateChatName(g, user.Id).Substring(0, 1).ToUpper())
                        : (g.Name?.Substring(0, 1).ToUpper() ?? "G"),
                    IsGroup = !g.IsPrivate,
                    Tag = g.IsPrivate ? "Direct" : "Team chat",
                    UnreadCount = 0
                }).ToList()
            };

            return View(viewModel);
        }

        // ============================================
        // عرض تفاصيل محادثة معينة (نافذة الدردشة)
        // ============================================
        public async Task<IActionResult> Details(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login", "Account");

            var group = await _chatService.GetGroupByIdAsync(id);
            if (group == null) return NotFound();

            if (!group.Users.Any(u => u.UserId == user.Id))
                return Forbid();

            var messages = await _chatService.GetGroupMessagesAsync(id);

            var viewModel = new ChatDetailsViewModel
            {
                GroupId = id,
                GroupName = group.IsPrivate ? GetPrivateChatName(group, user.Id) : group.Name ?? "مجموعة",
                IsPrivate = group.IsPrivate,
                CurrentUserId = user.Id,
                IsGroup = !group.IsPrivate,
                AvatarColor = group.IsPrivate ? "linear-gradient(135deg,#2563eb,#0d9488)" : "linear-gradient(135deg,#0d9488,#2563eb)",
                AvatarLetter = group.IsPrivate
                    ? (GetPrivateChatName(group, user.Id).Substring(0, 1).ToUpper())
                    : (group.Name?.Substring(0, 1).ToUpper() ?? "G"),
                Tag = group.IsPrivate ? "Direct" : "Team chat",
                Messages = messages.Select(m => new ChatMessageViewModel
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    SenderName = m.Sender?.FullName ?? "مجهول",
                    Content = m.Content,
                    SentAt = m.SentAt,
                    IsMine = m.SenderId == user.Id
                }).ToList()
            };

            return View(viewModel);
        }

        // ============================================
        // بدء محادثة خاصة مع مستخدم آخر
        // ============================================
        public async Task<IActionResult> CreatePrivate(string userId)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return RedirectToAction("Login", "Account");

            if (userId == currentUser.Id)
            {
                TempData["Error"] = "لا يمكنك الدردشة مع نفسك!";
                return RedirectToAction("Index", "Profile");
            }

            var group = await _chatService.GetOrCreatePrivateChatAsync(currentUser.Id, userId);
            return RedirectToAction("Details", new { id = group.Id });
        }


        private string GetPrivateChatName(ChatGroup group, string currentUserId)
        {
            var other = group.Users.FirstOrDefault(u => u.UserId != currentUserId);
            return other?.User?.FullName ?? "مستخدم";
        }
    }
}