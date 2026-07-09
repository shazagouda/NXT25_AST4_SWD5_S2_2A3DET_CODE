using Microsoft.AspNetCore.Http;

namespace A3DET_CODE.Services.Interfaces
{
    public interface IProfileImageStorageService
    {
        string DefaultProfileImageUrl { get; }

        Task<string> SaveProfileImageAsync(IFormFile profileImage, string? previousImageUrl = null);

        Task DeleteProfileImageAsync(string? profileImageUrl);
    }
}
