
using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Account
{
    public class RegisterCompanyViewModel
    {
        [Required(ErrorMessage = "Company name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Company name must be between 2 and 100 characters")]
        [Display(Name = "Company Name")]
        public string CompanyName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [Display(Name = "Company Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Industry is required")]
        [Display(Name = "Industry")]
        public string Industry { get; set; } = string.Empty;

        [Url(ErrorMessage = "Invalid website URL")]
        [Display(Name = "Company Website")]
        public string? Website { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        [Display(Name = "Company Description")]
        public string? CompanyDescription { get; set; }

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