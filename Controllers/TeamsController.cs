using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Team;
using A3DET_CODE.Repositories.Implementations;

namespace A3DET_CODE.Controllers
{
	[Authorize]
	public class TeamsController : Controller
	{
		private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IProjectRepository _projectRepository;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly ILogger<TeamsController> _logger;

		public TeamsController(
			ITeamRepository teamRepository,
            ITeamMemberRepository teamMemberRepository,
            IProjectRepository projectRepository,
			UserManager<ApplicationUser> userManager,
			ILogger<TeamsController> logger)
        {
			_teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _projectRepository = projectRepository;
			_userManager = userManager;
			_logger = logger;
		}

		// GET: Teams
		public async Task<IActionResult> Index()
		{
			var user = await _userManager.GetUserAsync(User);
			if (user == null)
				return RedirectToAction("Login", "Account");

			var teams = await _teamRepository.GetAvailableTeamsAsync();
			var userTeams = await _teamRepository.GetTeamsByUserAsync(user.Id);

			var viewModels = teams.Select(t => new TeamViewModel
			{
				Id = t.Id,
				Name = t.Name,
				Description = t.Description,
				LeaderId = t.LeaderId,
				LeaderName = t.Leader?.FullName ?? "Unknown",
				LeaderInitials = t.Leader?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
				TrackId = t.TrackId,
				TrackName = t.Track?.Name ?? "Unknown",
				TrackColor = t.Track?.Color ?? "#2F6FED",
				ProjectId = t.ProjectId,
				ProjectTitle = t.Project?.Title,
				MaxMembers = t.MaxMembers,
				CurrentMembers = t.Members?.Count ?? 0,
				Status = t.Status,
				StatusColor = t.Status == "Open" ? "#22C55E" : t.Status == "Full" ? "#F59E0B" : "#94A0B8",
				CreatedAt = t.CreatedAt,
				StartedAt = t.StartedAt,
				CompletedAt = t.CompletedAt,
				Members = t.Members?.Select(m => new TeamMemberViewModel
				{
					UserId = m.UserId,
					FullName = m.User?.FullName ?? "Unknown",
					Initials = m.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
					Role = m.Role,
					JoinedAt = m.JoinedAt
				}).ToList() ?? new(),
				IsLeader = t.LeaderId == user.Id,
				IsMember = t.Members?.Any(m => m.UserId == user.Id) ?? false
			}).ToList();

			// Add user's teams separately
			var userTeamViewModels = userTeams.Select(t => new TeamViewModel
			{
				Id = t.Id,
				Name = t.Name,
				Description = t.Description,
				LeaderId = t.LeaderId,
				LeaderName = t.Leader?.FullName ?? "Unknown",
				LeaderInitials = t.Leader?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
				TrackId = t.TrackId,
				TrackName = t.Track?.Name ?? "Unknown",
				TrackColor = t.Track?.Color ?? "#2F6FED",
				ProjectId = t.ProjectId,
				ProjectTitle = t.Project?.Title,
				MaxMembers = t.MaxMembers,
				CurrentMembers = t.Members?.Count ?? 0,
				Status = t.Status,
				StatusColor = t.Status == "Open" ? "#22C55E" : t.Status == "Full" ? "#F59E0B" : "#94A0B8",
				CreatedAt = t.CreatedAt,
				StartedAt = t.StartedAt,
				CompletedAt = t.CompletedAt,
				Members = t.Members?.Select(m => new TeamMemberViewModel
				{
					UserId = m.UserId,
					FullName = m.User?.FullName ?? "Unknown",
					Initials = m.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
					Role = m.Role,
					JoinedAt = m.JoinedAt
				}).ToList() ?? new(),
				IsLeader = t.LeaderId == user.Id,
				IsMember = t.Members?.Any(m => m.UserId == user.Id) ?? false
			}).ToList();

			var allTeams = viewModels
				.Concat(userTeamViewModels)
				.GroupBy(t => t.Id)
				.Select(g => g.First())
				.OrderByDescending(t => t.CreatedAt)
				.ToList();

			return View(allTeams);
		}

		// GET: Teams/Details/5
		public async Task<IActionResult> Details(int id)
		{
			var user = await _userManager.GetUserAsync(User);
			if (user == null)
				return RedirectToAction("Login", "Account");

			var team = await _teamRepository.GetTeamWithDetailsAsync(id);
			if (team == null)
				return NotFound();

			var viewModel = new TeamDetailsViewModel
			{
				Id = team.Id,
				Name = team.Name,
				Description = team.Description,
				LeaderId = team.LeaderId,
				LeaderName = team.Leader?.FullName ?? "Unknown",
				LeaderInitials = team.Leader?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
				TrackId = team.TrackId,
				TrackName = team.Track?.Name ?? "Unknown",
				TrackColor = team.Track?.Color ?? "#2F6FED",
				ProjectId = team.ProjectId,
				ProjectTitle = team.Project?.Title,
				ProjectStatus = team.Project?.Status,
				MaxMembers = team.MaxMembers,
				CurrentMembers = team.Members?.Count ?? 0,
				Status = team.Status,
				StatusColor = team.Status == "Open" ? "#22C55E" : team.Status == "Full" ? "#F59E0B" : "#94A0B8",
				CreatedAt = team.CreatedAt,
				StartedAt = team.StartedAt,
				CompletedAt = team.CompletedAt,
				Members = team.Members?.Select(m => new TeamMemberViewModel
				{
					UserId = m.UserId,
					FullName = m.User?.FullName ?? "Unknown",
					Initials = m.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
					Role = m.Role,
					JoinedAt = m.JoinedAt
				}).ToList() ?? new(),
				IsLeader = team.LeaderId == user.Id,
				IsMember = team.Members?.Any(m => m.UserId == user.Id) ?? false
			};

			return View(viewModel);
		}

		// GET: Teams/Create
		public IActionResult Create()
		{
			return View();
		}

		// POST: Teams/Create
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(CreateTeamViewModel model)
		{
			if (!ModelState.IsValid)
				return View(model);

			var user = await _userManager.GetUserAsync(User);
			if (user == null)
				return RedirectToAction("Login", "Account");

			var team = new Team
			{
				Name = model.Name,
				Description = model.Description,
				LeaderId = user.Id,
				TrackId = model.TrackId,
				MaxMembers = model.MaxMembers,
				Status = "Open",
				CurrentMembers = 1,
				CreatedAt = DateTime.UtcNow
			};

			await _teamRepository.AddAsync(team);
			await _teamRepository.UpdateAsync(team);

			// Add leader as member
			var teamMember = new TeamMember
			{
				TeamId = team.Id,
				UserId = user.Id,
				Role = "Leader",
				JoinedAt = DateTime.UtcNow
			};

			// Assuming you have a TeamMemberRepository or access to DbContext
			// For now, we'll use the repository pattern through a custom method
			// You'll need to add this method or use DbContext directly

			TempData["Success"] = "Team created successfully!";
			return RedirectToAction(nameof(Details), new { id = team.Id });
		}

        // POST: Teams/Join/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Join(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithMembersAsync(id);
            if (team == null)
                return NotFound();

            if (team.Members.Count >= team.MaxMembers)
            {
                TempData["Error"] = "Team is full!";
                return RedirectToAction(nameof(Details), new { id });
            }

            var exists = await _teamMemberRepository.ExistsAsync(id, user.Id);
            if (exists)
            {
                TempData["Error"] = "You are already a member of this team!";
                return RedirectToAction(nameof(Details), new { id });
            }

            var teamMember = new TeamMember
            {
                TeamId = team.Id,
                UserId = user.Id,
                Role = "Member",
                JoinedAt = DateTime.UtcNow
            };

            await _teamMemberRepository.AddAsync(teamMember);

            team.CurrentMembers = team.Members.Count + 1;
            if (team.CurrentMembers >= team.MaxMembers)
                team.Status = "Full";

            await _teamRepository.UpdateAsync(team);

            TempData["Success"] = "You joined the team successfully!";
            return RedirectToAction(nameof(Details), new { id });
        }

        // POST: Teams/Leave/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Leave(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithMembersAsync(id);
            if (team == null)
                return NotFound();

            var member = await _teamMemberRepository.GetAsync(id, user.Id);
            if (member == null)
            {
                TempData["Error"] = "You are not a member of this team!";
                return RedirectToAction(nameof(Details), new { id });
            }

            if (member.Role == "Leader")
            {
                TempData["Error"] = "Team leader cannot leave. Transfer leadership or delete the team.";
                return RedirectToAction(nameof(Details), new { id });
            }

            await _teamMemberRepository.RemoveAsync(member);

            team.CurrentMembers = team.Members.Count - 1;
            if (team.Status == "Full" && team.CurrentMembers < team.MaxMembers)
                team.Status = "Open";

            await _teamRepository.UpdateAsync(team);

            TempData["Success"] = "You left the team.";
            return RedirectToAction(nameof(Index));
        }

        // POST: Teams/Delete/5
        [HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Delete(int id)
		{
			var user = await _userManager.GetUserAsync(User);
			if (user == null)
				return RedirectToAction("Login", "Account");

			var team = await _teamRepository.GetByIdAsync(id);
			if (team == null)
				return NotFound();

			if (team.LeaderId != user.Id)
			{
				TempData["Error"] = "Only the team leader can delete the team.";
				return RedirectToAction(nameof(Details), new { id });
			}

			await _teamRepository.DeleteAsync(id);

			TempData["Success"] = "Team deleted successfully.";
			return RedirectToAction(nameof(Index));
		}
	}
}