using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDbContext _context;

        public PortfolioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Portfolio?> GetByIdAsync(int id)
        {
            return await _context.Portfolios.Include(p => p.Projects).ThenInclude(pp => pp.Project).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Portfolio?> GetByUserIdAsync(string userId)
        {
            return await _context.Portfolios.Include(p => p.Projects).ThenInclude(pp => pp.Project).FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<IEnumerable<Portfolio>> GetAllAsync()
        {
            return await _context.Portfolios.Include(p => p.User).ToListAsync();
        }

        public async Task<Portfolio> AddAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            return portfolio;
        }

        public async Task UpdateAsync(Portfolio portfolio)
        {
            _context.Portfolios.Update(portfolio);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var portfolio = await GetByIdAsync(id);
            if (portfolio != null)
            {
                _context.Portfolios.Remove(portfolio);
            }
        }
    }
}
