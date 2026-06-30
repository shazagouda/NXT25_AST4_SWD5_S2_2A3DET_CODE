namespace A3DET_CODE.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string Logo { get; set; } = string.Empty;
    }
}