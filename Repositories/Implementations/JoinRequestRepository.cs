using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class JoinRequestRepository : IJoinRequestRepository
    {
        private readonly ApplicationDbContext _context;

        public JoinRequestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // ============================================================
        // Basic CRUD
        // ============================================================

        public async Task<JoinRequest?> GetByIdAsync(int id)
        {
            return await _context.JoinRequests
                .Include(jr => jr.User)
            .Include(jr => jr.Team)
                .FirstOrDefaultAsync(jr => jr.Id == id);
        }

        public async Task<IEnumerable<JoinRequest>> GetAllAsync()
        {
            return await _context.JoinRequests
                .Include(jr => jr.User)
            .Include(jr => jr.Team)
            .ToListAsync();
        }

        public async Task<JoinRequest> AddAsync(JoinRequest joinRequest)
        {
            await _context.JoinRequests.AddAsync(joinRequest);
            return joinRequest;
        }

        public async Task UpdateAsync(JoinRequest joinRequest)
        {
            _context.JoinRequests.Update(joinRequest);
        }

        public async Task DeleteAsync(int id)
        {
            var request = await _context.JoinRequests.FindAsync(id);
            if (request != null)
            {
                _context.JoinRequests.Remove(request);
            }
        }

        // ============================================================
        // Specific queries
        // ============================================================

        public async Task<IEnumerable<JoinRequest>> GetPendingRequestsByTeamIdAsync(int teamId)
        {
            return await _context.JoinRequests
                .Include(jr => jr.User)
                .Where(jr => jr.TeamId == teamId && jr.Status == "Pending")
            .OrderByDescending(jr => jr.RequestedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<JoinRequest>> GetRequestsByTeamIdAsync(int teamId)
        {
            return await _context.JoinRequests
                .Include(jr => jr.User)
                .Where(jr => jr.TeamId == teamId)
            .OrderByDescending(jr => jr.RequestedAt)
            .ToListAsync();
        }

        public async Task<IEnumerable<JoinRequest>> GetRequestsByUserIdAsync(string userId)
        {
            return await _context.JoinRequests
                .Include(jr => jr.Team)
                .Where(jr => jr.UserId == userId)
                .OrderByDescending(jr => jr.RequestedAt)
            .ToListAsync();
        }

        public async Task<IEnumerable<JoinRequest>> GetPendingRequestsByUserIdAsync(string userId)
        {
            return await _context.JoinRequests
                .Include(jr => jr.Team)
                .Where(jr => jr.UserId == userId && jr.Status == "Pending")
                .OrderByDescending(jr => jr.RequestedAt)
            .ToListAsync();
        }

        public async Task<JoinRequest?> GetRequestAsync(int teamId, string userId)
        {
            return await _context.JoinRequests
                .FirstOrDefaultAsync(jr => jr.TeamId == teamId && jr.UserId == userId);
        }

        public async Task<bool> HasPendingRequestAsync(int teamId, string userId)
        {
            return await _context.JoinRequests
                .AnyAsync(jr => jr.TeamId == teamId && jr.UserId == userId && jr.Status == "Pending");
        }

        public async Task<int> GetPendingCountByTeamIdAsync(int teamId)
        {
            return await _context.JoinRequests
                .CountAsync(jr => jr.TeamId == teamId && jr.Status == "Pending");
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
