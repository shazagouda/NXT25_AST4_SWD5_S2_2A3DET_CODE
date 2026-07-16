using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Booking
{
    public class CreateBookingViewModel
    {
        // Target info (pre-filled from the target)
        [Required]
        public string TargetType { get; set; } = string.Empty; // "Mentor", "Student", "Team"

        public int? TargetMentorId { get; set; }
        public string? TargetStudentId { get; set; }
        public int? TargetTeamId { get; set; }

        // Display info
        public string TargetName { get; set; } = string.Empty;
        public string TargetExpertise { get; set; } = string.Empty;
        public string? TargetImageUrl { get; set; }
        public string TargetInitials { get; set; } = string.Empty;
        public double TargetRating { get; set; }
        public string? TargetSkills { get; set; }
        public decimal HourlyRate { get; set; }

        // Booking form fields
        [Required(ErrorMessage = "Please select a start date")]
        [Display(Name = "Start Date")]
        public DateTime ScheduledAt { get; set; } = DateTime.Now.Date.AddDays(1);

        [Required(ErrorMessage = "Please select an end date")]
        [Display(Name = "End Date")]
        public DateTime EndDate { get; set; } = DateTime.Now.Date.AddDays(2);

        public int DurationMinutes { get; set; } = 0;

        [Required(ErrorMessage = "Please enter a topic")]
        [StringLength(200)]
        [Display(Name = "Topic")]
        public string Topic { get; set; } = string.Empty;

        [StringLength(1000)]
        [Display(Name = "Additional Notes")]
        public string? Notes { get; set; }

        // Calculated pricing (for display)
        public int TotalDays => (EndDate.Date >= ScheduledAt.Date) ? (int)(EndDate.Date - ScheduledAt.Date).TotalDays + 1 : 1;
        public decimal SubtotalPrice => TargetType == "Project" ? HourlyRate : HourlyRate * 8m * TotalDays;
        public decimal PlatformFee => Math.Round(SubtotalPrice * 0.10m, 2); // 10% platform fee
        public decimal TotalPrice => SubtotalPrice; // Booker pays subtotal (or subtotal + fee? Usually booker pays subtotal, seller gets subtotal - fee. Let's do that)
        public decimal NetAmount => SubtotalPrice - PlatformFee;

        public List<int> AvailableDurations { get; set; } = new() { 30, 60, 90, 120, 180, 240 };
    }

    public class BookingDetailsViewModel
    {
        public int Id { get; set; }
        public string BookerName { get; set; } = string.Empty;
        public string BookerEmail { get; set; } = string.Empty;
        public string BookerRole { get; set; } = string.Empty;
        public string BookerInitials { get; set; } = string.Empty;
        public string BookerUserId { get; set; } = string.Empty;

        public string TargetType { get; set; } = string.Empty;
        public string TargetName { get; set; } = string.Empty;
        public string? TargetImageUrl { get; set; }
        public string TargetInitials { get; set; } = string.Empty;
        public string TargetExpertise { get; set; } = string.Empty;

        public DateTime ScheduledAt { get; set; }
        public DateTime? EndDate { get; set; }
        public int DurationMinutes { get; set; }
        public string? Topic { get; set; }
        public string? Notes { get; set; }

        public decimal HourlyRate { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal PlatformFee { get; set; }
        public decimal NetAmount { get; set; }

        public string PaymentStatus { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public int? ContractId { get; set; }
        public string? ContractStatus { get; set; }

        public bool CanCancel => Status == "PendingPayment" || Status == "Confirmed";
        public bool HasContract => ContractId.HasValue;
        public bool CanPay => Status == "PendingPayment";
        public decimal BookerWalletBalance { get; set; }
        public bool CanPayFromWallet => CanPay && BookerWalletBalance >= TotalPrice;
    }

    public class MyBookingsViewModel
    {
        public List<BookingDetailsViewModel> AllBookings { get; set; } = new();
        public List<BookingDetailsViewModel> SentBookings { get; set; } = new();
        public List<BookingDetailsViewModel> ReceivedBookings { get; set; } = new();
        public string CurrentUserId { get; set; } = string.Empty;
        public string CurrentUserRole { get; set; } = string.Empty;
    }
}
