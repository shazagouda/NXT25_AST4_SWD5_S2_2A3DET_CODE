using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
	public class Submission
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int ProjectId { get; set; }

		[Required]
		public string UserId { get; set; } = string.Empty;

		[Required]
		[StringLength(200)]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000)]
		public string Description { get; set; } = string.Empty;

		public string FileUrl { get; set; } = string.Empty;
		public string GitHubUrl { get; set; } = string.Empty;
		public string DemoUrl { get; set; } = string.Empty;

		public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected, Revision

		public string? Feedback { get; set; }

		public int? Score { get; set; } // 0-100

		public DateTime SubmittedAt { get; set; }
		public DateTime? ReviewedAt { get; set; }

		// Navigation Properties
		[ForeignKey(nameof(ProjectId))]
		public virtual Project Project { get; set; } = null!;

		[ForeignKey(nameof(UserId))]
		public virtual ApplicationUser User { get; set; } = null!;
	}
}