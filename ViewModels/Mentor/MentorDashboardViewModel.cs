namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorDashboardViewModel
    {
        public int MentorId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Expertise { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string? Bio { get; set; }
        public string? Avatar { get; set; }

        public int TotalSessions { get; set; }
        public int ActiveMentees { get; set; }
        public int TotalProjects { get; set; }
        public int TotalTeams { get; set; }
        public int PendingSessions { get; set; }
        public int CompletedSessions { get; set; }
        public double CompletionRate { get; set; }

        public List<SessionSummaryViewModel> UpcomingSessions { get; set; } = new();
        public List<SessionSummaryViewModel> RecentSessions { get; set; } = new();
        public List<MenteeSummaryViewModel> ActiveMenteesList { get; set; } = new();
        public List<ProjectSummaryViewModel> RecentProjects { get; set; } = new();

        // Display
        public string RatingStars => new string('★', (int)Math.Floor(Rating));
        public string RatingDisplay => $"{Rating:F1}";
        public string CompletionRateDisplay => $"{CompletionRate:F0}%";
        public string Greeting => GetGreeting();

        private string GetGreeting()
        {
            var hour = DateTime.Now.Hour;
            if (hour < 12) return "Good Morning";
            if (hour < 18) return "Good Afternoon";
            return "Good Evening";
        }
    }
}