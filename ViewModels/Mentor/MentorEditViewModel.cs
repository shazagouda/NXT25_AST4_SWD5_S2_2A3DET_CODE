using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorEditViewModel
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Full name must be between 2 and 100 characters")]
        [Display(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Expertise is required")]
        [StringLength(100, ErrorMessage = "Expertise cannot exceed 100 characters")]
        [Display(Name = "Expertise")]
        public string Expertise { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Bio cannot exceed 500 characters")]
        [Display(Name = "Bio")]
        public string? Bio { get; set; }

        [Url(ErrorMessage = "Please enter a valid URL")]
        [Display(Name = "LinkedIn URL")]
        public string? LinkedInUrl { get; set; }

        [Url(ErrorMessage = "Please enter a valid URL")]
        [Display(Name = "GitHub URL")]
        public string? GitHubUrl { get; set; }

        [Range(0, 50, ErrorMessage = "Years of experience must be between 0 and 50")]
        [Display(Name = "Years of Experience")]
        public int YearsOfExperience { get; set; }

        [Display(Name = "Skills (comma separated)")]
        public string? Skills { get; set; }

        [Display(Name = "Email")]
        public string? Email { get; set; }

        public string? ExistingAvatar { get; set; }
        public bool IsVerified { get; set; }
    }
}