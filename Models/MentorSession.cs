using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class MentorSession
    {
        public int Id { get; set; }

        [Required]
        public int MentorId { get; set; }

        [ForeignKey("MentorId")]
        public virtual Mentor Mentor { get; set; } = null!;

        [Required]
        public string StudentId { get; set; } = string.Empty;

        [ForeignKey("StudentId")]
        public virtual ApplicationUser Student { get; set; } = null!;

        [Required]
        public DateTime ScheduledAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        [StringLength(200)]
        public string? Topic { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        public int DurationMinutes { get; set; } = 60;

        public bool IsConfirmed { get; set; } = false;

        public bool IsCompleted { get; set; } = false;

        public int? StudentRating { get; set; } // 1-5
        public string? StudentFeedback { get; set; }

        public int? MentorRating { get; set; }
        public string? MentorFeedback { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}