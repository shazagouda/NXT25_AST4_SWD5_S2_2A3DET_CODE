using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDbContext _context;

        public CompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies.FindAsync(id);
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> AddAsync(Company company)
        {
            await _context.Companies.AddAsync(company);
            return company;
        }

        public async Task UpdateAsync(Company company)
        {
            _context.Companies.Update(company);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var company = await GetByIdAsync(id);
            if (company != null)
            {
                _context.Companies.Remove(company);
            }
        }
    }
}
