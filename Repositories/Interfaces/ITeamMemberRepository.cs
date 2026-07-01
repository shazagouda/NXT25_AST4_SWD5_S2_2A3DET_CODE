using A3DET_CODE.Models;
using Task = System.Threading.Tasks.Task;

namespace A3DET_CODE.Repositories.Interfaces
{
    public interface ITeamMemberRepository
    {
        Task<TeamMember?> GetByIdAsync(int id);
        Task<IEnumerable<TeamMember>> GetByTeamIdAsync(int teamId);
        Task<IEnumerable<TeamMember>> GetByUserIdAsync(string userId);
        Task<TeamMember> AddAsync(TeamMember teamMember);
        Task RemoveAsync(TeamMember teamMember);
        Task<TeamMember?> GetAsync(int teamId, string userId);
        Task<bool> ExistsAsync(int teamId, string userId);
        Task<int> CountByTeamIdAsync(int teamId);
    }
}