using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorInviteViewModel
    {
        [Required(ErrorMessage = "Student email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email")]
        [Display(Name = "Student Email")]
        public string StudentEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required")]
        [StringLength(500, ErrorMessage = "Message cannot exceed 500 characters")]
        [Display(Name = "Message")]
        public string Message { get; set; } = string.Empty;

        [Display(Name = "Send Email")]
        public bool SendEmail { get; set; } = true;

        public int MentorId { get; set; }
        public string MentorName { get; set; } = string.Empty;
    }
}