using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorDetailViewModel : MentorViewModel
    {
        [Display(Name = "LinkedIn")]
        public string? LinkedInUrl { get; set; }

        [Display(Name = "GitHub")]
        public string? GitHubUrl { get; set; }

        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Display(Name = "Member Since")]
        public DateTime CreatedAt { get; set; }

        [Display(Name = "Recent Sessions")]
        public List<SessionSummaryViewModel> RecentSessions { get; set; } = new();

        [Display(Name = "Active Mentees")]
        public int ActiveMenteesCount { get; set; }

        [Display(Name = "Projects")]
        public int ProjectsCount { get; set; }

        [Display(Name = "Teams")]
        public int TeamsCount { get; set; }

        public List<string> SkillsList => Skills?.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(s => s.Trim())
            .ToList() ?? new List<string>();
    }
}