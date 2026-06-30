namespace A3DET_CODE.Models
{
    public class AssessmentResult
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int TrackId { get; set; }
        public double Score { get; set; }
        public DateTime CompletedAt { get; set; }

        public ApplicationUser User { get; set; } = null!;
        public Track Track { get; set; } = null!;
    }
}