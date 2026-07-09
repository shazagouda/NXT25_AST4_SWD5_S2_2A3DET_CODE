namespace A3DET_CODE.ViewModels.Company
{
    public class CompanyViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
        public string Industry { get; set; } = string.Empty;
        public string CompanyDescription { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public string Initials { get; set; } = string.Empty;
    }
}