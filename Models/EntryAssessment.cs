using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace A3DET_CODE.Models
{
	public class EntryAssessment
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string UserId { get; set; } = string.Empty;

		public int Score { get; set; }

		public int PassingScore { get; set; } = 70;

		public bool IsPassed => Score >= PassingScore;

		public int TotalQuestions { get; set; } = 20;

		public int CorrectAnswers { get; set; }

		public DateTime CompletedAt { get; set; }

		// Navigation Properties
		[ForeignKey(nameof(UserId))]
		public virtual ApplicationUser User { get; set; } = null!;
	}
}