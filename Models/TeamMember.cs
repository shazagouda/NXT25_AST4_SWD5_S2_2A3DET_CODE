namespace A3DET_CODE.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Role { get; set; } = "Member";

        public Team Team { get; set; } = null!;
        public ApplicationUser User { get; set; } = null!;
    }
}