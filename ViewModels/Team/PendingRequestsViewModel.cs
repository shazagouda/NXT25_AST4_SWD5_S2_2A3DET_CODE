namespace A3DET_CODE.ViewModels.Team
{
    public class PendingRequestsViewModel
    {
        public int TeamId { get; set; }
        public int? ProjectId { get; set; }
        public string TeamName { get; set; } = string.Empty;
        public List<JoinRequestViewModel> Requests { get; set; } = new();
    }
}
