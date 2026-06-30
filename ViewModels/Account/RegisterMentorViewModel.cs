
using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Account
{
    public class RegisterMentorViewModel
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Full name must be between 2 and 100 characters")]
        [Display(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [Display(Name = "Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Job title is required")]
        [Display(Name = "Job Title")]
        public string JobTitle { get; set; } = string.Empty;

        [Required(ErrorMessage = "Years of experience is required")]
        [Range(0, 50, ErrorMessage = "Years of experience must be between 0 and 50")]
        [Display(Name = "Years of Experience")]
        public int YearsOfExperience { get; set; }

        [Required(ErrorMessage = "Skills are required")]
        [Display(Name = "Skills (comma separated)")]
        public string Skills { get; set; } = string.Empty;

        [Url(ErrorMessage = "Invalid LinkedIn URL")]
        [Display(Name = "LinkedIn Profile")]
        public string? LinkedInUrl { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please confirm your password")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "You must accept the terms and conditions")]
        [Display(Name = "I accept the Terms & Conditions")]
        public bool AcceptTerms { get; set; }
    }
}