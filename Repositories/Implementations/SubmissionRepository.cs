using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class SubmissionRepository : ISubmissionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubmissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Submission?> GetByIdAsync(int id)
        {
            return await _context.Submissions.FindAsync(id);
        }

        public async Task<IEnumerable<Submission>> GetAllAsync()
        {
            return await _context.Submissions.ToListAsync();
        }

        public async Task<Submission> AddAsync(Submission submission)
        {
            await _context.Submissions.AddAsync(submission);
            return submission;
        }

        public async Task UpdateAsync(Submission submission)
        {
            _context.Submissions.Update(submission);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var submission = await GetByIdAsync(id);
            if (submission != null)
            {
                _context.Submissions.Remove(submission);
            }
        }

        public async Task<IEnumerable<Submission>> GetSubmissionsByProjectAsync(int projectId)
        {
            return await _context.Submissions
                .Where(s => s.ProjectId == projectId)
                .Include(s => s.User)
                .OrderByDescending(s => s.SubmittedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Submission>> GetSubmissionsByUserAsync(string userId)
        {
            return await _context.Submissions
                .Where(s => s.UserId == userId)
                .Include(s => s.Project)
                .OrderByDescending(s => s.SubmittedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Submission>> GetPendingSubmissionsAsync()
        {
            return await _context.Submissions
                .Where(s => s.Status == "Pending")
                .Include(s => s.Project)
                .Include(s => s.User)
                .OrderBy(s => s.SubmittedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Submission>> GetSubmissionsByStatusAsync(string status)
        {
            return await _context.Submissions
                .Where(s => s.Status == status)
                .Include(s => s.Project)
                .Include(s => s.User)
                .ToListAsync();
        }

        public async Task<Submission?> GetSubmissionWithDetailsAsync(int id)
        {
            return await _context.Submissions
                .Include(s => s.Project)
                    .ThenInclude(p => p!.Team)
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<bool> HasUserSubmittedProjectAsync(int projectId, string userId)
        {
            return await _context.Submissions
                .AnyAsync(s => s.ProjectId == projectId && s.UserId == userId);
        }

        public async Task<int> GetSubmissionsCountAsync(int projectId)
        {
            return await _context.Submissions
                .CountAsync(s => s.ProjectId == projectId);
        }

        public async Task<double> GetAverageScoreAsync(int projectId)
        {
            var scores = await _context.Submissions
                .Where(s => s.ProjectId == projectId && s.Score.HasValue)
                .Select(s => s.Score.Value)
                .ToListAsync();

            return scores.Any() ? Math.Round(scores.Average(), 2) : 0;
        }

        public async Task<bool> SubmissionExistsAsync(int id)
        {
            return await _context.Submissions.AnyAsync(s => s.Id == id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}