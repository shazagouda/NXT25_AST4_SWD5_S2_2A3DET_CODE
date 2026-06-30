
namespace A3DET_CODE.Models
{
    public class Evaluation
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public int Score { get; set; }
        public string? Feedback { get; set; }
        public DateTime EvaluatedAt { get; set; }

        public ApplicationUser User { get; set; } = null!;
        public Project Project { get; set; } = null!;
    }
}