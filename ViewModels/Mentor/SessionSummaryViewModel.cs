namespace A3DET_CODE.ViewModels.Mentor
{
    public class SessionSummaryViewModel
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string? StudentAvatar { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Topic { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public bool IsConfirmed { get; set; }
        public int DurationMinutes { get; set; }
        public int? StudentRating { get; set; }

        // Display properties
        public string Status => IsCompleted ? "Completed" : IsConfirmed ? "Confirmed" : "Pending";
        public string StatusBadge => IsCompleted ? "badge-teal" : IsConfirmed ? "badge-blue" : "badge-amber";
        public string ScheduledDisplay => ScheduledAt.ToString("MMM dd, yyyy h:mm tt");
        public string DurationDisplay => $"{DurationMinutes} min";
    }
}