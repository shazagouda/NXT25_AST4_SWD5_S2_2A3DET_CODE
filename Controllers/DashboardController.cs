using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Dashboard;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public DashboardController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: Dashboard
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            if (role == "Student")
                return RedirectToAction("StudentDashboard");
            else if (role == "Mentor")
                return RedirectToAction("Dashboard", "Mentor");
            else if (role == "Company")
                return RedirectToAction("CompanyDashboard");

            return RedirectToAction("Index", "Home");
        }

        // GET: Student Dashboard
        public async Task<IActionResult> StudentDashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var viewModel = new StudentDashboardViewModel
            {
                UserName = user.FullName,
                UserRole = "Student",
                UserAvatar = user.FullName?.Substring(0, 1).ToUpper() ?? "U",
                LastLogin = user.LastLoginAt ?? DateTime.Now,

                TotalProjects = 5,
                CompletedProjects = 2,
                InProgressProjects = 3,
                TotalTeams = 2,
                TotalBadges = 3,
                TotalPoints = 1250,
                CompletionRate = 40,
                CurrentTrack = "Frontend Development",
                TrackProgress = 72,

                RecentActivities = new List<RecentActivity>
                {
                    new RecentActivity { Title = "Completed Project", Description = "Admin Dashboard Suite", Date = DateTime.Now.AddDays(-2), Icon = "✅", Color = "green" },
                    new RecentActivity { Title = "Joined Team", Description = "Team Alpha", Date = DateTime.Now.AddDays(-5), Icon = "🤝", Color = "blue" },
                    new RecentActivity { Title = "Earned Badge", Description = "Rising Developer", Date = DateTime.Now.AddDays(-7), Icon = "🏅", Color = "amber" }
                },

                UpcomingTasks = new List<UpcomingTask>
                {
                    new UpcomingTask { Title = "Submit Peer Lending Project", DueDate = DateTime.Now.AddDays(3), Priority = "High" },
                    new UpcomingTask { Title = "Team Meeting", DueDate = DateTime.Now.AddDays(5), Priority = "Medium" }
                },

                RecommendedProjects = new List<RecommendedProject>
                {
                    new RecommendedProject { Id = 1, Title = "E-Commerce Platform", Description = "Full-stack e-commerce with payment integration", TechStack = "React, .NET, SQL", MatchScore = 92 },
                    new RecommendedProject { Id = 2, Title = "AI Chatbot", Description = "Build a customer service chatbot", TechStack = "Python, TensorFlow", MatchScore = 78 }
                }
            };

            return View("StudentDashboard", viewModel);
        }

        // GET: Company Dashboard
        public async Task<IActionResult> CompanyDashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var viewModel = new CompanyDashboardViewModel
            {
                UserName = user.FullName,
                UserRole = "Company",
                UserAvatar = user.FullName?.Substring(0, 1).ToUpper() ?? "U",
                LastLogin = user.LastLoginAt ?? DateTime.Now,

                TotalJobPosts = 12,
                ActiveJobPosts = 8,
                TotalApplications = 156,
                ShortlistedCandidates = 24,
                HiredCandidates = 6,

                RecentJobPosts = new List<JobPostSummary>
                {
                    new JobPostSummary { Id = 1, Title = "Senior Frontend Developer", Type = "Full-time", ApplicationsCount = 45, PostedAt = DateTime.Now.AddDays(-3), Status = "Active" },
                    new JobPostSummary { Id = 2, Title = "DevOps Engineer", Type = "Contract", ApplicationsCount = 28, PostedAt = DateTime.Now.AddDays(-7), Status = "Active" }
                },

                TopCandidates = new List<CandidateSummary>
                {
                    new CandidateSummary { Name = "Ahmed Hany", Track = "Backend", MatchScore = 95, ProjectsCount = 8 },
                    new CandidateSummary { Name = "Lina Mostafa", Track = "Frontend", MatchScore = 92, ProjectsCount = 6 }
                }
            };

            return View("CompanyDashboard", viewModel);
        }
    }
}