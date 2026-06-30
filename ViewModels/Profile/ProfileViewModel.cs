
namespace A3DET_CODE.ViewModels.Profile
{
    public class ProfileViewModel
    {
        public string UserId { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }

        public string? University { get; set; }
        public string? Faculty { get; set; }
        public string? AcademicYear { get; set; }

        public string? JobTitle { get; set; }
        public int? YearsOfExperience { get; set; }
        public string? Skills { get; set; }
        public string? LinkedInUrl { get; set; }

        public string? CompanyName { get; set; }
        public string? Industry { get; set; }
        public string? CompanyDescription { get; set; }
        public string? Website { get; set; }

        public int TotalProjects { get; set; }
        public int TotalBadges { get; set; }
    }
}