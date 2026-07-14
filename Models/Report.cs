using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.Models
{
    public class Report
    {
        public int Id { get; set; }

        [Required]
        public string ReporterId { get; set; } = string.Empty;
        public ApplicationUser Reporter { get; set; } = null!;

        [Required]
        public string ReportedUserId { get; set; } = string.Empty;
        public ApplicationUser ReportedUser { get; set; } = null!;

        public int? ProjectId { get; set; }
        public Project? Project { get; set; }

        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        [Required]
        public string Reason { get; set; } = string.Empty; // Spam, Harassment, Inappropriate, FakeInfo, Offensive, Other

        public string? AdditionalDetails { get; set; }

        public bool IsAnonymous { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Reviewed, Resolved, Rejected

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ResolvedAt { get; set; }

        public string? ResolvedBy { get; set; }
        public string? ResolutionNote { get; set; }
    }
}