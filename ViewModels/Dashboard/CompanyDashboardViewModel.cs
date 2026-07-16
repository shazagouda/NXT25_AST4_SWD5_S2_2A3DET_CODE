namespace A3DET_CODE.ViewModels.Dashboard
{
    public class CompanyDashboardViewModel : BaseDashboardViewModel
    {
        public int TotalBookings { get; set; }
        public int ActiveContracts { get; set; }
        public int PendingBookings { get; set; }
        public int CompletedContracts { get; set; }
        public decimal TotalSpent { get; set; }

        public List<BookingSummary> RecentBookings { get; set; } = new();
        public List<CandidateSummary> TopCandidates { get; set; } = new();
    }

    public class BookingSummary
    {
        public int Id { get; set; }
        public string TargetName { get; set; } = string.Empty;
        public string TargetType { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = "Pending";
    }

    public class CandidateSummary
    {
        public string Name { get; set; } = string.Empty;
        public string Track { get; set; } = string.Empty;
        public int MatchScore { get; set; }
        public int ProjectsCount { get; set; }
    }
}