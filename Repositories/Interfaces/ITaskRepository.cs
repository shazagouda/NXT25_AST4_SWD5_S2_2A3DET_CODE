using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        // Basic CRUD
        Task<Models.Task?> GetByIdAsync(int id);
        Task<IEnumerable<Models.Task>> GetAllAsync();
        Task<Models.Task> AddAsync(Models.Task task);
        Task UpdateAsync(Models.Task task);
        Task DeleteAsync(int id);

        // Specific queries
        Task<IEnumerable<Models.Task>> GetTasksByProjectAsync(int projectId);
        Task<IEnumerable<Models.Task>> GetTasksByUserAsync(string userId);
        Task<IEnumerable<Models.Task>> GetTasksByStatusAsync(string status);
        Task<IEnumerable<Models.Task>> GetTasksByPriorityAsync(string priority);
        Task<Models.Task?> GetTaskWithDetailsAsync(int id);
        Task<int> GetCompletedTasksCountAsync(int projectId);
        Task<int> GetPendingTasksCountAsync(int projectId);
        Task<double> GetTaskCompletionRateAsync(int projectId);
        Task<IEnumerable<Models.Task>> GetOverdueTasksAsync();
        Task<bool> IsTaskAssignedToUserAsync(int taskId, string userId);
        Task<bool> TaskExistsAsync(int id);
        Task<bool> SaveChangesAsync();
    }
}