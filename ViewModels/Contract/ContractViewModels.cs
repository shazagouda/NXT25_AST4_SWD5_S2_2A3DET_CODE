using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Contract
{
    public class ContractViewModel
    {
        public int Id { get; set; }
        public string ContractNumber { get; set; } = string.Empty;
        public int BookingId { get; set; }

        // Party A (Booker)
        public string PartyAName { get; set; } = string.Empty;
        public string PartyAEmail { get; set; } = string.Empty;
        public string PartyARole { get; set; } = string.Empty;
        public string PartyAInitials { get; set; } = string.Empty;
        public string? PartyASignature { get; set; }
        public DateTime? PartyASignedAt { get; set; }

        // Party B (Target)
        public string PartyBName { get; set; } = string.Empty;
        public string PartyBEmail { get; set; } = string.Empty;
        public string PartyBRole { get; set; } = string.Empty;
        public string PartyBInitials { get; set; } = string.Empty;
        public string? PartyBSignature { get; set; }
        public DateTime? PartyBSignedAt { get; set; }

        // Contract details
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Terms { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        // Booking details
        public string TargetType { get; set; } = string.Empty;
        public string? Topic { get; set; }
        public int DurationMinutes { get; set; }
        public decimal HourlyRate { get; set; }
        public decimal PlatformFee { get; set; }

        // Current user context
        public string CurrentUserId { get; set; } = string.Empty;
        public bool IsPartyA { get; set; }
        public bool IsPartyB { get; set; }
        public bool CanSign { get; set; }
        public bool IsFullySigned => PartyASignedAt.HasValue && PartyBSignedAt.HasValue;
    }

    public class SignContractViewModel
    {
        [Required]
        public int ContractId { get; set; }

        [Required(ErrorMessage = "Please draw your signature")]
        public string SignatureData { get; set; } = string.Empty; // base64 image data

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the terms and conditions")]
        public bool AgreeToTerms { get; set; }
    }

    public class MyContractsViewModel
    {
        public List<ContractViewModel> Contracts { get; set; } = new();
        public string CurrentUserId { get; set; } = string.Empty;
    }
}
