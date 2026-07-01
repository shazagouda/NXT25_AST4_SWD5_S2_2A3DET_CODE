using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
	public class TaskRepository : ITaskRepository
	{
		private readonly ApplicationDbContext _context;

		public TaskRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Models.Task?> GetByIdAsync(int id)
		{
			return await _context.Tasks.FindAsync(id);
		}

		public async Task<IEnumerable<Models.Task>> GetAllAsync()
		{
			return await _context.Tasks.ToListAsync();
		}

		public async Task<Models.Task> AddAsync(Models.Task task)
		{
			await _context.Tasks.AddAsync(task);
			return task;
		}

		public async Task UpdateAsync(Models.Task task)
		{
			_context.Tasks.Update(task);
			await Task.CompletedTask;
		}

		public async Task DeleteAsync(int id)
		{
			var task = await GetByIdAsync(id);
			if (task != null)
			{
				_context.Tasks.Remove(task);
			}
		}

		public async Task<IEnumerable<Models.Task>> GetTasksByProjectAsync(int projectId)
		{
			return await _context.Tasks
				.Where(t => t.ProjectId == projectId)
				.Include(t => t.AssignedTo)
				.OrderBy(t => t.DueDate)
				.ToListAsync();
		}

		public async Task<IEnumerable<Models.Task>> GetTasksByUserAsync(string userId)
		{
			return await _context.Tasks
				.Where(t => t.AssignedToId == userId)
				.Include(t => t.Project)
				.OrderBy(t => t.DueDate)
				.ToListAsync();
		}

		public async Task<IEnumerable<Models.Task>> GetTasksByStatusAsync(string status)
		{
			return await _context.Tasks
				.Where(t => t.Status == status)
				.Include(t => t.Project)
				.Include(t => t.AssignedTo)
				.ToListAsync();
		}

		public async Task<IEnumerable<Models.Task>> GetTasksByPriorityAsync(string priority)
		{
			return await _context.Tasks
				.Where(t => t.Priority == priority)
				.Include(t => t.Project)
				.Include(t => t.AssignedTo)
				.ToListAsync();
		}

		public async Task<Models.Task?> GetTaskWithDetailsAsync(int id)
		{
			return await _context.Tasks
				.Include(t => t.Project)
				.Include(t => t.AssignedTo)
				.FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<int> GetCompletedTasksCountAsync(int projectId)
		{
			return await _context.Tasks
				.CountAsync(t => t.ProjectId == projectId && t.Status == "Completed");
		}

		public async Task<int> GetPendingTasksCountAsync(int projectId)
		{
			return await _context.Tasks
				.CountAsync(t => t.ProjectId == projectId && t.Status != "Completed");
		}

		public async Task<double> GetTaskCompletionRateAsync(int projectId)
		{
			var total = await _context.Tasks.CountAsync(t => t.ProjectId == projectId);
			if (total == 0) return 0;

			var completed = await GetCompletedTasksCountAsync(projectId);
			return Math.Round((double)completed / total * 100, 2);
		}

		public async Task<IEnumerable<Models.Task>> GetOverdueTasksAsync()
		{
			var today = DateTime.UtcNow.Date;
			return await _context.Tasks
				.Where(t => t.DueDate < today && t.Status != "Completed")
				.Include(t => t.Project)
				.Include(t => t.AssignedTo)
				.ToListAsync();
		}

		public async Task<bool> IsTaskAssignedToUserAsync(int taskId, string userId)
		{
			var task = await GetByIdAsync(taskId);
			return task?.AssignedToId == userId;
		}

		public async Task<bool> TaskExistsAsync(int id)
		{
			return await _context.Tasks.AnyAsync(t => t.Id == id);
		}
	}
}