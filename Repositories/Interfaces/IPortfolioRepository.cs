using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<Portfolio?> GetByIdAsync(int id);
        Task<Portfolio?> GetByUserIdAsync(string userId);
        Task<IEnumerable<Portfolio>> GetAllAsync();
        Task<Portfolio> AddAsync(Portfolio portfolio);
        Task UpdateAsync(Portfolio portfolio);
        Task DeleteAsync(int id);
    }
}
