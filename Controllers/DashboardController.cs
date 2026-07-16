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

            if (role == "Admin")
                return RedirectToAction("Dashboard", "Admin");
            else if (role == "Student")
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

            var userTeams = await _context.TeamMembers
                .Where(m => m.UserId == user.Id)
                .Select(m => m.TeamId)
                .ToListAsync();

            var projects = await _context.Projects
                .Where(p => p.TeamId.HasValue && userTeams.Contains(p.TeamId.Value))
                .ToListAsync();

            var totalProjects = projects.Count;
            var completedProjects = projects.Count(p => p.Status == "Completed");
            var inProgressProjects = projects.Count(p => p.Status == "InProgress");
            var completionRate = totalProjects > 0 ? (double)completedProjects / totalProjects * 100 : 0;

            var tasks = await _context.Tasks
                .Where(t => t.AssignedToId == user.Id)
                .ToListAsync();
            var upcomingTasks = tasks
                .Where(t => t.Status != "Completed")
                .OrderBy(t => t.DueDate)
                .Take(5)
                .Select(t => new UpcomingTask
                {
                    Title = t.Title,
                    DueDate = t.DueDate ?? DateTime.Now.AddDays(7),
                    Priority = t.Priority
                }).ToList();

            var badgesCount = await _context.UserBadges.CountAsync(ub => ub.UserId == user.Id);
            
            var trackName = user.Faculty ?? "Development Track";

            // Top recommended projects (just some random or latest projects)
            var recommendedProjects = await _context.Projects
                .Where(p => !p.TeamId.HasValue && p.Status == "Open")
                .OrderByDescending(p => p.CreatedAt)
                .Take(2)
                .Select(p => new RecommendedProject
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    TechStack = p.TechStack,
                    MatchScore = 90
                }).ToListAsync();

            var viewModel = new StudentDashboardViewModel
            {
                UserName = user.FullName,
                UserRole = "Student",
                UserAvatar = user.FullName?.Substring(0, 1).ToUpper() ?? "U",
                ProfileImageUrl = user.ProfileImageUrl,
                LastLogin = user.LastLoginAt ?? DateTime.Now,

                TotalProjects = totalProjects,
                CompletedProjects = completedProjects,
                InProgressProjects = inProgressProjects,
                TotalTeams = userTeams.Count,
                TotalBadges = badgesCount,
                TotalPoints = 0, // Points property missing in DB, using 0
                CompletionRate = completionRate,
                CurrentTrack = trackName,
                TrackProgress = 0, // Hard to calculate without user progress tracking

                RecentActivities = new List<RecentActivity>(), // Can be filled if you have an activity log table

                UpcomingTasks = upcomingTasks,
                RecommendedProjects = recommendedProjects
            };

            return View("StudentDashboard", viewModel);
        }

        // GET: Company Dashboard
        public async Task<IActionResult> CompanyDashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var bookings = await _context.Bookings.Where(b => b.BookerUserId == user.Id).ToListAsync();
            var contracts = await _context.Contracts.Where(c => c.PartyAUserId == user.Id).ToListAsync();

            var recentBookings = bookings.OrderByDescending(b => b.CreatedAt).Take(5).Select(b => new BookingSummary
            {
                Id = b.Id,
                TargetName = b.Topic ?? b.TargetType,
                TargetType = b.TargetType,
                TotalPrice = b.TotalPrice,
                ScheduledAt = b.ScheduledAt,
                Status = b.PaymentStatus
            }).ToList();

            var topMentors = await _context.Mentors
                .Include(m => m.User)
                .OrderByDescending(m => m.Rating)
                .Take(2)
                .Select(m => new CandidateSummary
                {
                    Name = m.FullName,
                    Track = m.Expertise,
                    MatchScore = (int)((m.Rating / 5.0) * 100),
                    ProjectsCount = m.TotalSessions // Using sessions instead of projects as proxy
                }).ToListAsync();

            var viewModel = new CompanyDashboardViewModel
            {
                UserName = user.FullName,
                UserRole = "Company",
                UserAvatar = user.FullName?.Substring(0, 1).ToUpper() ?? "U",
                ProfileImageUrl = user.ProfileImageUrl,
                LastLogin = user.LastLoginAt ?? DateTime.Now,

                TotalBookings = bookings.Count,
                ActiveContracts = contracts.Count(c => c.Status == "Active"),
                PendingBookings = bookings.Count(b => b.Status == "PendingPayment" || b.Status == "PendingApproval"),
                CompletedContracts = contracts.Count(c => c.Status == "Completed"),
                TotalSpent = bookings.Where(b => b.PaymentStatus == "Paid").Sum(b => b.TotalPrice),

                RecentBookings = recentBookings,
                TopCandidates = topMentors
            };

            return View("CompanyDashboard", viewModel);
        }
    }
}
