using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Contract
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ContractNumber { get; set; } = string.Empty; // e.g., "A3DET-2026-00001"

        // Linked booking
        [Required]
        public int BookingId { get; set; }

        [ForeignKey(nameof(BookingId))]
        public virtual Booking Booking { get; set; } = null!;

        // Party A (the booker — Student or Company)
        [Required]
        public string PartyAUserId { get; set; } = string.Empty;

        [ForeignKey(nameof(PartyAUserId))]
        public virtual ApplicationUser PartyAUser { get; set; } = null!;

        // Party B (the target — Mentor's user, Student, or Team leader)
        public string? PartyBUserId { get; set; }

        [ForeignKey(nameof(PartyBUserId))]
        public virtual ApplicationUser? PartyBUser { get; set; }

        // If target is a team
        public int? PartyBTeamId { get; set; }

        [ForeignKey(nameof(PartyBTeamId))]
        public virtual Team? PartyBTeam { get; set; }

        // Contract details
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string? Description { get; set; }

        [Required]
        public string Terms { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Digital Signatures (base64 encoded image data from canvas)
        public string? PartyASignature { get; set; }
        public DateTime? PartyASignedAt { get; set; }

        public string? PartyBSignature { get; set; }
        public DateTime? PartyBSignedAt { get; set; }

        // Status: PendingSignatures, PartyASigned, FullySigned, Active, Completed, Cancelled
        [Required]
        [StringLength(30)]
        public string Status { get; set; } = "PendingSignatures";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
