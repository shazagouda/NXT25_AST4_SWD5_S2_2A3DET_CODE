// Models/ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace A3DET_CODE.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
        public string? Role { get; set; }

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

        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;


        public ICollection<TeamMember> TeamMemberships { get; set; } = new List<TeamMember>();
        public ICollection<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
        public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
        public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
        public ICollection<AssessmentResult> AssessmentResults { get; set; } = new List<AssessmentResult>();
        public ICollection<Application> Applications { get; set; } = new List<Application>();
        public ICollection<Hiring> CompanyHirings { get; set; } = new List<Hiring>();
        public ICollection<Hiring> StudentHirings { get; set; } = new List<Hiring>();
        public virtual ICollection<MentorMentee> MentorRelationships { get; set; } = new List<MentorMentee>();
    }
}