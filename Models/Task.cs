using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
	public class Task
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int ProjectId { get; set; }

		[Required]
		[StringLength(200, MinimumLength = 3)]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000)]
		public string Description { get; set; } = string.Empty;

		[Required]
		public string AssignedToId { get; set; } = string.Empty;

		public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed, Blocked

		public string Priority { get; set; } = "Medium"; // Low, Medium, High, Critical

		public DateTime CreatedAt { get; set; }
		public DateTime? StartedAt { get; set; }
		public DateTime? CompletedAt { get; set; }
		public DateTime? DueDate { get; set; }

		// Navigation Properties
		[ForeignKey(nameof(ProjectId))]
		public virtual Project Project { get; set; } = null!;

		[ForeignKey(nameof(AssignedToId))]
		public virtual ApplicationUser AssignedTo { get; set; } = null!;
	}
}