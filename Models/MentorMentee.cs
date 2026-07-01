using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
    public class MentorMentee
    {
        public int Id { get; set; }

        public int MentorId { get; set; }
        [ForeignKey("MentorId")]
        public virtual Mentor Mentor { get; set; } = null!;

        public string StudentId { get; set; } = string.Empty;
        [ForeignKey("StudentId")]
        public virtual ApplicationUser Student { get; set; } = null!;

        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}