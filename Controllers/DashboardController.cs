using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Dashboard;
using A3DET_CODE.ViewModels.Team;
using A3DET_CODE.Repositories.Interfaces;
using Task = A3DET_CODE.Models.Task;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ITeamRepository _teamRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ITaskRepository _taskRepository;
        private readonly ISubmissionRepository _submissionRepository;

        public DashboardController(UserManager<ApplicationUser> userManager,
           ApplicationDbContext context,
            ITeamRepository teamRepository,
            IProjectRepository projectRepository,
            ITaskRepository taskRepository,
            ISubmissionRepository submissionRepository)
        {
            _userManager = userManager;
            _context = context;
            _teamRepository = teamRepository;
            _projectRepository = projectRepository;
            _taskRepository = taskRepository;
            _submissionRepository = submissionRepository;
        }

        // Add this to your existing DashboardController

        [HttpGet]
        public async Task<IActionResult> TeamDashboard(int teamId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            // Get the team with all details
            var team = await _teamRepository.GetTeamWithDetailsAsync(teamId);
            if (team == null)
                return NotFound();

            // Check if user is a member of this team
            var isMember = team.Members?.Any(m => m.UserId == user.Id) ?? false;
            if (!isMember)
            {
                TempData["Error"] = "You are not a member of this team.";
                return RedirectToAction("Index", "Teams");
            }

            var isLeader = team.LeaderId == user.Id;

            // Get project details if assigned
            Project? project = null;
            if (team.ProjectId.HasValue)
            {
                project = await _projectRepository.GetProjectWithDetailsAsync(team.ProjectId.Value);
            }

            // Get tasks for the team's project
            var tasks = new List<Task>();
            if (project != null)
            {
                tasks = (await _taskRepository.GetTasksByProjectAsync(project.Id)).ToList();
            }

            // Get submissions for the project
            var submissions = new List<Submission>();
            if (project != null)
            {
                submissions = (await _submissionRepository.GetSubmissionsByProjectAsync(project.Id)).ToList();
            }

            // Calculate task stats
            var totalTasks = tasks.Count;
            var completedTasks = tasks.Count(t => t.Status == "Completed");
            var inProgressTasks = tasks.Count(t => t.Status == "InProgress");
            var pendingTasks = tasks.Count(t => t.Status == "Pending");
            var taskCompletionRate = totalTasks > 0 ? Math.Round((double)completedTasks / totalTasks * 100, 2) : 0;

            // Calculate submission stats
            var totalSubmissions = submissions.Count;
            var pendingSubmissions = submissions.Count(s => s.Status == "Pending");
            var averageScore = submissions.Any(s => s.Score.HasValue)
                ? Math.Round(submissions.Where(s => s.Score.HasValue).Average(s => s.Score.Value), 2)
                : 0;

            // Build recent activities
            var activities = new List<TeamActivity>();

            // Member joined activities
            foreach (var member in team.Members ?? new List<TeamMember>())
            {
                activities.Add(new TeamActivity
                {
                    Type = "member_joined",
                    Message = $"{member.User?.FullName ?? "Unknown"} joined the team",
                    UserName = member.User?.FullName ?? "Unknown",
                    UserInitials = member.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    Timestamp = member.JoinedAt,
                    Icon = "fa-solid fa-user-plus",
                    IconColor = "green"
                });
            }

            // Task completed activities
            foreach (var task in tasks.Where(t => t.Status == "Completed"))
            {
                activities.Add(new TeamActivity
                {
                    Type = "task_completed",
                    Message = $"Task '{task.Title}' was completed by {task.AssignedTo?.FullName ?? "Unknown"}",
                    UserName = task.AssignedTo?.FullName ?? "Unknown",
                    UserInitials = task.AssignedTo?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    Timestamp = task.CompletedAt ?? DateTime.Now,
                    Icon = "fa-solid fa-check-circle",
                    IconColor = "blue"
                });
            }

            // Project created activity
            if (project != null)
            {
                activities.Add(new TeamActivity
                {
                    Type = "project_created",
                    Message = $"Project '{project.Title}' was created",
                    UserName = team.Leader?.FullName ?? "Unknown",
                    UserInitials = team.Leader?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    Timestamp = project.CreatedAt,
                    Icon = "fa-solid fa-code",
                    IconColor = "amber"
                });
            }

            // Submission activities
            foreach (var submission in submissions)
            {
                activities.Add(new TeamActivity
                {
                    Type = "submission_submitted",
                    Message = $"{submission.User?.FullName ?? "Unknown"} submitted '{submission.Title}'",
                    UserName = submission.User?.FullName ?? "Unknown",
                    UserInitials = submission.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    Timestamp = submission.SubmittedAt,
                    Icon = "fa-solid fa-file-upload",
                    IconColor = "purple"
                });
            }

            // Sort activities by timestamp (most recent first) and take top 10
            activities = activities.OrderByDescending(a => a.Timestamp).Take(10).ToList();

            // Get upcoming tasks (not completed, sorted by due date)
            var upcomingTasks = tasks
                .Where(t => t.Status != "Completed")
                .Select(t => new UpcomingTask  // ✅ Uses existing UpcomingTask
                {
                    Title = t.Title,
                    DueDate = t.DueDate ?? DateTime.Now.AddDays(7),
                    Priority = t.Priority
                })
                .OrderBy(t => t.DueDate)
                .Take(5)
                .ToList();

            // Build ViewModel
            var viewModel = new TeamDashboardViewModel
            {
                TeamId = team.Id,
                TeamName = team.Name,
                TeamDescription = team.Description,
                TrackName = team.Track?.Name ?? "Unknown",
                TrackColor = team.Track?.Color ?? "#2F6FED",
                Status = team.Status,
                MaxMembers = team.MaxMembers,
                CurrentMembers = team.Members?.Count ?? 0,
                IsLeader = isLeader,

                ProjectId = project?.Id,
                ProjectTitle = project?.Title,
                ProjectProgress = project?.Progress ?? 0,
                ProjectStatus = project?.Status,

                Members = team.Members?.Select(m => new TeamMemberViewModel
                {
                    UserId = m.UserId,
                    FullName = m.User?.FullName ?? "Unknown",
                    Initials = m.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    Role = m.Role,
                    JoinedAt = m.JoinedAt
                }).ToList() ?? new(),

                TotalTasks = totalTasks,
                CompletedTasks = completedTasks,
                InProgressTasks = inProgressTasks,
                PendingTasks = pendingTasks,
                TaskCompletionRate = taskCompletionRate,

                TotalSubmissions = totalSubmissions,
                PendingSubmissions = pendingSubmissions,
                AverageScore = averageScore,

                RecentActivities = activities,
                UpcomingTasks = upcomingTasks
            };

            return View(viewModel);
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