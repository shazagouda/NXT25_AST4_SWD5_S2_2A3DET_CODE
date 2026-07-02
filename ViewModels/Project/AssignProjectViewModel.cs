using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Project
{
    public class AssignProjectViewModel
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a project")]
        [Display(Name = "Select Project")]
        public int ProjectId { get; set; }

        public List<ProjectSelectViewModel> AvailableProjects { get; set; } = new();
    }

    public class ProjectSelectViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TrackName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}