using Microsoft.AspNetCore.Mvc;

namespace A3DET_CODE.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}