using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
	public class TeamRepository : ITeamRepository
	{
		private readonly ApplicationDbContext _context;

		public TeamRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Team?> GetByIdAsync(int id)
		{
			return await _context.Teams.FindAsync(id);
		}

		public async Task<IEnumerable<Team>> GetAllAsync()
		{
			return await _context.Teams.ToListAsync();
		}

		public async Task<Team> AddAsync(Team team)
		{
			await _context.Teams.AddAsync(team);
			return team;
		}

		public async Task UpdateAsync(Team team)
		{
			_context.Teams.Update(team);
			await Task.CompletedTask;
		}

		public async Task DeleteAsync(int id)
		{
			var team = await GetByIdAsync(id);
			if (team != null)
			{
				_context.Teams.Remove(team);
			}
		}

		public async Task<Team?> GetTeamWithMembersAsync(int id)
		{
			return await _context.Teams
				.Include(t => t.Members)
					.ThenInclude(m => m.User)
				.FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<Team?> GetTeamWithDetailsAsync(int id)
		{
			return await _context.Teams
				.Include(t => t.Track)
				.Include(t => t.Leader)
				.Include(t => t.Members)
					.ThenInclude(m => m.User)
				.Include(t => t.Project)
				.FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<IEnumerable<Team>> GetTeamsByTrackAsync(int trackId)
		{
			return await _context.Teams
				.Where(t => t.TrackId == trackId)
				.Include(t => t.Members)
				.ToListAsync();
		}

		public async Task<IEnumerable<Team>> GetTeamsByLeaderAsync(string leaderId)
		{
            return await _context.Teams
                .Where(t => t.LeaderId == leaderId)
                .Include(t => t.Track)
                .Include(t => t.Project)
                    .ThenInclude(p => p.Track)
                .Include(t => t.Members)
                    .ThenInclude(m => m.User)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

		public async Task<IEnumerable<Team>> GetTeamsByUserAsync(string userId)
		{
			return await _context.Teams
				.Where(t => t.Members.Any(m => m.UserId == userId))
				.Include(t => t.Members)
				.ToListAsync();
		}

		public async Task<IEnumerable<Team>> GetAvailableTeamsAsync()
		{
			return await _context.Teams
				.Where(t => t.Status == "Open" && t.CurrentMembers < t.MaxMembers)
				.Include(t => t.Track)
				.Include(t => t.Members)
				.OrderByDescending(t => t.CreatedAt)
				.ToListAsync();
		}

		public async Task<IEnumerable<Team>> GetTeamsWithProjectsAsync()
		{
			return await _context.Teams
				.Where(t => t.ProjectId != null)
				.Include(t => t.Project)
				.Include(t => t.Members)
				.ToListAsync();
		}

		public async Task<int> GetTeamMemberCountAsync(int teamId)
		{
			return await _context.TeamMembers
				.CountAsync(tm => tm.TeamId == teamId);
		}

		public async Task<bool> IsUserInTeamAsync(int teamId, string userId)
		{
			return await _context.TeamMembers
				.AnyAsync(tm => tm.TeamId == teamId && tm.UserId == userId);
		}

		public async Task<bool> IsUserTeamLeaderAsync(int teamId, string userId)
		{
			var team = await GetByIdAsync(teamId);
			return team?.LeaderId == userId;
		}

		public async Task<IEnumerable<TeamMember>> GetTeamMembersAsync(int teamId)
		{
			return await _context.TeamMembers
				.Where(tm => tm.TeamId == teamId)
				.Include(tm => tm.User)
				.ToListAsync();
		}

		public async Task<bool> TeamExistsAsync(int id)
		{
			return await _context.Teams.AnyAsync(t => t.Id == id);
		}
        public async Task<bool> SaveChangesAsync()
		{
			return await _context.SaveChangesAsync() >= 0;
		}

    }
}