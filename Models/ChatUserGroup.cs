using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class ChatUserGroup
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int GroupId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastReadAt { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; } = null!;

        [ForeignKey(nameof(GroupId))]
        public virtual ChatGroup Group { get; set; } = null!;
    }
}