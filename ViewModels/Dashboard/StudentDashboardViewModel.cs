namespace A3DET_CODE.ViewModels.Dashboard
{
    public class StudentDashboardViewModel : BaseDashboardViewModel
    {
        public int TotalProjects { get; set; }
        public int CompletedProjects { get; set; }
        public int InProgressProjects { get; set; }
        public int TotalTeams { get; set; }
        public int TotalBadges { get; set; }
        public int TotalPoints { get; set; }

        public double CompletionRate { get; set; } 
        public string CurrentTrack { get; set; } = string.Empty;
        public int TrackProgress { get; set; } 

        public List<RecentActivity> RecentActivities { get; set; } = new();
        public List<UpcomingTask> UpcomingTasks { get; set; } = new();

        public List<RecommendedProject> RecommendedProjects { get; set; } = new();
    }

    public class RecentActivity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Icon { get; set; } = "📌";
        public string Color { get; set; } = "blue";
    }

    public class UpcomingTask
    {
        public string Title { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public string Priority { get; set; } = "Medium";
    }

    public class RecommendedProject
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string TechStack { get; set; } = string.Empty;
        public int MatchScore { get; set; } 
    }
}