using A3DET_CODE.Services.Interfaces;

namespace A3DET_CODE.Services.Implementations
{
    public class LocalFileProfileImageStorageService : IProfileImageStorageService
    {
        private const long MaxFileSize = 5 * 1024 * 1024;
        private const string UploadsRequestPath = "/uploads/profile-images";
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        };

        private readonly IWebHostEnvironment _environment;

        public LocalFileProfileImageStorageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public string DefaultProfileImageUrl => "/images/default-avatar.png";

        public async Task<string> SaveProfileImageAsync(IFormFile profileImage, string? previousImageUrl = null)
        {
            if (profileImage.Length <= 0)
                throw new InvalidOperationException("Please choose a profile image.");

            if (profileImage.Length > MaxFileSize)
                throw new InvalidOperationException("Profile image must be 5 MB or smaller.");

            var extension = Path.GetExtension(profileImage.FileName);
            if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
                throw new InvalidOperationException("Only .jpg, .jpeg, .png, and .webp profile images are allowed.");

            var uploadRoot = Path.Combine(_environment.WebRootPath, "uploads", "profile-images");
            Directory.CreateDirectory(uploadRoot);

            var fileName = $"{Guid.NewGuid()}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(uploadRoot, fileName);

            await using (var stream = new FileStream(filePath, FileMode.CreateNew))
            {
                await profileImage.CopyToAsync(stream);
            }

            await DeleteProfileImageAsync(previousImageUrl);

            return $"{UploadsRequestPath}/{fileName}";
        }

        public Task DeleteProfileImageAsync(string? profileImageUrl)
        {
            if (string.IsNullOrWhiteSpace(profileImageUrl) ||
                profileImageUrl.Equals(DefaultProfileImageUrl, StringComparison.OrdinalIgnoreCase) ||
                !profileImageUrl.StartsWith($"{UploadsRequestPath}/", StringComparison.OrdinalIgnoreCase))
            {
                return Task.CompletedTask;
            }

            var relativePath = profileImageUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            var filePath = Path.GetFullPath(Path.Combine(_environment.WebRootPath, relativePath));
            var uploadRoot = Path.GetFullPath(Path.Combine(_environment.WebRootPath, "uploads", "profile-images"));

            if (filePath.StartsWith(uploadRoot, StringComparison.OrdinalIgnoreCase) && File.Exists(filePath))
                File.Delete(filePath);

            return Task.CompletedTask;
        }
    }
}
