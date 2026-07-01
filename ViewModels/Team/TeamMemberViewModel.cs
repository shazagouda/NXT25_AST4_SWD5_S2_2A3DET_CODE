namespace A3DET_CODE.ViewModels.Team
{
	public class TeamMemberViewModel
	{
		public string UserId { get; set; } = string.Empty;
		public string FullName { get; set; } = string.Empty;
		public string Initials { get; set; } = string.Empty;
		public string Role { get; set; } = string.Empty;
		public DateTime JoinedAt { get; set; }
		public bool IsOnline { get; set; }
	}
}