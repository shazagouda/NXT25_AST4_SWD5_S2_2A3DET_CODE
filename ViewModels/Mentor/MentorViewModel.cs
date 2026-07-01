using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;

        [Display(Name = "Initials")]
        public string Initials { get; set; } = string.Empty;

        [Display(Name = "Expertise")]
        public string Expertise { get; set; } = string.Empty;

        [Display(Name = "Rating")]
        public double Rating { get; set; }

        [Display(Name = "Verified")]
        public bool IsVerified { get; set; }

        [Display(Name = "Bio")]
        public string? Bio { get; set; }

        [Display(Name = "Years of Experience")]
        public int YearsOfExperience { get; set; }

        [Display(Name = "Total Sessions")]
        public int TotalSessions { get; set; }

        [Display(Name = "Skills")]
        public string Skills { get; set; } = string.Empty;

        public string RatingStars => new string('★', (int)Math.Floor(Rating));
        public string RatingHalf => Rating % 1 >= 0.5 ? "★" : "";
        public string RatingDisplay => $"{Rating:F1}";
    }
}