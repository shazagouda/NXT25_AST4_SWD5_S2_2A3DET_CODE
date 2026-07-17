using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class DismissedNotification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; } = null!;

        /// <summary>
        /// The notification string ID (e.g. "join_5", "booking_12", "released_3")
        /// </summary>
        [Required]
        [StringLength(100)]
        public string NotificationId { get; set; } = string.Empty;

        public DateTime DismissedAt { get; set; } = DateTime.UtcNow;
    }
}
