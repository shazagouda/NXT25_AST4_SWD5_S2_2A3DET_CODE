namespace A3DET_CODE.ViewModels.Student
{
    public class StudentViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
        public string Initials { get; set; } = "S";
        public string University { get; set; } = "Not specified";
        public string Faculty { get; set; } = "Not specified";
        public string AcademicYear { get; set; } = "Not specified";
        public string EnrolledTrack { get; set; } = "No Track";
        public string Skills { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }

        public List<string> SkillList =>
            string.IsNullOrWhiteSpace(Skills)
                ? new List<string>()
                : Skills.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries)
                        .Select(s => s.Trim())
                        .Where(s => !string.IsNullOrEmpty(s))
                        .Take(4)
                        .ToList();
    }
}
