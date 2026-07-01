using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Submission
{
	public class SubmissionViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Title is required")]
		[StringLength(200, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 200 characters")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
		public string Description { get; set; } = string.Empty;

		[Required(ErrorMessage = "Project is required")]
		public int ProjectId { get; set; }
		public string ProjectTitle { get; set; } = string.Empty;

		[Required(ErrorMessage = "User is required")]
		public string UserId { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public string UserInitials { get; set; } = string.Empty;

		public string FileUrl { get; set; } = string.Empty;
		public string GitHubUrl { get; set; } = string.Empty;
		public string DemoUrl { get; set; } = string.Empty;

		public string Status { get; set; } = "Pending";
		public string? Feedback { get; set; }
		public int? Score { get; set; }

		public DateTime SubmittedAt { get; set; }
		public DateTime? ReviewedAt { get; set; }

		public bool IsPending => Status == "Pending";
		public bool IsApproved => Status == "Approved";
		public bool IsRejected => Status == "Rejected";
		public bool IsRevision => Status == "Revision";
		public bool HasScore => Score.HasValue;
	}
}