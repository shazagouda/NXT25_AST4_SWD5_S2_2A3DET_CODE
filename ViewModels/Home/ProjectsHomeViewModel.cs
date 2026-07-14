using A3DET_CODE.ViewModels.Project;

namespace A3DET_CODE.ViewModels.Home
{
    public class ProjectsHomeViewModel
    {
        public string UserName { get; set; } = string.Empty;
        public string UserAvatar { get; set; } = string.Empty;
        public List<ProjectViewModel> RequestableProjects { get; set; } = new();
        public List<ProjectViewModel> AvailableProjects { get; set; } = new();
        public List<ProjectViewModel> LeaderProjects { get; set; } = new();
        public List<ProjectViewModel> MemberProjects { get; set; } = new();
        public int PendingRequestsCount { get; set; }
    }
}
