namespace A3DET_CODE.ViewModels.Dashboard
{
    public class BaseDashboardViewModel
    {
        public string UserName { get; set; } = string.Empty;
        public string UserRole { get; set; } = string.Empty;
        public string UserAvatar { get; set; } = string.Empty;
        public DateTime LastLogin { get; set; }
    }
}