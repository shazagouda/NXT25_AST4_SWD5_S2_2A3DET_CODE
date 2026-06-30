namespace A3DET_CODE.ViewModels.Home
{
    public class HomeViewModel
    {
        public string Title { get; set; } = "Find your track. Build it with a team. Get hired for it.";
        public string Description { get; set; } = "A3DET CODE turns theoretical learners into job-ready professionals — through a guided assessment, real team-based projects, and a portfolio companies actually hire from.";
        public int TotalTracks { get; set; } = 10;
        public int TotalQuestions { get; set; } = 50;
        public int TotalStages { get; set; } = 3;
        public List<FeaturedTrackViewModel> FeaturedTracks { get; set; } = new();
        public List<MentorViewModel> TopMentors { get; set; } = new();
        public List<string> HiringCompanies { get; set; } = new();
        public List<FeaturedProjectViewModel> FeaturedProjects { get; set; } = new();
        public PlatformStatsViewModel Stats { get; set; } = new();
    }

    public class FeaturedTrackViewModel
    {
        public string Icon { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class MentorViewModel
    {
        public string Initials { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Rating { get; set; } = string.Empty;
    }

    public class FeaturedProjectViewModel
    {
        public string Title { get; set; } = string.Empty;
        public string Tech { get; set; } = string.Empty;
    }

    public class PlatformStatsViewModel
    {
        public int Learners { get; set; } = 12400;
        public int Projects { get; set; } = 860;
        public int Companies { get; set; } = 140;
        public int Accuracy { get; set; } = 96;
    }
}