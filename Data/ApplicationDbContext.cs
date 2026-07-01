
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Models;
using Task = A3DET_CODE.Models.Task;

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

        // ---------------------------------- Member 3 ------------------------------------
		public DbSet<Task> Tasks { get; set; }             
		public DbSet<Submission> Submissions { get; set; }   
		public DbSet<EntryAssessment> EntryAssessments { get; set; }

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

			// ================================================================
			// ?? NEW CONFIGURATIONS for Member 3
			// ================================================================

			// 16. Project -> Team (one-to-one relationship)
			//modelBuilder.Entity<Project>()
			//	.HasOne(p => p.Team)
			//	.WithOne(t => t.Project)
			//	.HasForeignKey<Project>(p => p.TeamId)
			//	.OnDelete(DeleteBehavior.SetNull);

			// 17. Project -> ApplicationUser (Client/Company)
			modelBuilder.Entity<Project>()
				.HasOne(p => p.Client)
				.WithMany()
				.HasForeignKey(p => p.ClientId)
				.OnDelete(DeleteBehavior.Restrict);

			// 18. Task -> Project
			modelBuilder.Entity<Task>()
				.HasOne(t => t.Project)
				.WithMany(p => p.Tasks)
				.HasForeignKey(t => t.ProjectId)
				.OnDelete(DeleteBehavior.Cascade);

			// 19. Task -> ApplicationUser (Assigned To)
			modelBuilder.Entity<Task>()
				.HasOne(t => t.AssignedTo)
				.WithMany()
				.HasForeignKey(t => t.AssignedToId)
				.OnDelete(DeleteBehavior.Restrict);

			// 20. Submission -> Project
			modelBuilder.Entity<Submission>()
				.HasOne(s => s.Project)
				.WithMany(p => p.Submissions)
				.HasForeignKey(s => s.ProjectId)
				.OnDelete(DeleteBehavior.Cascade);

			// 21. Submission -> ApplicationUser
			modelBuilder.Entity<Submission>()
				.HasOne(s => s.User)
				.WithMany()
				.HasForeignKey(s => s.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			// 22. EntryAssessment -> ApplicationUser
			modelBuilder.Entity<EntryAssessment>()
				.HasOne(ea => ea.User)
				.WithMany()
				.HasForeignKey(ea => ea.UserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
    }
}