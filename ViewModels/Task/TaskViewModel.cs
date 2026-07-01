using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Task
{
	public class TaskViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Task title is required")]
		[StringLength(200, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 200 characters")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
		public string Description { get; set; } = string.Empty;

		[Required(ErrorMessage = "Project is required")]
		public int ProjectId { get; set; }
		public string ProjectTitle { get; set; } = string.Empty;

		[Required(ErrorMessage = "Assigned to is required")]
		public string AssignedToId { get; set; } = string.Empty;
		public string AssignedToName { get; set; } = string.Empty;
		public string AssignedToInitials { get; set; } = string.Empty;

		public string Status { get; set; } = "Pending";
		public string Priority { get; set; } = "Medium";

		public DateTime CreatedAt { get; set; }
		public DateTime? StartedAt { get; set; }
		public DateTime? CompletedAt { get; set; }
		public DateTime? DueDate { get; set; }

		public bool IsOverdue => DueDate.HasValue && DueDate.Value < DateTime.UtcNow && Status != "Completed";
		public bool IsPending => Status == "Pending";
		public bool IsInProgress => Status == "InProgress";
		public bool IsCompleted => Status == "Completed";
		public bool IsBlocked => Status == "Blocked";
	}
}