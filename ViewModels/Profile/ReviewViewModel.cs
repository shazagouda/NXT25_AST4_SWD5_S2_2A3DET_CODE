using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Profile
{
    public class ReviewViewModel
    {
        public string ReviewedUserId { get; set; } = string.Empty;
        public string ReviewedUserName { get; set; } = string.Empty;

        public int? ProjectId { get; set; }
        public string? ProjectTitle { get; set; }

        public int? TeamId { get; set; }
        public string? TeamName { get; set; }

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
    }
}