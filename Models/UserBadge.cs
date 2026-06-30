
namespace A3DET_CODE.Models
{
    public class UserBadge
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int BadgeId { get; set; }
        public DateTime EarnedAt { get; set; }

        public ApplicationUser User { get; set; } = null!;
        public Badge Badge { get; set; } = null!;
    }
}