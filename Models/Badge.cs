
namespace A3DET_CODE.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    }
}