using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Profile
{
    public class EditProfileViewModel
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100, MinimumLength = 2)]
        [Display(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;

        [Display(Name = "Email Address")]
        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        [Display(Name = "University")]
        public string? University { get; set; }

        [Display(Name = "Faculty")]
        public string? Faculty { get; set; }

        [Display(Name = "Academic Year")]
        public string? AcademicYear { get; set; }

        [Display(Name = "Job Title")]
        public string? JobTitle { get; set; }

        [Display(Name = "Years of Experience")]
        [Range(0, 50, ErrorMessage = "Years must be between 0 and 50")]
        public int? YearsOfExperience { get; set; }

        [Display(Name = "Skills")]
        public string? Skills { get; set; }

        [Display(Name = "LinkedIn Profile")]
        [Url(ErrorMessage = "Invalid URL")]
        public string? LinkedInUrl { get; set; }

        [Display(Name = "Company Name")]
        public string? CompanyName { get; set; }

        [Display(Name = "Industry")]
        public string? Industry { get; set; }

        [Display(Name = "Company Description")]
        public string? CompanyDescription { get; set; }

        [Display(Name = "Website")]
        [Url(ErrorMessage = "Invalid URL")]
        public string? Website { get; set; }
    }
}