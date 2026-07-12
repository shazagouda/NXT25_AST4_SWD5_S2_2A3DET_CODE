namespace A3DET_CODE.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Level { get; set; } = "Beginner"; // Beginner, Intermediate, Advanced, Expert
        public string Category { get; set; } = "General"; // Learning, Project, Team, Review, Report

        public int RequiredCount { get; set; } // عدد معين عشان يفتح الشارة

        public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    }
}