using A3DET_CODE.ViewModels.Team;

namespace A3DET_CODE.ViewModels.Dashboard
{
    public class TeamDashboardViewModel
    {
        // Team Info
        public int TeamId { get; set; }
        public string TeamName { get; set; } = string.Empty;
        public string TeamDescription { get; set; } = string.Empty;
        public string TrackName { get; set; } = string.Empty;
        public string TrackColor { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int MaxMembers { get; set; }
        public int CurrentMembers { get; set; }
        public bool IsLeader { get; set; }

        // Project Info
        public int? ProjectId { get; set; }
        public string? ProjectTitle { get; set; }
        public int ProjectProgress { get; set; }
        public string? ProjectStatus { get; set; }

        // Members
        public List<TeamMemberViewModel> Members { get; set; } = new();

        // Tasks Stats
        public int TotalTasks { get; set; }
        public int CompletedTasks { get; set; }
        public int InProgressTasks { get; set; }
        public int PendingTasks { get; set; }
        public double TaskCompletionRate { get; set; }

        // Submissions Stats
        public int TotalSubmissions { get; set; }
        public int PendingSubmissions { get; set; }
        public double AverageScore { get; set; }

        // Recent Activity
        public List<TeamActivity> RecentActivities { get; set; } = new();

        // ✅ USE EXISTING UpcomingTask CLASS (from StudentDashboardViewModel)
        public List<UpcomingTask> UpcomingTasks { get; set; } = new();

        // Quick Stats
        public int AvailableSlots => MaxMembers - CurrentMembers;
        public bool IsFull => CurrentMembers >= MaxMembers;
    }

    public class TeamActivity
    {
        public string Type { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserInitials { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string Icon { get; set; } = string.Empty;
        public string IconColor { get; set; } = string.Empty;
    }
}