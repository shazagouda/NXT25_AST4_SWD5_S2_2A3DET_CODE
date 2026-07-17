using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Task;
using Task = A3DET_CODE.Models.Task;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class TasksController : Controller
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<TasksController> _logger;

        public TasksController(
            ITaskRepository taskRepository,
            ITeamRepository teamRepository,
            IProjectRepository projectRepository,
            UserManager<ApplicationUser> userManager,
            ILogger<TasksController> logger)
        {
            _taskRepository = taskRepository;
            _teamRepository = teamRepository;
            _projectRepository = projectRepository;
            _userManager = userManager;
            _logger = logger;
        }

        // GET: Tasks/Project/5
        public async Task<IActionResult> ProjectTasks(int projectId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithTeamAsync(projectId);
            if (project == null)
                return NotFound();

            var teamMembers = await _teamRepository.GetTeamMembersAsync(project.TeamId ?? 0);
            if (!teamMembers.Any(m => m.UserId == user.Id) && project.Team?.LeaderId != user.Id)
            {
                TempData["Error"] = "You are not a member of this team.";
                return RedirectToAction("Details", "Projects", new { id = projectId });
            }

            var tasks = await _taskRepository.GetTasksByProjectAsync(projectId);

            var viewModels = tasks.Select(t => new TaskViewModel
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                ProjectId = t.ProjectId,
                ProjectTitle = project.Title,
                AssignedToId = t.AssignedToId,
                AssignedToName = t.AssignedTo?.FullName ?? "Unknown",
                AssignedToInitials = t.AssignedTo?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                Status = t.Status,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                StartedAt = t.StartedAt,
                CompletedAt = t.CompletedAt,
                DueDate = t.DueDate
            }).ToList();

            ViewBag.ProjectTitle = project.Title;
            ViewBag.ProjectId = projectId;
            return View(viewModels);
        }

        // GET: Tasks/Create/5
        public async Task<IActionResult> Create(int projectId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithTeamAsync(projectId);
            if (project == null)
                return NotFound();

            if (project.Team?.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can create tasks.";
                return RedirectToAction("ProjectTasks", new { projectId });
            }

            var viewModel = new TaskViewModel
            {
                ProjectId = projectId,
                ProjectTitle = project.Title
            };

            var teamMembers = await _teamRepository.GetTeamMembersAsync(project.TeamId ?? 0);
            ViewBag.TeamMembers = teamMembers.Select(m => new
            {
                Id = m.UserId,
                Name = m.User?.FullName ?? "Unknown"
            }).ToList();

            return View(viewModel);
        }

        // POST: Tasks/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TaskViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var project = await _projectRepository.GetProjectWithTeamAsync(model.ProjectId);
                if (project != null)
                {
                    var teamMembers = await _teamRepository.GetTeamMembersAsync(project.TeamId ?? 0);
                    ViewBag.TeamMembers = teamMembers.Select(m => new
                    {
                        Id = m.UserId,
                        Name = m.User?.FullName ?? "Unknown"
                    }).ToList();
                }
                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var task = new Task
            {
                ProjectId = model.ProjectId,
                Title = model.Title,
                Description = model.Description,
                AssignedToId = model.AssignedToId,
                Status = "Pending",
                Priority = model.Priority,
                DueDate = model.DueDate,
                CreatedAt = DateTime.UtcNow
            };

            await _taskRepository.AddAsync(task);
            await _taskRepository.SaveChangesAsync();

            TempData["Success"] = "Task created successfully!";
            return RedirectToAction("ProjectTasks", new { projectId = model.ProjectId });
        }

        // POST: Tasks/UpdateStatus/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateStatus(int id, string status)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var task = await _taskRepository.GetTaskWithDetailsAsync(id);
            if (task == null)
                return NotFound();

            var project = await _projectRepository.GetProjectWithTeamAsync(task.ProjectId);
            if (project?.Team == null)
            {
                TempData["Error"] = "Project or team not found.";
                return RedirectToAction("ProjectTasks", new { projectId = task.ProjectId });
            }

            var isAssigned = task.AssignedToId == user.Id;
            var isLeader = project.Team.LeaderId == user.Id;

            if (!isAssigned && !isLeader)
            {
                TempData["Error"] = "You are not authorized to update this task.";
                return RedirectToAction("ProjectTasks", new { projectId = task.ProjectId });
            }

            task.Status = status;

            if (status == "InProgress" && !task.StartedAt.HasValue)
                task.StartedAt = DateTime.UtcNow;

            if (status == "Completed")
                task.CompletedAt = DateTime.UtcNow;

            // ✅ حفظ تغييرات المهمة
            await _taskRepository.UpdateAsync(task);
            await _taskRepository.SaveChangesAsync();

            // تحديث تقدم المشروع
            var progress = await _projectRepository.GetProjectProgressAsync(task.ProjectId);
            var projectToUpdate = await _projectRepository.GetByIdAsync(task.ProjectId);
            if (projectToUpdate != null)
            {
                projectToUpdate.Progress = progress;
                await _projectRepository.UpdateAsync(projectToUpdate);
                await _projectRepository.SaveChangesAsync();
            }

            TempData["Success"] = $"Task status updated to '{status}' successfully!";
            return RedirectToAction("ProjectTasks", new { projectId = task.ProjectId });
        }

        // GET: Tasks/MyTasks
        public async Task<IActionResult> MyTasks()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var tasks = await _taskRepository.GetTasksByUserAsync(user.Id);

            var viewModels = tasks.Select(t => new TaskViewModel
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                ProjectId = t.ProjectId,
                ProjectTitle = t.Project?.Title ?? "Unknown",
                AssignedToId = t.AssignedToId,
                AssignedToName = t.AssignedTo?.FullName ?? "Unknown",
                AssignedToInitials = t.AssignedTo?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                Status = t.Status,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt,
                StartedAt = t.StartedAt,
                CompletedAt = t.CompletedAt,
                DueDate = t.DueDate
            }).ToList();

            return View(viewModels);
        }
    }
}