using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Project;

namespace A3DET_CODE.Controllers
{
	[Authorize]
	public class ProjectsController : Controller
	{
		private readonly IProjectRepository _projectRepository;
		private readonly ITeamRepository _teamRepository;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly ILogger<ProjectsController> _logger;

		public ProjectsController(
			IProjectRepository projectRepository,
			ITeamRepository teamRepository,
			UserManager<ApplicationUser> userManager,
			ILogger<ProjectsController> logger)
		{
			_projectRepository = projectRepository;
			_teamRepository = teamRepository;
			_userManager = userManager;
			_logger = logger;
		}

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
				TotalTasks = project.Tasks?.Count ?? 0,
				CompletedTasks = project.Tasks?.Count(t => t.Status == "Completed") ?? 0,
				PendingTasks = project.Tasks?.Count(t => t.Status != "Completed") ?? 0,
				TotalSubmissions = project.Submissions?.Count ?? 0,
				AverageScore = project.Submissions != null && project.Submissions.Any()
					? Math.Round(project.Submissions.Average(s => s.Score ?? 0), 2)
					: 0
			};

			return View(viewModel);
		}

		// GET: Projects/Create
		public IActionResult Create()
		{
			return View();
		}

		// POST: Projects/Create
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(ProjectViewModel model)
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
				Status = "Open",
				TrackId = model.TrackId,
				Progress = 0,
				CreatedAt = DateTime.UtcNow
			};

			await _projectRepository.AddAsync(project);
			await _projectRepository.UpdateAsync(project);

			TempData["Success"] = "Project created successfully!";
			return RedirectToAction(nameof(Details), new { id = project.Id });
		}

		// POST: Projects/AssignTeam/5
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> AssignTeam(int projectId, int teamId)
		{
			var user = await _userManager.GetUserAsync(User);
			if (user == null)
				return RedirectToAction("Login", "Account");

			var project = await _projectRepository.GetByIdAsync(projectId);
			if (project == null)
				return NotFound();

			var team = await _teamRepository.GetByIdAsync(teamId);
			if (team == null)
				return NotFound();

			// Check if user is team leader
			if (team.LeaderId != user.Id)
			{
				TempData["Error"] = "Only the team leader can accept project assignments.";
				return RedirectToAction(nameof(Details), new { id = projectId });
			}

			// Check if team already has a project
			if (team.ProjectId.HasValue)
			{
				TempData["Error"] = "This team already has an assigned project.";
				return RedirectToAction(nameof(Details), new { id = projectId });
			}

			project.TeamId = teamId;
			project.Status = "InProgress";
			project.StartedAt = DateTime.UtcNow;

			team.ProjectId = projectId;
			team.Status = "InProgress";
			team.StartedAt = DateTime.UtcNow;

			await _projectRepository.UpdateAsync(project);
			await _teamRepository.UpdateAsync(team);

			TempData["Success"] = "Project assigned to team successfully!";
			return RedirectToAction(nameof(Details), new { id = projectId });
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

			// Check if user is team leader
			if (project.Team?.LeaderId != user.Id)
			{
				TempData["Error"] = "Only the team leader can update project progress.";
				return RedirectToAction(nameof(Details), new { id });
			}

			project.Progress = Math.Clamp(progress, 0, 100);

			if (project.Progress >= 100)
			{
				project.Status = "Completed";
				project.CompletedAt = DateTime.UtcNow;
			}

			await _projectRepository.UpdateAsync(project);

			TempData["Success"] = "Project progress updated successfully!";
			return RedirectToAction(nameof(Details), new { id });
		}
	}
}