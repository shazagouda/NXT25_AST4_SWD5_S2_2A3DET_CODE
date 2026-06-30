
namespace A3DET_CODE.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Skills { get; set; } = string.Empty;
        public string Roadmap { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;

        public ICollection<AssessmentQuestion> AssessmentQuestions { get; set; } = new List<AssessmentQuestion>();
        public ICollection<AssessmentResult> AssessmentResults { get; set; } = new List<AssessmentResult>();
        public ICollection<Team> Teams { get; set; } = new List<Team>();
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}