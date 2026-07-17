using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Project;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using A3DET_CODE.Services;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ProjectsController : Controller
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IJoinRequestRepository _joinRequestRepository;
        private readonly IApplicationRepository _applicationRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<ProjectsController> _logger;
        private readonly ITrackRepository _trackRepository;
        private readonly IChatService _chatService;

        public ProjectsController(
            IProjectRepository projectRepository,
            ITeamRepository teamRepository,
            ITeamMemberRepository teamMemberRepository,
            IJoinRequestRepository joinRequestRepository,
            IApplicationRepository applicationRepository,
            UserManager<ApplicationUser> userManager,
            ILogger<ProjectsController> logger,
            ITrackRepository trackRepository,
            IChatService chatService)
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _joinRequestRepository = joinRequestRepository;
            _applicationRepository = applicationRepository;
            _userManager = userManager;
            _logger = logger;
            _trackRepository = trackRepository;
            _chatService = chatService;
        }

        // ============================================================
        // NEW: Take Project (User becomes leader, team auto-created)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TakeProject(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithDetailsAsync(id);
            if (project == null)
                return NotFound();

            if (project.Status != "Open" || project.TeamId.HasValue)
            {
                TempData["Error"] = "This project is no longer available.";
                return RedirectToAction("Projects", "Home");
            }

            var team = new Team
            {
                Name = $"Team for {project.Title}",
                Description = $"Team working on {project.Title}",
                LeaderId = user.Id,
                TrackId = project.TrackId,
                MaxMembers = 5,
                Status = "Open",
                CurrentMembers = 1,
                CreatedAt = DateTime.UtcNow
            };

            await _teamRepository.AddAsync(team);
            await _teamRepository.SaveChangesAsync();

            var teamMember = new TeamMember
            {
                TeamId = team.Id,
                UserId = user.Id,
                Role = "Leader",
                JoinedAt = DateTime.UtcNow
            };

            await _teamMemberRepository.AddAsync(teamMember);
            await _teamMemberRepository.SaveChangesAsync();

            project.TeamId = team.Id;
            project.Status = "InProgress";
            project.StartedAt = DateTime.UtcNow;

            await _projectRepository.UpdateAsync(project);
            await _projectRepository.SaveChangesAsync();

            // ✅ إنشاء مجموعة الدردشة الخاصة بالفريق
            var chatGroup = await _chatService.CreateTeamChatAsync(team.Id, team.Name);
            await _chatService.AddUserToGroupAsync(chatGroup.Id, user.Id);
            team.ChatGroupId = chatGroup.Id;
            await _teamRepository.UpdateAsync(team);
            await _teamRepository.SaveChangesAsync();

            TempData["Success"] = $"You are now the leader of '{project.Title}'!";
            return RedirectToAction("Details", "Projects", new { id = project.Id });
        }

        // ============================================================
        // NEW: Request to Join a Project
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RequestToJoin(int id, string? returnUrl = null)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithDetailsAsync(id);
            if (project == null)
                return NotFound();

            if (!project.TeamId.HasValue)
            {
                TempData["Error"] = "This project doesn't have a team yet. Take the project instead!";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("Projects", "Home");
            }

            var team = project.Team;
            if (team == null)
            {
                TempData["Error"] = "Team not found.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("Projects", "Home");
            }

            if (team.CurrentMembers >= team.MaxMembers)
            {
                TempData["Error"] = "This team is full!";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("Projects", "Home");
            }

            var isMember = await _teamMemberRepository.ExistsAsync(team.Id, user.Id);
            if (isMember)
            {
                TempData["Error"] = "You are already a member of this team.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("Details", "Projects", new { id });
            }

            var hasPending = await _joinRequestRepository.HasPendingRequestAsync(team.Id, user.Id);
            if (hasPending)
            {
                TempData["Error"] = "You already have a pending request to join this team.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("Projects", "Home");
            }

            var joinRequest = new JoinRequest
            {
                TeamId = team.Id,
                UserId = user.Id,
                Status = "Pending",
                RequestedAt = DateTime.UtcNow
            };

            await _joinRequestRepository.AddAsync(joinRequest);
            await _joinRequestRepository.SaveChangesAsync();

            TempData["Success"] = $"Request to join '{project.Title}' sent successfully! Wait for the leader to approve.";
            if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
            return RedirectToAction("Projects", "Home");
        }

        // ============================================================
        // Existing Actions (keep as is)
        // ============================================================

        // GET: Projects
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var projects = await _projectRepository.GetAvailableProjectsAsync();

            var viewModels = projects.Select(p => new ProjectViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                TechStack = p.TechStack,
                Type = p.Type,
                Status = p.Status,
                TrackId = p.TrackId,
                TrackName = p.Track?.Name ?? "Unknown",
                TeamId = p.TeamId,
                TeamName = p.Team?.Name,
                ClientId = p.ClientId,
                ClientName = p.Client?.FullName,
                RepositoryUrl = p.RepositoryUrl,
                DemoUrl = p.DemoUrl,
                Progress = p.Progress,
                CreatedAt = p.CreatedAt,
                StartedAt = p.StartedAt,
                CompletedAt = p.CompletedAt,
                Deadline = p.Deadline,
                Price = p.Price,
                TotalTasks = p.Tasks?.Count ?? 0,
                CompletedTasks = p.Tasks?.Count(t => t.Status == "Completed") ?? 0,
                PendingTasks = p.Tasks?.Count(t => t.Status != "Completed") ?? 0,
                TotalSubmissions = p.Submissions?.Count ?? 0,
                AverageScore = p.Submissions != null && p.Submissions.Any()
                    ? Math.Round(p.Submissions.Average(s => s.Score ?? 0), 2)
                    : 0
            }).ToList();

            return View(viewModels);
        }

        // GET: Projects/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithDetailsAsync(id);
            if (project == null)
                return NotFound();

            bool isLeader = false;
            bool isMember = false;
            IEnumerable<JoinRequest> pendingRequests = new List<JoinRequest>();

            if (project.Team != null)
            {
                isLeader = project.Team.LeaderId == user.Id;
                isMember = await _teamMemberRepository.ExistsAsync(project.Team.Id, user.Id);

                if (isLeader)
                {
                    pendingRequests = await _joinRequestRepository.GetPendingRequestsByTeamIdAsync(project.Team.Id);
                }
            }

            bool hasPendingRequest = false;
            if (project.Team != null && !isLeader && !isMember)
            {
                hasPendingRequest = await _joinRequestRepository.HasPendingRequestAsync(project.Team.Id, user.Id);
            }

            var viewModel = new ProjectViewModel
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                TechStack = project.TechStack,
                Type = project.Type,
                Status = project.Status,
                TrackId = project.TrackId,
                TrackName = project.Track?.Name ?? "Unknown",
                TeamId = project.TeamId,
                TeamName = project.Team?.Name,
                ClientId = project.ClientId,
                ClientName = project.Client?.FullName,
                RepositoryUrl = project.RepositoryUrl,
                DemoUrl = project.DemoUrl,
                Progress = project.Progress,
                CreatedAt = project.CreatedAt,
                StartedAt = project.StartedAt,
                CompletedAt = project.CompletedAt,
                Deadline = project.Deadline,
                Price = project.Price,
                TotalTasks = project.Tasks?.Count ?? 0,
                CompletedTasks = project.Tasks?.Count(t => t.Status == "Completed") ?? 0,
                PendingTasks = project.Tasks?.Count(t => t.Status != "Completed") ?? 0,
                TotalSubmissions = project.Submissions?.Count ?? 0,
                AverageScore = project.Submissions != null && project.Submissions.Any()
                    ? Math.Round(project.Submissions.Average(s => s.Score ?? 0), 2)
                    : 0,
                IsLeader = isLeader,
                IsMember = isMember,
                TeamMembers = project.Team?.Members?.Select(m => new TeamMemberInfo
                {
                    Id = m.UserId,
                    Name = m.User?.FullName ?? "Unknown",
                    Initials = m.User?.FullName?.Substring(0, 1).ToUpper() ?? "U",
                    Role = m.Role
                }).ToList() ?? new List<TeamMemberInfo>(),
                HasPendingJoinRequest = hasPendingRequest,
                PendingJoinRequests = pendingRequests.Select(r => new A3DET_CODE.ViewModels.Team.JoinRequestViewModel
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    UserName = r.User?.FullName ?? "Unknown",
                    UserInitials = r.User?.FullName?.Substring(0, 1).ToUpper() ?? "U",
                    RequestedAt = r.RequestedAt,
                    Status = r.Status
                }).ToList(),
                ChatGroupId = project.Team?.ChatGroupId // ✅ تم الإضافة
            };

            return View(viewModel);
        }

        // GET: Projects/Create
        public async Task<IActionResult> Create()
        {
            var tracks = await _trackRepository.GetAllAsync();
            ViewBag.Tracks = tracks;
            return View();
        }

        // POST: Projects/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProjectViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return View(model);

                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                    return RedirectToAction("Login", "Account");

                var project = new Project
                {
                    Title = model.Title,
                    Description = model.Description,
                    TechStack = model.TechStack,
                    Type = model.Type,
                    Status = "InProgress",
                    TrackId = model.TrackId,
                    Price = model.Price,
                    Progress = 0,
                    CreatedAt = DateTime.UtcNow,
                    StartedAt = DateTime.UtcNow
                };

                await _projectRepository.AddAsync(project);
                await _projectRepository.SaveChangesAsync();

                var team = new Team
                {
                    Name = $"Team for {project.Title}",
                    Description = $"Team working on {project.Title}",
                    LeaderId = user.Id,
                    TrackId = project.TrackId,
                    MaxMembers = 5,
                    Status = "InProgress",
                    CurrentMembers = 1,
                    ProjectId = project.Id,
                    CreatedAt = DateTime.UtcNow,
                    StartedAt = DateTime.UtcNow
                };

                await _teamRepository.AddAsync(team);
                await _teamRepository.SaveChangesAsync();

                var teamMember = new TeamMember
                {
                    TeamId = team.Id,
                    UserId = user.Id,
                    Role = "Leader",
                    JoinedAt = DateTime.UtcNow
                };

                await _teamMemberRepository.AddAsync(teamMember);
                await _teamMemberRepository.SaveChangesAsync();

                project.TeamId = team.Id;
                await _projectRepository.UpdateAsync(project);
                await _projectRepository.SaveChangesAsync();

                // ✅ إنشاء مجموعة الدردشة الخاصة بالفريق
                var chatGroup = await _chatService.CreateTeamChatAsync(team.Id, team.Name);
                await _chatService.AddUserToGroupAsync(chatGroup.Id, user.Id);
                team.ChatGroupId = chatGroup.Id;
                await _teamRepository.UpdateAsync(team);
                await _teamRepository.SaveChangesAsync();

                TempData["Success"] = "Project created successfully! You are now the team leader.";
                return RedirectToAction("Projects", "Home");
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException?.Message ?? ex.Message;
                TempData["Error"] = $"Database error: {innerException}";

                var tracks = await _trackRepository.GetAllAsync();
                ViewBag.Tracks = tracks;
                return View(model);
            }
            catch (Exception ex)
            {
                TempData["Error"] = $"Error: {ex.Message}";

                var tracks = await _trackRepository.GetAllAsync();
                ViewBag.Tracks = tracks;
                return View(model);
            }
        }

        // GET: Projects/AssignTeam/5
        public async Task<IActionResult> AssignTeam(int teamId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithDetailsAsync(teamId);
            if (team == null)
                return NotFound();

            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can assign projects.";
                return RedirectToAction("Details", "Teams", new { id = teamId });
            }

            if (team.ProjectId.HasValue)
            {
                TempData["Error"] = "This team already has an assigned project.";
                return RedirectToAction("Details", "Teams", new { id = teamId });
            }

            var availableProjects = await _projectRepository.GetAvailableProjectsAsync();

            var viewModel = new AssignProjectViewModel
            {
                TeamId = teamId,
                TeamName = team.Name,
                AvailableProjects = availableProjects.Select(p => new ProjectSelectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    TrackName = p.Track?.Name ?? "Unknown",
                    Status = p.Status
                }).ToList()
            };

            return View(viewModel);
        }

        // POST: Projects/AssignTeam
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AssignTeam(AssignProjectViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var teamFromDb = await _teamRepository.GetByIdAsync(model.TeamId);
                var availableProjects = await _projectRepository.GetAvailableProjectsAsync();

                model.TeamName = teamFromDb?.Name ?? "Unknown";
                model.AvailableProjects = availableProjects.Select(p => new ProjectSelectViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    TrackName = p.Track?.Name ?? "Unknown",
                    Status = p.Status
                }).ToList();

                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithDetailsAsync(model.TeamId);
            if (team == null)
                return NotFound();

            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can assign projects.";
                return RedirectToAction("Details", "Teams", new { id = model.TeamId });
            }

            var project = await _projectRepository.GetByIdAsync(model.ProjectId);
            if (project == null)
                return NotFound();

            if (project.TeamId.HasValue)
            {
                TempData["Error"] = "This project is already assigned to another team.";
                return RedirectToAction("Details", "Teams", new { id = model.TeamId });
            }

            project.TeamId = team.Id;
            project.Status = "InProgress";
            project.StartedAt = DateTime.UtcNow;

            team.ProjectId = project.Id;
            team.Status = "InProgress";
            team.StartedAt = DateTime.UtcNow;

            await _teamRepository.SaveChangesAsync();

            TempData["Success"] = $"Project '{project.Title}' assigned to '{team.Name}' successfully!";
            return RedirectToAction("Details", "Projects", new { id = project.Id });
        }

        // POST: Projects/UpdateProgress/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateProgress(int id, int progress)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithTeamAsync(id);
            if (project == null)
                return NotFound();

            if (project.Team?.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can update project progress.";
                return RedirectToAction("Details", new { id });
            }

            project.Progress = Math.Clamp(progress, 0, 100);

            if (project.Progress >= 100)
            {
                project.Status = "Completed";
                project.CompletedAt = DateTime.UtcNow;
            }

            await _projectRepository.UpdateAsync(project);

            TempData["Success"] = "Project progress updated successfully!";
            return RedirectToAction("Details", new { id });
        }
    }
}