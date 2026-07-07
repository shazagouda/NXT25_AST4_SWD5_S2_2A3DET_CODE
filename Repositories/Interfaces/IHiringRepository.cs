using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface IHiringRepository
    {
        Task<Hiring?> GetByIdAsync(int id);
        Task<IEnumerable<Hiring>> GetAllAsync();
        Task<Hiring> AddAsync(Hiring hiring);
        Task UpdateAsync(Hiring hiring);
        Task DeleteAsync(int id);
        Task<Hiring?> GetByApplicationIdAsync(int applicationId);
        Task<IEnumerable<Hiring>> GetByCompanyAsync(string companyId);
    }
}
