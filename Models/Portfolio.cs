
namespace A3DET_CODE.Models
{
    public class Portfolio
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? Skills { get; set; }
        public string? GitHubUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public int ProfileStrength { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ApplicationUser User { get; set; } = null!;
        public ICollection<PortfolioProject> Projects { get; set; } = new List<PortfolioProject>();
        public ICollection<UserBadge> Badges { get; set; } = new List<UserBadge>();
    }
}