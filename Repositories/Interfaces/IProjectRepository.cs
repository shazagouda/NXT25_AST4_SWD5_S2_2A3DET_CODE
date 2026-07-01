using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
	public interface IProjectRepository
	{
		// Basic CRUD
		Task<Project?> GetByIdAsync(int id);
		Task<IEnumerable<Project>> GetAllAsync();
		Task<Project> AddAsync(Project project);
		Task UpdateAsync(Project project);
		Task DeleteAsync(int id);

		// Specific queries
		Task<Project?> GetProjectWithDetailsAsync(int id);
		Task<Project?> GetProjectWithTeamAsync(int id);
		Task<IEnumerable<Project>> GetProjectsByTrackAsync(int trackId);
		Task<IEnumerable<Project>> GetProjectsByTeamAsync(int teamId);
		Task<IEnumerable<Project>> GetProjectsByStatusAsync(string status);
		Task<IEnumerable<Project>> GetAvailableProjectsAsync();
		Task<IEnumerable<Project>> GetCompletedProjectsAsync();
		Task<IEnumerable<Project>> GetProjectsWithSubmissionsAsync();
		Task<int> GetProjectProgressAsync(int projectId);
		Task<bool> IsProjectAssignedToTeamAsync(int projectId, int teamId);
		Task<bool> ProjectExistsAsync(int id);
	}
}