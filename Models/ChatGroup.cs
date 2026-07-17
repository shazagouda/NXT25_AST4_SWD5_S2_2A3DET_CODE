using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.Models
{
    public class ChatGroup
    {
        public int Id { get; set; }
        public string? Name { get; set; } // null => private chat
        public bool IsPrivate { get; set; } = true;
        public string? AvatarUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ChatUserGroup> Users { get; set; } = new List<ChatUserGroup>();
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}