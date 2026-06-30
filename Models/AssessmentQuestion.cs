
namespace A3DET_CODE.Models
{
    public class AssessmentQuestion
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public string OptionA { get; set; } = string.Empty;
        public string OptionB { get; set; } = string.Empty;
        public string OptionC { get; set; } = string.Empty;
        public string OptionD { get; set; } = string.Empty;
        public int CorrectOption { get; set; }
        public int TrackId { get; set; }
        public Track Track { get; set; } = null!;
    }
}