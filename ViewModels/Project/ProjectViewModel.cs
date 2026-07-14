using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Project
{
    public class ProjectViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Project title is required")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 200 characters")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required")]
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tech stack is required")]
        public string TechStack { get; set; } = string.Empty;

        [Required(ErrorMessage = "Project type is required")]
        public string Type { get; set; } = string.Empty;

        public string Status { get; set; } = "Open";
        public int TrackId { get; set; }
        public string TrackName { get; set; } = string.Empty;
        public string TrackColor { get; set; } = string.Empty;
        public int? TeamId { get; set; }
        public string? TeamName { get; set; }
        public string? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? RepositoryUrl { get; set; }
        public string? DemoUrl { get; set; }
        public int Progress { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime? Deadline { get; set; }

        // Stats
        public int TotalTasks { get; set; }
        public int CompletedTasks { get; set; }
        public int PendingTasks { get; set; }
        public int TotalSubmissions { get; set; }
        public double AverageScore { get; set; }
        public bool IsAssigned => TeamId.HasValue;
        public bool IsCompleted => Status == "Completed";
        public bool IsInProgress => Status == "InProgress";

        public int MemberCount { get; set; }
        public int MaxMembers { get; set; } = 5;
        public int PendingRequestsCount { get; set; }
        public bool IsLeader { get; set; }
        public bool IsMember { get; set; }
        public bool HasPendingJoinRequest { get; set; }
        public bool CanRequestToJoin { get; set; }
        public string? LeaderName { get; set; }
        public List<TeamMemberInfo> TeamMembers { get; set; } = new List<TeamMemberInfo>();
        public List<A3DET_CODE.ViewModels.Team.JoinRequestViewModel> PendingJoinRequests { get; set; } = new();
    }

    public class TeamMemberInfo
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Initials { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}