using A3DET_CODE.Models;
using Microsoft.AspNetCore.Identity.Data;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface IJoinRequestRepository
    {
        // Basic CRUD
        Task<JoinRequest?> GetByIdAsync(int id);
        Task<IEnumerable<JoinRequest>> GetAllAsync();
        Task<JoinRequest> AddAsync(JoinRequest joinRequest);
        Task UpdateAsync(JoinRequest joinRequest);
        Task DeleteAsync(int id);

        // Specific queries
        Task<IEnumerable<JoinRequest>> GetPendingRequestsByTeamIdAsync(int teamId);
        Task<IEnumerable<JoinRequest>> GetRequestsByTeamIdAsync(int teamId);
        Task<IEnumerable<JoinRequest>> GetRequestsByUserIdAsync(string userId);
        Task<IEnumerable<JoinRequest>> GetPendingRequestsByUserIdAsync(string userId);
        Task<JoinRequest?> GetRequestAsync(int teamId, string userId);
        Task<bool> HasPendingRequestAsync(int teamId, string userId);
        Task<int> GetPendingCountByTeamIdAsync(int teamId);
        Task<bool> SaveChangesAsync();
    }

}
