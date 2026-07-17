using A3DET_CODE.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;   // <-- هذا الحل

namespace A3DET_CODE.Services
{
    public interface IChatService
    {
        Task<ChatGroup> GetOrCreatePrivateChatAsync(string userId1, string userId2);
        Task<ChatGroup> CreateTeamChatAsync(int teamId, string teamName);
        Task AddUserToGroupAsync(int groupId, string userId);
        Task<List<ChatGroup>> GetUserChatsAsync(string userId);
        Task<List<ChatMessage>> GetGroupMessagesAsync(int groupId, int skip = 0, int take = 50);
        Task<ChatMessage> SaveMessageAsync(int groupId, string senderId, string content);
        Task<ChatGroup?> GetGroupByIdAsync(int groupId);
        Task<bool> IsUserInGroupAsync(int groupId, string userId);
    }
}