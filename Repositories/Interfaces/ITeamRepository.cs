using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
	public interface ITeamRepository
	{
		// Basic CRUD
		Task<Team?> GetByIdAsync(int id);
		Task<IEnumerable<Team>> GetAllAsync();
		Task<Team> AddAsync(Team team);
		Task UpdateAsync(Team team);
		Task DeleteAsync(int id);

		// Specific queries
		Task<Team?> GetTeamWithMembersAsync(int id);
		Task<Team?> GetTeamWithDetailsAsync(int id);
		Task<IEnumerable<Team>> GetTeamsByTrackAsync(int trackId);
		Task<IEnumerable<Team>> GetTeamsByLeaderAsync(string leaderId);
		Task<IEnumerable<Team>> GetTeamsByUserAsync(string userId);
		Task<IEnumerable<Team>> GetAvailableTeamsAsync();
		Task<IEnumerable<Team>> GetTeamsWithProjectsAsync();
		Task<int> GetTeamMemberCountAsync(int teamId);
		Task<bool> IsUserInTeamAsync(int teamId, string userId);
		Task<bool> IsUserTeamLeaderAsync(int teamId, string userId);
		Task<IEnumerable<TeamMember>> GetTeamMembersAsync(int teamId);
		Task<bool> TeamExistsAsync(int id);
		Task<bool> SaveChangesAsync();
	}
}