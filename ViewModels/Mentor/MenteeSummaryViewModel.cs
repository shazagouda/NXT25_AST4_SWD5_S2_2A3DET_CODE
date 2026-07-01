namespace A3DET_CODE.ViewModels.Mentor
{
    public class MenteeSummaryViewModel
    {
        public string StudentId { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public string? StudentAvatar { get; set; }
        public DateTime AssignedAt { get; set; }
        public bool IsActive { get; set; }
        public int SessionsCount { get; set; }
        public double? AverageRating { get; set; }
        public string? CurrentTrack { get; set; }

        public string AssignedDisplay => AssignedAt.ToString("MMM yyyy");
        public string Status => IsActive ? "Active" : "Inactive";
        public string RatingDisplay => AverageRating.HasValue ? $"{AverageRating:F1} ★" : "No sessions yet";
    }
}