using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface IApplicationRepository
    {
        Task<Application?> GetByIdAsync(int id);
        Task<IEnumerable<Application>> GetAllAsync();
        Task<Application> AddAsync(Application application);
        Task UpdateAsync(Application application);
        Task DeleteAsync(int id);
        Task<Application?> GetByProjectAndApplicantAsync(int projectId, string applicantId);
        Task<IEnumerable<Application>> GetByProjectAsync(int projectId);
        Task<IEnumerable<Application>> GetByApplicantAsync(string applicantId);
    }
}
