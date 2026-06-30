namespace A3DET_CODE.ViewModels.Dashboard
{
    public class CompanyDashboardViewModel : BaseDashboardViewModel
    {
        public int TotalJobPosts { get; set; }
        public int ActiveJobPosts { get; set; }
        public int TotalApplications { get; set; }
        public int ShortlistedCandidates { get; set; }
        public int HiredCandidates { get; set; }

        public List<JobPostSummary> RecentJobPosts { get; set; } = new();
        public List<CandidateSummary> TopCandidates { get; set; } = new();
    }

    public class JobPostSummary
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int ApplicationsCount { get; set; }
        public DateTime PostedAt { get; set; }
        public string Status { get; set; } = "Active";
    }

    public class CandidateSummary
    {
        public string Name { get; set; } = string.Empty;
        public string Track { get; set; } = string.Empty;
        public int MatchScore { get; set; }
        public int ProjectsCount { get; set; }
    }
}