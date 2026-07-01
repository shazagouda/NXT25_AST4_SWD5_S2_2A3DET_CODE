using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
	public class Project
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[StringLength(200, MinimumLength = 3)]
		public string Title { get; set; } = string.Empty;

		[Required]
		[StringLength(1000)]
		public string Description { get; set; } = string.Empty;

		[Required]
		public string TechStack { get; set; } = string.Empty;

		[Required]
		public string Type { get; set; } = string.Empty; // Web, Mobile, Full-stack, DevOps, AI/ML

		public string Status { get; set; } = "Open"; // Open, InProgress, Completed, Archived

		[Required]
		public int TrackId { get; set; }

		public int? TeamId { get; set; }

		public string? ClientId { get; set; } // Company Id

		public string? RepositoryUrl { get; set; }

		public string? DemoUrl { get; set; }

		public int Progress { get; set; } = 0; // 0-100

		public DateTime CreatedAt { get; set; }
		public DateTime? StartedAt { get; set; }
		public DateTime? CompletedAt { get; set; }
		public DateTime? Deadline { get; set; }

		// Navigation Properties
		[ForeignKey(nameof(TrackId))]
		public virtual Track Track { get; set; } = null!;

		[ForeignKey(nameof(TeamId))]
		public virtual Team? Team { get; set; }

		[ForeignKey(nameof(ClientId))]
		public virtual ApplicationUser? Client { get; set; }

        public virtual ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
        public virtual ICollection<PortfolioProject> PortfolioProjects { get; set; } = new List<PortfolioProject>();
        public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
		public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    }
}