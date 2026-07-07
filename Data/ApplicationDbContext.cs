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

        // ====== DbSets ======
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
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<EntryAssessment> EntryAssessments { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Hiring> Hirings { get; set; }

        // ✅ Mentor System - DbSets الجديدة
        public DbSet<MentorSession> MentorSessions { get; set; }
        public DbSet<MentorMentee> MentorMentees { get; set; }

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

            modelBuilder.Entity<Application>()
                .HasOne(a => a.Project)
                .WithMany(p => p.Applications)
                .HasForeignKey(a => a.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Application>()
                .HasOne(a => a.Applicant)
                .WithMany(u => u.Applications)
                .HasForeignKey(a => a.ApplicantId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hiring>()
                .HasOne(h => h.Application)
                .WithOne(a => a.Hiring)
                .HasForeignKey<Hiring>(h => h.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Hiring>()
                .HasOne(h => h.Company)
                .WithMany(u => u.CompanyHirings)
                .HasForeignKey(h => h.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hiring>()
                .HasOne(h => h.Student)
                .WithMany(u => u.StudentHirings)
                .HasForeignKey(h => h.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Project>()
               .HasOne(p => p.Client)
               .WithMany()
               .HasForeignKey(p => p.ClientId)
               .OnDelete(DeleteBehavior.Restrict);

            // Task -> Project
            modelBuilder.Entity<Task>()
                .HasOne(t => t.Project)
                .WithMany(p => p.Tasks)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Task -> Assigned User
            modelBuilder.Entity<Task>()
                .HasOne(t => t.AssignedTo)
                .WithMany()
                .HasForeignKey(t => t.AssignedToId)
                .OnDelete(DeleteBehavior.Restrict);

            // Submission -> Project
            modelBuilder.Entity<Submission>()
                .HasOne(s => s.Project)
                .WithMany(p => p.Submissions)
                .HasForeignKey(s => s.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Submission -> User
            modelBuilder.Entity<Submission>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // EntryAssessment -> User
            modelBuilder.Entity<EntryAssessment>()
                .HasOne(ea => ea.User)
                .WithMany()
                .HasForeignKey(ea => ea.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            // 1. Mentor -> ApplicationUser
            modelBuilder.Entity<Mentor>()
                .HasOne(m => m.User)
                .WithMany() // User مش عنده ICollection<Mentor>، فـ WithMany فاضية
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Restrict); // ✅ Restrict بدل Cascade (تجنب Cascade Cycles)

            // 2. MentorSession -> Mentor
            modelBuilder.Entity<MentorSession>()
                .HasOne(ms => ms.Mentor)
                .WithMany(m => m.Sessions)
                .HasForeignKey(ms => ms.MentorId)
                .OnDelete(DeleteBehavior.Cascade);

            // 3. MentorSession -> Student (ApplicationUser)
            modelBuilder.Entity<MentorSession>()
                .HasOne(ms => ms.Student)
                .WithMany() // User مش عنده ICollection<MentorSession>
                .HasForeignKey(ms => ms.StudentId)
                .OnDelete(DeleteBehavior.Restrict); // ✅ Restrict

            // 4. MentorMentee -> Mentor
            modelBuilder.Entity<MentorMentee>()
                .HasOne(mm => mm.Mentor)
                .WithMany(m => m.Mentees)
                .HasForeignKey(mm => mm.MentorId)
                .OnDelete(DeleteBehavior.Cascade);

            // 5. MentorMentee -> Student (ApplicationUser)
            modelBuilder.Entity<MentorMentee>()
                .HasOne(mm => mm.Student)
                .WithMany() 
                .HasForeignKey(mm => mm.StudentId)
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}