using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class Mentor
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [StringLength(10)]
        public string Initials { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Expertise { get; set; } = string.Empty;

        public double Rating { get; set; } = 0;

        public bool IsVerified { get; set; } = false;

        [StringLength(500)]
        public string? Bio { get; set; }

        [StringLength(200)]
        public string? LinkedInUrl { get; set; }

        [StringLength(200)]
        public string? GitHubUrl { get; set; }

        public int YearsOfExperience { get; set; } = 0;

        public int TotalSessions { get; set; } = 0;

        // Navigation Properties
        public virtual ICollection<MentorSession> Sessions { get; set; } = new List<MentorSession>();
        public virtual ICollection<MentorMentee> Mentees { get; set; } = new List<MentorMentee>();
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
        public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
        public virtual ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
    }
}