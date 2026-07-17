using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Home;
using A3DET_CODE.ViewModels.Project;

namespace A3DET_CODE.Controllers
{
    public class HomeController : Controller
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJoinRequestRepository _joinRequestRepository;
        private readonly ITrackRepository _trackRepository;

        public HomeController(
            IProjectRepository projectRepository,
            ITeamRepository teamRepository,
            UserManager<ApplicationUser> userManager,
            IJoinRequestRepository joinRequestRepository,
            ITrackRepository trackRepository)
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _userManager = userManager;
            _joinRequestRepository = joinRequestRepository;
            _trackRepository = trackRepository;
        }

        // GET: Home/Index (Landing page for guests / non-authenticated users)
        public IActionResult Index()
        {
            // If user is authenticated, redirect to Projects marketplace
            if (User.Identity?.IsAuthenticated == true)
            {
                return RedirectToAction("Projects");
            }

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

        // GET: Home/Projects (Project Marketplace for authenticated users)
        [Authorize]
        public async Task<IActionResult> Projects()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            // ✅ Get all InProgress projects (with Team, Members, and Leader loaded)
            var allInProgressProjects = await _projectRepository.GetProjectsByStatusAsync("InProgress");

            // ✅ Get available projects (with Track loaded)
            var availableProjects = await _projectRepository.GetAvailableProjectsAsync();

            // Get projects where user is the leader by matching TeamId
            var userTeams = await _teamRepository.GetTeamsByLeaderAsync(user.Id);
            var userTeamIds = userTeams.Select(t => t.Id).ToList();

            var allProjects = await _projectRepository.GetAllAsync();

            var leaderProjects = allProjects
                .Where(p => p.TeamId.HasValue && userTeamIds.Contains(p.TeamId.Value))
                .ToList();

            // Get projects where user is a member (but not leader)
            var memberTeams = await _teamRepository.GetTeamsByUserAsync(user.Id);
            var memberTeamIds = memberTeams.Where(t => t.LeaderId != user.Id).Select(t => t.Id).ToList();

            var memberProjects = allProjects
                .Where(p => p.TeamId.HasValue && memberTeamIds.Contains(p.TeamId.Value))
                .ToList();

            // ✅ Get all project IDs that the user is involved in
            var userInvolvedProjectIds = leaderProjects.Select(p => p.Id)
                                            .Concat(memberProjects.Select(p => p.Id))
                                            .Distinct()
                                            .ToList();

            // ✅ Projects that are InProgress but user is NOT involved in them
            var requestableProjects = allInProgressProjects
                .Where(p => !userInvolvedProjectIds.Contains(p.Id)
                            && p.Team != null
                            && p.Team.Members != null
                            && p.Team.Members.Count < p.Team.MaxMembers)
                .ToList();

            // Get pending join requests count
            var pendingRequests = await _joinRequestRepository.GetPendingRequestsByUserIdAsync(user.Id);

            // Build ViewModel
            var viewModel = new ProjectsHomeViewModel
            {
                UserName = user.FullName,
                UserAvatar = user.FullName?.Substring(0, 1).ToUpper() ?? "U",

                // Available projects (Open)
                AvailableProjects = availableProjects.Select(p => new ProjectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    TechStack = p.TechStack,
                    Type = p.Type,
                    Status = p.Status,
                    TrackId = p.TrackId,
                    TrackName = p.Track?.Name ?? "Unknown",
                    TrackColor = p.Track?.Color ?? "#2F6FED",
                    TeamId = p.TeamId,
                    Progress = p.Progress,
                    CreatedAt = p.CreatedAt,
                    MemberCount = 0,
                    MaxMembers = 5,
                    PendingRequestsCount = 0,
                    IsLeader = false,
                    CanRequestToJoin = false,
                    LeaderName = null,
                    ChatGroupId = null // ليس له فريق
                }).ToList(),

                // InProgress projects that user can request to join
                RequestableProjects = requestableProjects.Select(p => new ProjectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    TechStack = p.TechStack,
                    Type = p.Type,
                    Status = p.Status,
                    TrackId = p.TrackId,
                    TrackName = p.Track?.Name ?? "Unknown",
                    TrackColor = p.Track?.Color ?? "#2F6FED",
                    TeamId = p.TeamId,
                    Progress = p.Progress,
                    CreatedAt = p.CreatedAt,
                    MemberCount = p.Team?.Members?.Count ?? 0,
                    MaxMembers = p.Team?.MaxMembers ?? 5,
                    PendingRequestsCount = 0,
                    IsLeader = false,
                    CanRequestToJoin = true,
                    HasPendingJoinRequest = p.TeamId.HasValue && pendingRequests.Any(pr => pr.TeamId == p.TeamId.Value),
                    LeaderName = p.Team?.Leader?.FullName ?? "Unknown",
                    ChatGroupId = p.Team?.ChatGroupId // ✅ تمت الإضافة
                }).ToList(),

                // User's own projects (where user is leader)
                LeaderProjects = leaderProjects.Select(p => new ProjectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    TechStack = p.TechStack,
                    Type = p.Type,
                    Status = p.Status,
                    TrackId = p.TrackId,
                    TrackName = p.Track?.Name ?? "Unknown",
                    TrackColor = p.Track?.Color ?? "#2F6FED",
                    TeamId = p.TeamId,
                    Progress = p.Progress,
                    CreatedAt = p.CreatedAt,
                    MemberCount = p.Team?.Members?.Count ?? 0,
                    MaxMembers = p.Team?.MaxMembers ?? 5,
                    PendingRequestsCount = 0,
                    IsLeader = true,
                    CanRequestToJoin = false,
                    LeaderName = user.FullName,
                    ChatGroupId = p.Team?.ChatGroupId // ✅ تمت الإضافة
                }).ToList(),

                // User's own projects (where user is member)
                MemberProjects = memberProjects.Select(p => new ProjectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    TechStack = p.TechStack,
                    Type = p.Type,
                    Status = p.Status,
                    TrackId = p.TrackId,
                    TrackName = p.Track?.Name ?? "Unknown",
                    TrackColor = p.Track?.Color ?? "#2F6FED",
                    TeamId = p.TeamId,
                    Progress = p.Progress,
                    CreatedAt = p.CreatedAt,
                    MemberCount = p.Team?.Members?.Count ?? 0,
                    MaxMembers = p.Team?.MaxMembers ?? 5,
                    PendingRequestsCount = 0,
                    IsLeader = false,
                    CanRequestToJoin = false,
                    LeaderName = p.Team?.Leader?.FullName ?? "Unknown",
                    ChatGroupId = p.Team?.ChatGroupId // ✅ تمت الإضافة
                }).ToList(),

                PendingRequestsCount = pendingRequests.Count()
            };

            // Get tracks for filter dropdown
            ViewBag.Tracks = await _trackRepository.GetAllAsync();

            return View(viewModel);
        }

        // ============================================================
        // Existing actions (kept as is)
        // ============================================================
        public IActionResult Assessment() => View();
        public IActionResult Tracks() => View();
        public IActionResult Teams() => View();
        public IActionResult ProjectsPage() => View();
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