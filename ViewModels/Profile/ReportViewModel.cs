using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Profile
{
    public class ReportViewModel
    {
        public string ReportedUserId { get; set; } = string.Empty;
        public string ReportedUserName { get; set; } = string.Empty;
        public string ReportedUserRole { get; set; } = string.Empty;

        public int? ProjectId { get; set; }
        public string? ProjectTitle { get; set; }

        public int? TeamId { get; set; }
        public string? TeamName { get; set; }

        [Required(ErrorMessage = "Please select a reason")]
        public string Reason { get; set; } = string.Empty;

        public string? AdditionalDetails { get; set; }

        public bool IsAnonymous { get; set; }
    }
}