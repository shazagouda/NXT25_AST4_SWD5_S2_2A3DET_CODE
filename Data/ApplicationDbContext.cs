
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Models;

namespace A3DET_CODE.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Track> Tracks { get; set; }
        public DbSet<Mentor> Mentors { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<AssessmentQuestion> AssessmentQuestions { get; set; }
        public DbSet<AssessmentResult> AssessmentResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Track)
                .WithMany(tr => tr.Teams)
                .HasForeignKey(t => t.TrackId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Project)
                .WithMany(p => p.Teams)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Project>()
                .HasOne(p => p.Track)
                .WithMany(t => t.Projects)
                .HasForeignKey(p => p.TrackId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(tm => tm.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.User)
                .WithMany(u => u.TeamMemberships)
                .HasForeignKey(tm => tm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Portfolio>()
                .HasOne(p => p.User)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PortfolioProject>()
                .HasOne(pp => pp.Portfolio)
                .WithMany(p => p.Projects)
                .HasForeignKey(pp => pp.PortfolioId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PortfolioProject>()
                .HasOne(pp => pp.Project)
                .WithMany(p => p.PortfolioProjects)
                .HasForeignKey(pp => pp.ProjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserBadges)
                .HasForeignKey(ub => ub.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.Badge)
                .WithMany(b => b.UserBadges)
                .HasForeignKey(ub => ub.BadgeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Evaluation>()
                .HasOne(e => e.User)
                .WithMany(u => u.Evaluations)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Evaluation>()
                .HasOne(e => e.Project)
                .WithMany(p => p.Evaluations)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentResult>()
                .HasOne(ar => ar.User)
                .WithMany(u => u.AssessmentResults)
                .HasForeignKey(ar => ar.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentResult>()
                .HasOne(ar => ar.Track)
                .WithMany(t => t.AssessmentResults)
                .HasForeignKey(ar => ar.TrackId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AssessmentQuestion>()
                .HasOne(aq => aq.Track)
                .WithMany(t => t.AssessmentQuestions)
                .HasForeignKey(aq => aq.TrackId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}