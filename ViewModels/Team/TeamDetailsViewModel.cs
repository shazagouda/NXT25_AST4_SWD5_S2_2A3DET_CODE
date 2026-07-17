namespace A3DET_CODE.ViewModels.Team
{
    public class TeamDetailsViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string LeaderId { get; set; } = string.Empty;
        public string LeaderName { get; set; } = string.Empty;
        public string LeaderInitials { get; set; } = string.Empty;
        public int TrackId { get; set; }
        public string TrackName { get; set; } = string.Empty;
        public string TrackColor { get; set; } = string.Empty;
        public int? ProjectId { get; set; }
        public string? ProjectTitle { get; set; }
        public string? ProjectStatus { get; set; }
        public int MaxMembers { get; set; }
        public int CurrentMembers { get; set; }
        public string Status { get; set; } = string.Empty;
        public string StatusColor { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public List<TeamMemberViewModel> Members { get; set; } = new();
        public bool IsLeader { get; set; }
        public bool IsMember { get; set; }
        public int AvailableSlots => MaxMembers - CurrentMembers;
        public bool IsFull => CurrentMembers >= MaxMembers;
        public bool IsOpen => Status == "Open";
        public bool CanJoin => IsOpen && !IsFull && !IsMember;
        public bool CanLeave => IsMember && !IsLeader;
        public bool CanDelete => IsLeader;
        public int PendingRequestsCount { get; set; }

        public int? ChatGroupId { get; set; }
    }
}