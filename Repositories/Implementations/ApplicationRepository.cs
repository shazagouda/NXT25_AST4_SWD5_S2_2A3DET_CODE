using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Application?> GetByIdAsync(int id)
        {
            return await _context.Applications.Include(a => a.Project).Include(a => a.Applicant).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Application>> GetAllAsync()
        {
            return await _context.Applications.Include(a => a.Project).Include(a => a.Applicant).ToListAsync();
        }

        public async Task<Application> AddAsync(Application application)
        {
            await _context.Applications.AddAsync(application);
            return application;
        }

        public async Task UpdateAsync(Application application)
        {
            _context.Applications.Update(application);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var application = await GetByIdAsync(id);
            if (application != null)
            {
                _context.Applications.Remove(application);
            }
        }

        public async Task<Application?> GetByProjectAndApplicantAsync(int projectId, string applicantId)
        {
            return await _context.Applications.FirstOrDefaultAsync(a => a.ProjectId == projectId && a.ApplicantId == applicantId);
        }

        public async Task<IEnumerable<Application>> GetByProjectAsync(int projectId)
        {
            return await _context.Applications
                .Where(a => a.ProjectId == projectId)
                .Include(a => a.Applicant)
                .OrderByDescending(a => a.AppliedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Application>> GetByApplicantAsync(string applicantId)
        {
            return await _context.Applications
                .Where(a => a.ApplicantId == applicantId)
                .Include(a => a.Project)
                .OrderByDescending(a => a.AppliedAt)
                .ToListAsync();
        }
    }
}
