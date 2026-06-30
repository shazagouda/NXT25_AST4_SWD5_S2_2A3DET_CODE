using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.ViewModels.Home;

namespace A3DET_CODE.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var viewModel = new HomeViewModel
            {
                FeaturedTracks = new List<FeaturedTrackViewModel>
                {
                    new FeaturedTrackViewModel
                    {
                        Icon = "FE",
                        Name = "Frontend Development",
                        Description = "React, accessibility, and modern UI engineering."
                    },
                    new FeaturedTrackViewModel
                    {
                        Icon = "AI",
                        Name = "AI & Machine Learning",
                        Description = "Models, data pipelines, and applied ML systems."
                    },
                    new FeaturedTrackViewModel
                    {
                        Icon = "BE",
                        Name = "Backend Development",
                        Description = "APIs, databases, and scalable architecture."
                    },
                    new FeaturedTrackViewModel
                    {
                        Icon = "MO",
                        Name = "Mobile Development",
                        Description = "Native and cross-platform app engineering."
                    }
                },

                TopMentors = new List<MentorViewModel>
                {
                    new MentorViewModel { Initials = "AH", Name = "Ahmed Hany", Role = "Backend & Systems Design", Rating = "4.9" },
                    new MentorViewModel { Initials = "LM", Name = "Lina Mostafa", Role = "Frontend & UI Engineering", Rating = "4.8" },
                    new MentorViewModel { Initials = "KS", Name = "Karim Sami", Role = "AI & Data Science", Rating = "5.0" },
                    new MentorViewModel { Initials = "NR", Name = "Nourhan Reda", Role = "DevOps & Cloud", Rating = "4.7" }
                },

                HiringCompanies = new List<string> { "Nexora", "Brightforge", "Vertex Labs", "Quantal" },

                FeaturedProjects = new List<FeaturedProjectViewModel>
                {
                    new FeaturedProjectViewModel { Title = "Admin Dashboard Suite", Tech = "React · Node.js" },
                    new FeaturedProjectViewModel { Title = "Peer Lending Platform", Tech = "ASP.NET · SQL Server" },
                    new FeaturedProjectViewModel { Title = "Realtime Inventory App", Tech = "Flutter · Firebase" }
                },

                Stats = new PlatformStatsViewModel()
            };

            return View(viewModel);
        }

        public IActionResult Assessment() => View();
        public IActionResult Tracks() => View();
        public IActionResult Teams() => View();
        public IActionResult Projects() => View();
        public IActionResult Portfolio() => View();
        public IActionResult Profile() => View();
        public IActionResult Notifications() => View();
        public IActionResult Roadmaps() => View();
        public IActionResult Mentors() => View();
        public IActionResult Companies() => View();
        public IActionResult About() => View();
        public IActionResult ContactUs() => View();
        public IActionResult Login() => View();
        public IActionResult SignUp() => View();
        public IActionResult Logout() => RedirectToAction("Index");
    }
}