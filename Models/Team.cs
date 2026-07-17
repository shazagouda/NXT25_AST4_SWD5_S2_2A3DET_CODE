using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string LeaderId { get; set; } = string.Empty;

        [Required]
        public int TrackId { get; set; }

        public int? ProjectId { get; set; }

        [Range(2, 10)]
        public int MaxMembers { get; set; } = 5;

        public int CurrentMembers { get; set; } = 1;

        public string Status { get; set; } = "Open"; // Open, Full, InProgress, Completed

        public DateTime CreatedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? HourlyRate { get; set; }

        // ✅ معرف مجموعة الدردشة الخاصة بالفريق
        public int? ChatGroupId { get; set; }

        // Navigation Properties
        [ForeignKey(nameof(LeaderId))]
        public virtual ApplicationUser Leader { get; set; } = null!;

        [ForeignKey(nameof(TrackId))]
        public virtual Track Track { get; set; } = null!;

        [ForeignKey(nameof(ProjectId))]
        public virtual Project? Project { get; set; }

        public virtual ICollection<TeamMember> Members { get; set; } = new List<TeamMember>();
    }
}