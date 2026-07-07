using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class HiringRepository : IHiringRepository
    {
        private readonly ApplicationDbContext _context;

        public HiringRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Hiring?> GetByIdAsync(int id)
        {
            return await _context.Hirings.Include(h => h.Application).Include(h => h.Company).Include(h => h.Student).FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task<IEnumerable<Hiring>> GetAllAsync()
        {
            return await _context.Hirings.Include(h => h.Application).Include(h => h.Company).Include(h => h.Student).ToListAsync();
        }

        public async Task<Hiring> AddAsync(Hiring hiring)
        {
            await _context.Hirings.AddAsync(hiring);
            return hiring;
        }

        public async Task UpdateAsync(Hiring hiring)
        {
            _context.Hirings.Update(hiring);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var hiring = await GetByIdAsync(id);
            if (hiring != null)
            {
                _context.Hirings.Remove(hiring);
            }
        }

        public async Task<Hiring?> GetByApplicationIdAsync(int applicationId)
        {
            return await _context.Hirings.FirstOrDefaultAsync(h => h.ApplicationId == applicationId);
        }

        public async Task<IEnumerable<Hiring>> GetByCompanyAsync(string companyId)
        {
            return await _context.Hirings.Where(h => h.CompanyId == companyId).Include(h => h.Student).Include(h => h.Application).OrderByDescending(h => h.HiredAt).ToListAsync();
        }
    }
}
