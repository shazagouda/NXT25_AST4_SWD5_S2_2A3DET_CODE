using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
	public class ProjectRepository : IProjectRepository
	{
		private readonly ApplicationDbContext _context;

		public ProjectRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Project?> GetByIdAsync(int id)
		{
			return await _context.Projects.FindAsync(id);
		}

		public async Task<IEnumerable<Project>> GetAllAsync()
		{
			return await _context.Projects.ToListAsync();
		}

		public async Task<Project> AddAsync(Project project)
		{
			await _context.Projects.AddAsync(project);
			return project;
		}

		public async Task UpdateAsync(Project project)
		{
			_context.Projects.Update(project);
			await Task.CompletedTask;
		}

		public async Task DeleteAsync(int id)
		{
			var project = await GetByIdAsync(id);
			if (project != null)
			{
				_context.Projects.Remove(project);
			}
		}

		public async Task<Project?> GetProjectWithDetailsAsync(int id)
		{
			return await _context.Projects
				.Include(p => p.Track)
				.Include(p => p.Team)
					.ThenInclude(t => t!.Members)
				.Include(p => p.Tasks)
				.Include(p => p.Submissions)
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<Project?> GetProjectWithTeamAsync(int id)
		{
			return await _context.Projects
				.Include(p => p.Team)
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<IEnumerable<Project>> GetProjectsByTrackAsync(int trackId)
		{
			return await _context.Projects
				.Where(p => p.TrackId == trackId)
				.Include(p => p.Team)
				.ToListAsync();
		}

		public async Task<IEnumerable<Project>> GetProjectsByTeamAsync(int teamId)
		{
			return await _context.Projects
				.Where(p => p.TeamId == teamId)
				.Include(p => p.Tasks)
				.ToListAsync();
		}

		public async Task<IEnumerable<Project>> GetProjectsByStatusAsync(string status)
		{
			return await _context.Projects
				.Where(p => p.Status == status)
				.Include(p => p.Team)
				.ToListAsync();
		}

		public async Task<IEnumerable<Project>> GetAvailableProjectsAsync()
		{
			return await _context.Projects
				.Where(p => p.Status == "Open" || p.Status == "Pending")
				.Include(p => p.Track)
				.OrderByDescending(p => p.CreatedAt)
				.ToListAsync();
		}

		public async Task<IEnumerable<Project>> GetCompletedProjectsAsync()
		{
			return await _context.Projects
				.Where(p => p.Status == "Completed")
				.Include(p => p.Team)
				.Include(p => p.Submissions)
				.ToListAsync();
		}

		public async Task<IEnumerable<Project>> GetProjectsWithSubmissionsAsync()
		{
			return await _context.Projects
				.Include(p => p.Submissions)
				.Where(p => p.Submissions.Any())
				.ToListAsync();
		}

		public async Task<int> GetProjectProgressAsync(int projectId)
		{
			var tasks = await _context.Tasks
				.Where(t => t.ProjectId == projectId)
				.ToListAsync();

			if (!tasks.Any())
				return 0;

			var completed = tasks.Count(t => t.Status == "Completed");
			return (int)Math.Round((double)completed / tasks.Count * 100);
		}

		public async Task<bool> IsProjectAssignedToTeamAsync(int projectId, int teamId)
		{
			var project = await GetByIdAsync(projectId);
			return project?.TeamId == teamId;
		}

		public async Task<bool> ProjectExistsAsync(int id)
		{
			return await _context.Projects.AnyAsync(p => p.Id == id);
		}
	}
}