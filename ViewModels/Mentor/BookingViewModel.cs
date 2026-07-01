using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class BookingViewModel
    {
        [Required]
        public int MentorId { get; set; }

        [Required]
        public string MentorName { get; set; } = string.Empty;

        [Required]
        public string StudentId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a date and time")]
        [Display(Name = "Date & Time")]
        public DateTime ScheduledAt { get; set; }

        [Required(ErrorMessage = "Please select a duration")]
        [Range(15, 180, ErrorMessage = "Duration must be between 15 and 180 minutes")]
        [Display(Name = "Duration (minutes)")]
        public int DurationMinutes { get; set; } = 60;

        [Required(ErrorMessage = "Please enter a topic")]
        [StringLength(200, ErrorMessage = "Topic cannot exceed 200 characters")]
        [Display(Name = "Topic")]
        public string Topic { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Notes cannot exceed 500 characters")]
        [Display(Name = "Notes (optional)")]

        public List<int> AvailableDurations { get; set; } = new() { 15, 30, 45, 60, 90, 120 };

        public string ScheduledDisplay => ScheduledAt.ToString("MMM dd, yyyy h:mm tt");
        public string DurationDisplay => $"{DurationMinutes} min";
    }
}