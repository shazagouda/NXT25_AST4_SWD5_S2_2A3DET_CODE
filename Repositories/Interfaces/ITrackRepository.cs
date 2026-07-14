using A3DET_CODE.Models;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface ITrackRepository
    {
        Task<Track?> GetByIdAsync(int id);
        Task<IEnumerable<Track>> GetAllAsync();
        Task<bool> TrackExistsAsync(int id);
    }
}
