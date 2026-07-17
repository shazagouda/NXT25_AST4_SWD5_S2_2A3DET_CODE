using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using A3DET_CODE.Services;
using Microsoft.AspNetCore.Identity;
using A3DET_CODE.Models;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task; 

namespace A3DET_CODE.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatHub(IChatService chatService, UserManager<ApplicationUser> userManager)
        {
            _chatService = chatService;
            _userManager = userManager;
        }

        public async Task JoinGroup(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
        }

        public async Task LeaveGroup(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }

        public async Task SendMessage(int groupId, string content)
        {
            var userId = Context.UserIdentifier!;
            var user = await _userManager.FindByIdAsync(userId);

            var message = await _chatService.SaveMessageAsync(groupId, userId, content);

            await Clients.Group(groupId.ToString()).SendAsync("ReceiveMessage", new
            {
                id = message.Id,
                senderId = userId,
                senderName = user?.FullName ?? "مستخدم",
                content = message.Content,
                sentAt = message.SentAt
            });
        }
    }
}