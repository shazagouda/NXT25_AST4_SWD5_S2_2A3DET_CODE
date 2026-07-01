namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorReviewViewModel
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string? StudentAvatar { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SessionId { get; set; }
        public string? SessionTopic { get; set; }

        // Display
        public string RatingStars => new string('★', Rating);
        public string CreatedDisplay => CreatedAt.ToString("MMM dd, yyyy");
        public string TimeAgo
        {
            get
            {
                var diff = DateTime.UtcNow - CreatedAt;
                if (diff.TotalMinutes < 1) return "Just now";
                if (diff.TotalMinutes < 60) return $"{(int)diff.TotalMinutes}m ago";
                if (diff.TotalHours < 24) return $"{(int)diff.TotalHours}h ago";
                if (diff.TotalDays < 30) return $"{(int)diff.TotalDays}d ago";
                return CreatedDisplay;
            }
        }
    }
}