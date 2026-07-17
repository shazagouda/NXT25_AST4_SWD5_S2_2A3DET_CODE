using A3DET_CODE.Data;
using A3DET_CODE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;  
namespace A3DET_CODE.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;

        public ChatService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChatGroup> GetOrCreatePrivateChatAsync(string userId1, string userId2)
        {
            var existing = await _context.ChatGroups
                .Where(g => g.IsPrivate)
                .Where(g => g.Users.Any(u => u.UserId == userId1) && g.Users.Any(u => u.UserId == userId2))
                .Include(g => g.Users)
                .FirstOrDefaultAsync();

            if (existing != null)
                return existing;

            var group = new ChatGroup { IsPrivate = true };
            _context.ChatGroups.Add(group);
            await _context.SaveChangesAsync();

            _context.ChatUserGroups.AddRange(
                new ChatUserGroup { UserId = userId1, GroupId = group.Id },
                new ChatUserGroup { UserId = userId2, GroupId = group.Id }
            );
            await _context.SaveChangesAsync();
            return group;
        }

        public async Task<ChatGroup> CreateTeamChatAsync(int teamId, string teamName)
        {
            var group = new ChatGroup
            {
                Name = $"Team {teamName}",
                IsPrivate = false
            };
            _context.ChatGroups.Add(group);
            await _context.SaveChangesAsync();
            return group;
        }

        public async Task AddUserToGroupAsync(int groupId, string userId)
        {
            var exists = await _context.ChatUserGroups
                .AnyAsync(cug => cug.GroupId == groupId && cug.UserId == userId);
            if (exists) return;

            _context.ChatUserGroups.Add(new ChatUserGroup { UserId = userId, GroupId = groupId });
            await _context.SaveChangesAsync();
        }

        public async Task<List<ChatGroup>> GetUserChatsAsync(string userId)
        {
            return await _context.ChatUserGroups
                .Where(cug => cug.UserId == userId)
                .Include(cug => cug.Group)
                    .ThenInclude(g => g.Users)
                        .ThenInclude(u => u.User)
                .Select(cug => cug.Group)
                .OrderByDescending(g => g.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault()!.SentAt)
                .ToListAsync();
        }

        public async Task<List<ChatMessage>> GetGroupMessagesAsync(int groupId, int skip = 0, int take = 50)
        {
            return await _context.ChatMessages
                .Where(m => m.GroupId == groupId && !m.IsDeleted)
                .Include(m => m.Sender)
                .OrderByDescending(m => m.SentAt)
                .Skip(skip)
                .Take(take)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<ChatMessage> SaveMessageAsync(int groupId, string senderId, string content)
        {
            var msg = new ChatMessage
            {
                GroupId = groupId,
                SenderId = senderId,
                Content = content,
                SentAt = DateTime.UtcNow
            };
            _context.ChatMessages.Add(msg);
            await _context.SaveChangesAsync();
            return msg;
        }

        public async Task<ChatGroup?> GetGroupByIdAsync(int groupId)
        {
            return await _context.ChatGroups
                .Include(g => g.Users)
                    .ThenInclude(u => u.User)
                .FirstOrDefaultAsync(g => g.Id == groupId);
        }

        public async Task<bool> IsUserInGroupAsync(int groupId, string userId)
        {
            return await _context.ChatUserGroups
                .AnyAsync(cug => cug.GroupId == groupId && cug.UserId == userId);
        }
    }
}