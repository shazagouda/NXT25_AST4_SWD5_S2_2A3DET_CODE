using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace A3DET_CODE.Repositories.Implementations
{
    public class TrackRepository : ITrackRepository
    {
        private readonly ApplicationDbContext _context;

        public TrackRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Track?> GetByIdAsync(int id)
        {
            return await _context.Tracks
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<Track>> GetAllAsync()
        {
            return await _context.Tracks
                .OrderBy(t => t.Name)
                .ToListAsync();
        }

        public async Task<bool> TrackExistsAsync(int id)
        {
            return await _context.Tracks
                .AnyAsync(t => t.Id == id);
        }
    }
}
