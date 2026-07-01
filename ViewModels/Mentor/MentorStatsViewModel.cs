namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorStatsViewModel
    {
        public int TotalMentors { get; set; }
        public int VerifiedMentors { get; set; }
        public int TotalSessions { get; set; }
        public int TotalStudents { get; set; }
        public double AverageRating { get; set; }
        public int TotalProjects { get; set; }
        public int TotalTeams { get; set; }

        // Top expertise
        public Dictionary<string, int> ExpertiseDistribution { get; set; } = new();
        public List<MentorViewModel> TopMentors { get; set; } = new();

        // Display
        public string AverageRatingDisplay => $"{AverageRating:F1} ★";
        public string VerifiedPercentage => TotalMentors > 0 ? $"{(double)VerifiedMentors / TotalMentors * 100:F0}%" : "0%";
    }
}