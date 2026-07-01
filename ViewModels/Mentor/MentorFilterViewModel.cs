namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorFilterViewModel
    {
        public string? SearchTerm { get; set; }
        public string? Expertise { get; set; }
        public string? SortBy { get; set; }
        public int? MinRating { get; set; }
        public bool? OnlyVerified { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 12;

        public List<string> AvailableExpertise { get; set; } = new()
        {
            "Frontend Development",
            "Backend Development",
            "AI & Machine Learning",
            "Data Science",
            "Mobile Development",
            "DevOps",
            "Cybersecurity",
            "Game Development",
            "Embedded Systems",
            "Software Testing",
            "Full-Stack Development",
            "Cloud Architecture",
            "System Design"
        };

        public List<string> SortOptions { get; set; } = new()
        {
            "rating",
            "sessions",
            "experience",
            "newest"
        };

        public Dictionary<string, string> SortLabels { get; set; } = new()
        {
            { "rating", "Highest Rated" },
            { "sessions", "Most Sessions" },
            { "experience", "Most Experienced" },
            { "newest", "Newest" }
        };
    }
}