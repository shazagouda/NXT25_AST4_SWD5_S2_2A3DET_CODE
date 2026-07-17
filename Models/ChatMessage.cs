using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string SenderId { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;

        [ForeignKey(nameof(GroupId))]
        public virtual ChatGroup Group { get; set; } = null!;

        [ForeignKey(nameof(SenderId))]
        public virtual ApplicationUser Sender { get; set; } = null!;
    }
}