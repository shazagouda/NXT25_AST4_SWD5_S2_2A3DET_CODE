using A3DET_CODE.Models;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LeaderId { get; set; } = string.Empty;

    public int TrackId { get; set; }
    public int? ProjectId { get; set; }

    public DateTime CreatedAt { get; set; }

    public Track Track { get; set; } = null!;
    public Project? Project { get; set; }
    public ICollection<TeamMember> Members { get; set; } = new List<TeamMember>();
}