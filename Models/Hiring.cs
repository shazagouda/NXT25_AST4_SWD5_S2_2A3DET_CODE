using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Hiring
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ApplicationId { get; set; }

        [Required]
        public string CompanyId { get; set; } = string.Empty;

        [Required]
        public string StudentId { get; set; } = string.Empty;

        public string Status { get; set; } = "Accepted";

        public string? Notes { get; set; }

        public DateTime HiredAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(ApplicationId))]
        public virtual Application Application { get; set; } = null!;

        [ForeignKey(nameof(CompanyId))]
        public virtual ApplicationUser Company { get; set; } = null!;

        [ForeignKey(nameof(StudentId))]
        public virtual ApplicationUser Student { get; set; } = null!;
    }
}
