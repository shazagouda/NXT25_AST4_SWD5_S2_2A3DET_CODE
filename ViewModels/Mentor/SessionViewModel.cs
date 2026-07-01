using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class SessionViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Student")]
        public string StudentName { get; set; } = string.Empty;

        [Display(Name = "Student Email")]
        public string? StudentEmail { get; set; }

        [Display(Name = "Scheduled At")]
        public DateTime ScheduledAt { get; set; }

        [Display(Name = "Duration")]
        public int DurationMinutes { get; set; }

        [Display(Name = "Topic")]
        public string Topic { get; set; } = string.Empty;

        [Display(Name = "Notes")]
        public string? Notes { get; set; }

        [Display(Name = "Confirmed")]
        public bool IsConfirmed { get; set; }

        [Display(Name = "Completed")]
        public bool IsCompleted { get; set; }

        [Display(Name = "Student Rating")]
        public int? StudentRating { get; set; }

        [Display(Name = "Student Feedback")]
        public string? StudentFeedback { get; set; }

        [Display(Name = "Mentor Rating")]
        public int? MentorRating { get; set; }

        [Display(Name = "Mentor Feedback")]
        public string? MentorFeedback { get; set; }

        [Display(Name = "Created At")]
        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        public string Status => IsCompleted ? "Completed" : IsConfirmed ? "Confirmed" : "Pending";
        public string StatusBadge => IsCompleted ? "badge-teal" : IsConfirmed ? "badge-blue" : "badge-amber";
        public string ScheduledDisplay => ScheduledAt.ToString("MMM dd, yyyy h:mm tt");
        public string DurationDisplay => $"{DurationMinutes} min";
        public string RatingDisplay => StudentRating.HasValue ? $"{StudentRating} ★" : "Not rated yet";
        public string CreatedDisplay => CreatedAt.ToString("MMM dd, yyyy");
    }
}