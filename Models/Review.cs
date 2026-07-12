using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.Models
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        public string ReviewerId { get; set; } = string.Empty;
        public ApplicationUser Reviewer { get; set; } = null!;

        [Required]
        public string ReviewedUserId { get; set; } = string.Empty;
        public ApplicationUser ReviewedUser { get; set; } = null!;

        public int? ProjectId { get; set; }
        public Project? Project { get; set; }

        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        [Range(1, 5)]
        public int OverallRating { get; set; }

        [Range(1, 5)]
        public int TeamworkRating { get; set; }

        [Range(1, 5)]
        public int TechnicalSkillsRating { get; set; }

        [Range(1, 5)]
        public int DeliveryRating { get; set; }

        [Range(1, 5)]
        public int CommunicationRating { get; set; }

        public double AverageRating => (OverallRating + TeamworkRating + TechnicalSkillsRating + DeliveryRating + CommunicationRating) / 5.0;

        [StringLength(500)]
        public string? Comment { get; set; }

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}