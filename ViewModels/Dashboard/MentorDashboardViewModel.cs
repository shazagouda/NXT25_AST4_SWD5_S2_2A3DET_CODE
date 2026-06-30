namespace A3DET_CODE.ViewModels.Dashboard
{
    public class MentorDashboardViewModel : BaseDashboardViewModel
    {
        public int TotalStudents { get; set; }
        public int ActiveStudents { get; set; }
        public int TotalProjectsReviewed { get; set; }
        public int TotalSessions { get; set; }
        public double AverageRating { get; set; }

        public List<StudentProgress> StudentsProgress { get; set; } = new();
        public List<PendingReview> PendingReviews { get; set; } = new();
        public List<UpcomingSession> UpcomingSessions { get; set; } = new();
    }

    public class StudentProgress
    {
        public string Name { get; set; } = string.Empty;
        public string Track { get; set; } = string.Empty;
        public int Progress { get; set; }
        public string Status { get; set; } = "Active";
    }

    public class PendingReview
    {
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
    }

    public class UpcomingSession
    {
        public int SessionId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public DateTime ScheduledAt { get; set; }
        public string Topic { get; set; } = string.Empty;
    }
}