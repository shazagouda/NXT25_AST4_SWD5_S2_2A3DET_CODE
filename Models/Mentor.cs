namespace A3DET_CODE.Models
{
    public class Mentor
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Initials { get; set; } = string.Empty;
        public string Expertise { get; set; } = string.Empty;
        public double Rating { get; set; }
        public bool IsVerified { get; set; }
    }
}