using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface ISubmissionRepository
    {
        // Basic CRUD
        Task<Submission?> GetByIdAsync(int id);
        Task<IEnumerable<Submission>> GetAllAsync();
        Task<Submission> AddAsync(Submission submission);
        Task UpdateAsync(Submission submission);
        Task DeleteAsync(int id);

        // Specific queries
        Task<IEnumerable<Submission>> GetSubmissionsByProjectAsync(int projectId);
        Task<IEnumerable<Submission>> GetSubmissionsByUserAsync(string userId);
        Task<IEnumerable<Submission>> GetPendingSubmissionsAsync();
        Task<IEnumerable<Submission>> GetSubmissionsByStatusAsync(string status);
        Task<Submission?> GetSubmissionWithDetailsAsync(int id);
        Task<bool> HasUserSubmittedProjectAsync(int projectId, string userId);
        Task<int> GetSubmissionsCountAsync(int projectId);
        Task<double> GetAverageScoreAsync(int projectId);
        Task<bool> SubmissionExistsAsync(int id);
        Task<bool> SaveChangesAsync();
    }
}