
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace A3DET_CODE.Controllers
{
    public class ContactUsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(ContactFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            TempData["Success"] = "Your message has been sent successfully! We'll get back to you soon.";
            return RedirectToAction("Index");
        }
    }

    public class ContactFormModel
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100, MinimumLength = 2)]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Subject is required")]
        [StringLength(100)]
        public string Subject { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required")]
        [StringLength(1000, MinimumLength = 10)]
        public string Message { get; set; } = string.Empty;
    }
}