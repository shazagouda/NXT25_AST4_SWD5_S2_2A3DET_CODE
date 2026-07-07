using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Application
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public string ApplicantId { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string CoverLetter { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending";

        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey(nameof(ApplicantId))]
        public virtual ApplicationUser Applicant { get; set; } = null!;

        public virtual Hiring? Hiring { get; set; }
    }
}
