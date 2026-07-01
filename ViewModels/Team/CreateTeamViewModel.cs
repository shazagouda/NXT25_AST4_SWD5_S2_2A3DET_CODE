using A3DET_CODE.ViewModels.Track;
using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Team
{
	public class CreateTeamViewModel
	{
		[Required(ErrorMessage = "Team name is required")]
		[StringLength(100, MinimumLength = 3, ErrorMessage = "Team name must be between 3 and 100 characters")]
		[Display(Name = "Team Name")]
		public string Name { get; set; } = string.Empty;

		[StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
		[Display(Name = "Description")]
		public string Description { get; set; } = string.Empty;

		[Required(ErrorMessage = "Track is required")]
		[Display(Name = "Track")]
		public int TrackId { get; set; }

		[Required(ErrorMessage = "Maximum members is required")]
		[Range(2, 10, ErrorMessage = "Team size must be between 2 and 10 members")]
		[Display(Name = "Maximum Members")]
		public int MaxMembers { get; set; } = 5;

		public List<TrackViewModel> Tracks { get; set; } = new();
	}
}