using Microsoft.AspNetCore.Mvc;

namespace A3DET_CODE.Controllers
{
    public class RoadmapsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Track(string id)
        {
            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "fe", "Frontend" },
                { "be", "Backend" },
                { "ai", "AI" },
                { "ds", "DataScience" },
                { "mob", "Mobile" },
                { "dev", "DevOps" },
                { "sec", "Cybersecurity" }, // Note: We might not have cybersecurity.cshtml generated.
                { "gm", "Game" },
                { "emb", "Embedded" },
                { "qa", "testing" }
            };

            if (!string.IsNullOrEmpty(id) && map.TryGetValue(id, out var viewName))
            {
                return View(viewName);
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
