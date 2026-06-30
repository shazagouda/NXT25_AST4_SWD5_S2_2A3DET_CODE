namespace A3DET_CODE.Models
{
    public class PortfolioProject
    {
        public int Id { get; set; }
        public int PortfolioId { get; set; }
        public int ProjectId { get; set; }
        public string? UserRole { get; set; }
        public string? Description { get; set; }

        public Portfolio Portfolio { get; set; } = null!;
        public Project Project { get; set; } = null!;
    }
}