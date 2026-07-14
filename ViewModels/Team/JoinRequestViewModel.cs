namespace A3DET_CODE.ViewModels.Team
{
    public class JoinRequestViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserInitials { get; set; } = string.Empty;
        public DateTime RequestedAt { get; set; }
        public string Status { get; set; } = string.Empty; // Pending, Accepted, Rejected
    }
}
