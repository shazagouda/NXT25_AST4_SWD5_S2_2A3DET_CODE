using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Team;
using A3DET_CODE.ViewModels.Track;
using Microsoft.EntityFrameworkCore;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class TeamsController : Controller
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IJoinRequestRepository _joinRequestRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<TeamsController> _logger;
        private readonly ITrackRepository _trackRepository;

        public TeamsController(
            ITeamRepository teamRepository,
            ITeamMemberRepository teamMemberRepository,
            IJoinRequestRepository joinRequestRepository,
            IProjectRepository projectRepository,
            UserManager<ApplicationUser> userManager,
            ILogger<TeamsController> logger,
            ITrackRepository trackRepository)
        {
            _teamRepository = teamRepository;
            _teamMemberRepository = teamMemberRepository;
            _joinRequestRepository = joinRequestRepository;
            _projectRepository = projectRepository;
            _userManager = userManager;
            _logger = logger;
            _trackRepository = trackRepository;
        }

        // ============================================================
        // NEW: View Pending Join Requests (Leader only)
        // ============================================================
        // GET: Teams/PendingRequests/5
        public async Task<IActionResult> PendingRequests(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithDetailsAsync(id);
            if (team == null)
                return NotFound();

            // Only leader can view pending requests
            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can view pending requests.";
                return RedirectToAction("Details", new { id });
            }

            var pendingRequests = await _joinRequestRepository.GetPendingRequestsByTeamIdAsync(id);

            var viewModel = new PendingRequestsViewModel
            {
                TeamId = team.Id,
                ProjectId = team.ProjectId,
                TeamName = team.Name,
                Requests = pendingRequests.Select(r => new JoinRequestViewModel
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    UserName = r.User?.FullName ?? "Unknown",
                    UserInitials = r.User?.FullName?.Substring(0, 1)?.ToUpper() ?? "U",
                    RequestedAt = r.RequestedAt,
                    Status = r.Status
                }).ToList()
            };

            return View(viewModel);
        }

        // ============================================================
        // NEW: Accept a Join Request (Leader only)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AcceptMember(int id, string userId, string? returnUrl = null)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var joinRequest = await _joinRequestRepository.GetRequestAsync(id, userId);
            if (joinRequest == null || joinRequest.Status != "Pending")
            {
                TempData["Error"] = "No pending request found.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("PendingRequests", new { id });
            }

            var team = await _teamRepository.GetTeamWithDetailsAsync(id);
            if (team == null)
                return NotFound();

            // Verify user is team leader
            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can accept members.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("PendingRequests", new { id });
            }

            // Check if team is full
            if (team.CurrentMembers >= team.MaxMembers)
            {
                TempData["Error"] = "Team is full!";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("PendingRequests", new { id });
            }

            // Create team member
            var teamMember = new TeamMember
            {
                TeamId = team.Id,
                UserId = userId,
                Role = "Member",
                JoinedAt = DateTime.UtcNow
            };

            await _teamMemberRepository.AddAsync(teamMember);
            await _teamMemberRepository.SaveChangesAsync();

            // Update join request status
            joinRequest.Status = "Accepted";
            joinRequest.RespondedAt = DateTime.UtcNow;
            await _joinRequestRepository.UpdateAsync(joinRequest);
            await _joinRequestRepository.SaveChangesAsync();

            // Update team member count
            team.CurrentMembers += 1;
            if (team.CurrentMembers >= team.MaxMembers)
            {
                team.Status = "Full";
            }
            await _teamRepository.UpdateAsync(team);
            await _teamRepository.SaveChangesAsync();

            TempData["Success"] = $"User has been added to the team!";
            if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
            return RedirectToAction("PendingRequests", new { id });
        }

        // ============================================================
        // NEW: Reject a Join Request (Leader only)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RejectMember(int id, string userId, string? returnUrl = null)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var joinRequest = await _joinRequestRepository.GetRequestAsync(id, userId);
            if (joinRequest == null || joinRequest.Status != "Pending")
            {
                TempData["Error"] = "No pending request found.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("PendingRequests", new { id });
            }

            var team = await _teamRepository.GetTeamWithDetailsAsync(id);
            if (team == null)
                return NotFound();

            // Verify user is team leader
            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can reject members.";
                if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
                return RedirectToAction("PendingRequests", new { id });
            }

            // Update join request status
            joinRequest.Status = "Rejected";
            joinRequest.RespondedAt = DateTime.UtcNow;
            await _joinRequestRepository.UpdateAsync(joinRequest);
            await _joinRequestRepository.SaveChangesAsync();

            TempData["Success"] = $"Join request rejected.";
            if (!string.IsNullOrEmpty(returnUrl)) return LocalRedirect(returnUrl);
            return RedirectToAction("PendingRequests", new { id });
        }

        // ============================================================
        // NEW: Remove a Member (Leader only)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveMember(int id, string userId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var team = await _teamRepository.GetTeamWithDetailsAsync(id);
            if (team == null)
                return NotFound();

            // Verify user is team leader
            if (team.LeaderId != user.Id)
            {
                TempData["Error"] = "Only the team leader can remove members.";
                return RedirectToAction("Details", new { id });
            }

            // Can't remove the leader
            if (team.LeaderId == userId)
            {
                TempData["Error"] = "Cannot remove the team leader.";
                return RedirectToAction("Details", new { id });
            }

            var teamMember = await _teamMemberRepository.GetAsync(id, userId);
            if (teamMember == null)
            {
                TempData["Error"] = "User is not a member of this team.";
                return RedirectToAction("Details", new { id });
            }

            await _teamMemberRepository.RemoveAsync(teamMember);
            await _teamMemberRepository.SaveChangesAsync();

            // Update team member count
            team.CurrentMembers -= 1;
            if (team.Status == "Full" && team.CurrentMembers < team.MaxMembers)
            {
                team.Status = "Open";
            }
            await _teamRepository.UpdateAsync(team);
            await _teamRepository.SaveChangesAsync();

            TempData["Success"] = $"Member removed from the team.";
            return RedirectToAction("Details", new { id });
        }

        // ============================================================
        // Existing Actions
        // ============================================================

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

            var isMember = team.Members?.Any(m => m.UserId == user.Id) ?? false;
            var isLeader = team.LeaderId == user.Id;

            // Get pending requests count for leader
            var pendingCount = 0;
            if (isLeader)
            {
                pendingCount = await _joinRequestRepository.GetPendingCountByTeamIdAsync(id);
            }

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
                IsLeader = isLeader,
                IsMember = isMember,
                PendingRequestsCount = pendingCount
            };

            return View(viewModel);
        }

        // GET: Teams/Create (REMOVED - no manual team creation)
        // Teams are auto-created when a user takes a project

        // POST: Teams/Create (REMOVED - no manual team creation)

        // POST: Teams/Join/5 (Keep as is - for joining existing teams)
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

            // Check if user is already a member
            var existingMember = team.Members?.FirstOrDefault(m => m.UserId == user.Id);
            if (existingMember != null)
            {
                TempData["Error"] = "You are already a member of this team!";
                return RedirectToAction(nameof(Details), new { id });
            }

            // Check if team is full
            if (team.Members.Count >= team.MaxMembers)
            {
                TempData["Error"] = "Team is full!";
                return RedirectToAction(nameof(Details), new { id });
            }

            // Add member
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

            await _teamMemberRepository.SaveChangesAsync();

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
            await _teamMemberRepository.SaveChangesAsync();

            team.CurrentMembers = team.Members.Count - 1;
            if (team.Status == "Full" && team.CurrentMembers < team.MaxMembers)
                team.Status = "Open";

            await _teamRepository.UpdateAsync(team);
            await _teamRepository.SaveChangesAsync();

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