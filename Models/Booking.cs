using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        // Who is making the booking
        [Required]
        public string BookerUserId { get; set; } = string.Empty;

        [ForeignKey(nameof(BookerUserId))]
        public virtual ApplicationUser BookerUser { get; set; } = null!;

        // Target type: "Mentor", "Student", "Team"
        [Required]
        [StringLength(20)]
        public string TargetType { get; set; } = string.Empty;

        // Target references (only one will be set based on TargetType)
        public int? TargetMentorId { get; set; }

        [ForeignKey(nameof(TargetMentorId))]
        public virtual Mentor? TargetMentor { get; set; }

        public string? TargetStudentId { get; set; }

        [ForeignKey(nameof(TargetStudentId))]
        public virtual ApplicationUser? TargetStudent { get; set; }

        public int? TargetTeamId { get; set; }

        [ForeignKey(nameof(TargetTeamId))]
        public virtual Team? TargetTeam { get; set; }

        // Booking details
        // Booking details
        [Required]
        public DateTime ScheduledAt { get; set; }

        public DateTime? EndDate { get; set; }

        public int DurationMinutes { get; set; } = 60;

        [StringLength(200)]
        public string? Topic { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Pricing
        [Column(TypeName = "decimal(18,2)")]
        public decimal HourlyRate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PlatformFee { get; set; } // 10%

        [Column(TypeName = "decimal(18,2)")]
        public decimal NetAmount { get; set; } // After platform fee

        // Stripe Payment
        [StringLength(500)]
        public string? StripeSessionId { get; set; }

        [StringLength(500)]
        public string? StripePaymentIntentId { get; set; }

        [StringLength(20)]
        public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed, Refunded

        // Booking Status
        [StringLength(20)]
        public string Status { get; set; } = "PendingPayment"; // PendingPayment, Confirmed, InProgress, Completed, Cancelled

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? PaidAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        // Navigation
        public virtual Contract? Contract { get; set; }
    }
}
