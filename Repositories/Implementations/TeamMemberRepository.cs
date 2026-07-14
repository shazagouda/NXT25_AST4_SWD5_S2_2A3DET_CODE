using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Implementations
{
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly ApplicationDbContext _context;

        public TeamMemberRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TeamMember?> GetByIdAsync(int id)
        {
            return await _context.TeamMembers.FindAsync(id);
        }

        public async Task<IEnumerable<TeamMember>> GetByTeamIdAsync(int teamId)
        {
            return await _context.TeamMembers
                .Where(tm => tm.TeamId == teamId)
                .Include(tm => tm.User)
                .ToListAsync();
        }

        public async Task<IEnumerable<TeamMember>> GetByUserIdAsync(string userId)
        {
            return await _context.TeamMembers
                .Where(tm => tm.UserId == userId)
                .Include(tm => tm.Team)
                .ToListAsync();
        }

        public async Task<TeamMember> AddAsync(TeamMember teamMember)
        {
            await _context.TeamMembers.AddAsync(teamMember);
            return teamMember;
        }

        public async Task RemoveAsync(TeamMember teamMember)
        {
            _context.TeamMembers.Remove(teamMember);
            await Task.CompletedTask;
        }

        public async Task<TeamMember?> GetAsync(int teamId, string userId)
        {
            return await _context.TeamMembers
                .FirstOrDefaultAsync(tm => tm.TeamId == teamId && tm.UserId == userId);
        }

        public async Task<bool> ExistsAsync(int teamId, string userId)
        {
            return await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == teamId && tm.UserId == userId);
        }

        public async Task<int> CountByTeamIdAsync(int teamId)
        {
            return await _context.TeamMembers
                .CountAsync(tm => tm.TeamId == teamId);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}