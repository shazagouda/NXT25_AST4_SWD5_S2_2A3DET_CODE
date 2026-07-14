using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.Models
{
    public class JoinRequest
    {
        public int Id { get; set; }

        [Required]
        public int TeamId { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Pending"; // "Pending", "Accepted", "Rejected"

        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

        public DateTime? RespondedAt { get; set; }

        public string? ResponseMessage { get; set; }

        // ============================================================
        // Navigation Properties
        // ============================================================

        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; } = null!;

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; } = null!;
    }
}
