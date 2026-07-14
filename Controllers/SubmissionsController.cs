using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Submission;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class SubmissionsController : Controller
    {
        private readonly ISubmissionRepository _submissionRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<SubmissionsController> _logger;

        public SubmissionsController(
            ISubmissionRepository submissionRepository,
            IProjectRepository projectRepository,
            ITeamRepository teamRepository,
            UserManager<ApplicationUser> userManager,
            ILogger<SubmissionsController> logger)
        {
            _submissionRepository = submissionRepository;
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _userManager = userManager;
            _logger = logger;
        }

        // GET: Submissions/Project/5
        public async Task<IActionResult> ProjectSubmissions(int projectId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithTeamAsync(projectId);
            if (project == null)
                return NotFound();

            // Check if user is in the team or is the team leader
            var teamMembers = await _teamRepository.GetTeamMembersAsync(project.TeamId ?? 0);
            if (!teamMembers.Any(m => m.UserId == user.Id) && project.Team?.LeaderId != user.Id)
            {
                TempData["Error"] = "You are not a member of this team.";
                return RedirectToAction("Details", "Projects", new { id = projectId });
            }

            var submissions = await _submissionRepository.GetSubmissionsByProjectAsync(projectId);

            var viewModels = submissions.Select(s => new SubmissionViewModel
            {
                Id = s.Id,
                Title = s.Title,
                Description = s.Description,
                ProjectId = s.ProjectId,
                ProjectTitle = project.Title,
                UserId = s.UserId,
                UserName = s.User?.FullName ?? "Unknown",
                UserInitials = s.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                FileUrl = s.FileUrl,
                GitHubUrl = s.GitHubUrl,
                DemoUrl = s.DemoUrl,
                Status = s.Status,
                Feedback = s.Feedback,
                Score = s.Score,
                SubmittedAt = s.SubmittedAt,
                ReviewedAt = s.ReviewedAt
            }).ToList();

            ViewBag.ProjectTitle = project.Title;
            ViewBag.ProjectId = projectId;
            ViewBag.CanReview = project.Team?.LeaderId == user.Id;
            return View(viewModels);
        }

        // GET: Submissions/Create/5
        public async Task<IActionResult> Create(int projectId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = await _projectRepository.GetProjectWithTeamAsync(projectId);
            if (project == null)
                return NotFound();

            // Check if user is in the team
            var teamMembers = await _teamRepository.GetTeamMembersAsync(project.TeamId ?? 0);
            if (!teamMembers.Any(m => m.UserId == user.Id))
            {
                TempData["Error"] = "You are not a member of this team.";
                return RedirectToAction("Details", "Projects", new { id = projectId });
            }

            var viewModel = new SubmissionViewModel
            {
                ProjectId = projectId,
                ProjectTitle = project.Title
            };

            return View(viewModel);
        }

        // POST: Submissions/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(SubmissionViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            // Check if user already submitted
            var hasSubmitted = await _submissionRepository.HasUserSubmittedProjectAsync(model.ProjectId, user.Id);
            if (hasSubmitted)
            {
                TempData["Error"] = "You have already submitted this project.";
                return RedirectToAction("ProjectSubmissions", new { projectId = model.ProjectId });
            }

            var submission = new Submission
            {
                ProjectId = model.ProjectId,
                UserId = user.Id,
                Title = model.Title,
                Description = model.Description,
                FileUrl = model.FileUrl,
                GitHubUrl = model.GitHubUrl,
                DemoUrl = model.DemoUrl,
                Status = "Pending",
                SubmittedAt = DateTime.UtcNow
            };

            await _submissionRepository.AddAsync(submission);
            await _submissionRepository.SaveChangesAsync();

            TempData["Success"] = "Submission created successfully!";
            return RedirectToAction("ProjectSubmissions", new { projectId = model.ProjectId });
        }

        // POST: Submissions/Review/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Review(int id, string status, int? score, string feedback)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var submission = await _submissionRepository.GetSubmissionWithDetailsAsync(id);
            if (submission == null)
                return NotFound();

            // Check if user is the project leader
            var project = await _projectRepository.GetProjectWithTeamAsync(submission.ProjectId);
            if (project?.Team?.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can review submissions.";
                return RedirectToAction("ProjectSubmissions", new { projectId = submission.ProjectId });
            }

            submission.Status = status;
            submission.Feedback = feedback;
            submission.Score = score;
            submission.ReviewedAt = DateTime.UtcNow;

            await _submissionRepository.UpdateAsync(submission);

            TempData["Success"] = "Submission reviewed successfully!";
            return RedirectToAction("ProjectSubmissions", new { projectId = submission.ProjectId });
        }

        // GET: Submissions/MySubmissions
        public async Task<IActionResult> MySubmissions()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var submissions = await _submissionRepository.GetSubmissionsByUserAsync(user.Id);

            var viewModels = submissions.Select(s => new SubmissionViewModel
            {
                Id = s.Id,
                Title = s.Title,
                Description = s.Description,
                ProjectId = s.ProjectId,
                ProjectTitle = s.Project?.Title ?? "Unknown",
                UserId = s.UserId,
                UserName = s.User?.FullName ?? "Unknown",
                UserInitials = s.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                FileUrl = s.FileUrl,
                GitHubUrl = s.GitHubUrl,
                DemoUrl = s.DemoUrl,
                Status = s.Status,
                Feedback = s.Feedback,
                Score = s.Score,
                SubmittedAt = s.SubmittedAt,
                ReviewedAt = s.ReviewedAt
            }).ToList();

            return View(viewModels);
        }
    }
}