namespace A3DET_CODE.ViewModels.Mentor
{
    public class ProjectSummaryViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string TechStack { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string TrackName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int TeamCount { get; set; }

        public string StatusBadge => Status?.ToLower() switch
        {
            "completed" => "badge-teal",
            "inprogress" => "badge-amber",
            "open" => "badge-blue",
            _ => "badge-secondary"
        };
        public string CreatedDisplay => CreatedAt.ToString("MMM dd, yyyy");
    }
}