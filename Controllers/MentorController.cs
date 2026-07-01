using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Mentor;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class MentorController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public MentorController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // ============================================================
        // 1. PUBLIC PAGES (No authentication required)
        // ============================================================

        // GET: List all mentors
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index(string? search, string? expertise, string? sort, int page = 1)
        {
            var query = _context.Mentors
                .Include(m => m.User)
                .AsQueryable();

            // Search filter
            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(m =>
                    m.FullName.ToLower().Contains(searchLower) ||
                    m.Expertise.ToLower().Contains(searchLower) ||
                    (m.User.Skills != null && m.User.Skills.ToLower().Contains(searchLower))
                );
            }

            // Expertise filter
            if (!string.IsNullOrEmpty(expertise) && expertise != "all")
            {
                var expertiseLower = expertise.ToLower();
                query = query.Where(m => m.Expertise.ToLower().Contains(expertiseLower));
            }

            // Sort
            query = sort switch
            {
                "sessions" => query.OrderByDescending(m => m.TotalSessions),
                "experience" => query.OrderByDescending(m => m.YearsOfExperience),
                _ => query.OrderByDescending(m => m.Rating) // default: highest rated
            };

            // Pagination
            int pageSize = 12;
            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var mentors = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var viewModel = new MentorPagedViewModel
            {
                Mentors = mentors.Select(m => new MentorViewModel
                {
                    Id = m.Id,
                    FullName = m.FullName,
                    Initials = m.Initials,
                    Expertise = m.Expertise,
                    Rating = m.Rating,
                    IsVerified = m.IsVerified,
                    Bio = m.Bio,
                    YearsOfExperience = m.YearsOfExperience,
                    TotalSessions = m.TotalSessions,
                    Skills = m.User.Skills ?? string.Empty
                }).ToList(),
                CurrentPage = page,
                TotalPages = totalPages,
                TotalCount = totalCount,
                PageSize = pageSize,
                SearchTerm = search,
                Expertise = expertise,
                SortBy = sort
            };

            ViewBag.ExpertiseList = new List<string>
            {
                "Frontend Development",
                "Backend Development",
                "AI & Machine Learning",
                "Data Science",
                "Mobile Development",
                "DevOps",
                "Cybersecurity",
                "Game Development",
                "Embedded Systems",
                "Software Testing",
                "Full-Stack Development"
            };

            return View(viewModel);
        }

        // GET: Mentor Details
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var mentor = await _context.Mentors
                .Include(m => m.User)
                .Include(m => m.Sessions)
                .ThenInclude(s => s.Student)
                .Include(m => m.Mentees)
                .ThenInclude(mm => mm.Student)
                .Include(m => m.Projects)
                .Include(m => m.Teams)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (mentor == null)
                return NotFound();

            var viewModel = new MentorDetailViewModel
            {
                Id = mentor.Id,
                FullName = mentor.FullName,
                Initials = mentor.Initials,
                Expertise = mentor.Expertise,
                Rating = mentor.Rating,
                IsVerified = mentor.IsVerified,
                Bio = mentor.Bio,
                LinkedInUrl = mentor.LinkedInUrl,
                GitHubUrl = mentor.GitHubUrl,
                YearsOfExperience = mentor.YearsOfExperience,
                TotalSessions = mentor.TotalSessions,
                Skills = mentor.User.Skills ?? string.Empty,
                Email = mentor.User.Email,
                CreatedAt = mentor.User.CreatedAt,
                ActiveMenteesCount = mentor.Mentees.Count(mm => mm.IsActive),
                ProjectsCount = mentor.Projects.Count,
                TeamsCount = mentor.Teams.Count,
                RecentSessions = mentor.Sessions
                    .OrderByDescending(s => s.ScheduledAt)
                    .Take(5)
                    .Select(s => new SessionSummaryViewModel
                    {
                        Id = s.Id,
                        StudentName = s.Student?.FullName ?? "Unknown",
                        ScheduledAt = s.ScheduledAt,
                        Topic = s.Topic ?? "General",
                        IsCompleted = s.IsCompleted,
                        IsConfirmed = s.IsConfirmed,
                        DurationMinutes = s.DurationMinutes,
                        StudentRating = s.StudentRating
                    }).ToList()
            };

            return View(viewModel);
        }

        // ============================================================
        // 2. MENTOR DASHBOARD (Authenticated)
        // ============================================================

        // GET: Mentor Dashboard
        [HttpGet]
        public async Task<IActionResult> Dashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            // Load related data
            await _context.Entry(mentor)
                .Collection(m => m.Sessions)
                .Query()
                .Include(s => s.Student)
                .LoadAsync();

            await _context.Entry(mentor)
                .Collection(m => m.Mentees)
                .Query()
                .Include(mm => mm.Student)
                .Where(mm => mm.IsActive)
                .LoadAsync();

            await _context.Entry(mentor)
                .Collection(m => m.Projects)
                .Query()
                .Take(5)
                .LoadAsync();

            var upcomingSessions = mentor.Sessions
                .Where(s => !s.IsCompleted && s.ScheduledAt > DateTime.Now)
                .OrderBy(s => s.ScheduledAt)
                .Take(5)
                .ToList();

            var recentSessions = mentor.Sessions
                .Where(s => s.IsCompleted)
                .OrderByDescending(s => s.ScheduledAt)
                .Take(5)
                .ToList();

            var completedSessions = mentor.Sessions.Count(s => s.IsCompleted);
            var totalSessions = mentor.Sessions.Count;
            var completionRate = totalSessions > 0 ? (double)completedSessions / totalSessions * 100 : 0;

            var viewModel = new MentorDashboardViewModel
            {
                MentorId = mentor.Id,
                FullName = mentor.FullName,
                Expertise = mentor.Expertise,
                Rating = mentor.Rating,
                Bio = mentor.Bio,
                TotalSessions = totalSessions,
                ActiveMentees = mentor.Mentees.Count(mm => mm.IsActive),
                TotalProjects = mentor.Projects.Count,
                TotalTeams = mentor.Teams.Count,
                PendingSessions = mentor.Sessions.Count(s => !s.IsConfirmed && !s.IsCompleted),
                CompletedSessions = completedSessions,
                CompletionRate = completionRate,
                UpcomingSessions = upcomingSessions.Select(s => new SessionSummaryViewModel
                {
                    Id = s.Id,
                    StudentName = s.Student?.FullName ?? "Unknown",
                    ScheduledAt = s.ScheduledAt,
                    Topic = s.Topic ?? "General",
                    IsCompleted = s.IsCompleted,
                    IsConfirmed = s.IsConfirmed,
                    DurationMinutes = s.DurationMinutes
                }).ToList(),
                RecentSessions = recentSessions.Select(s => new SessionSummaryViewModel
                {
                    Id = s.Id,
                    StudentName = s.Student?.FullName ?? "Unknown",
                    ScheduledAt = s.ScheduledAt,
                    Topic = s.Topic ?? "General",
                    IsCompleted = s.IsCompleted,
                    IsConfirmed = s.IsConfirmed,
                    DurationMinutes = s.DurationMinutes,
                    StudentRating = s.StudentRating
                }).ToList(),
                ActiveMenteesList = mentor.Mentees
                    .Where(mm => mm.IsActive)
                    .Select(mm => new MenteeSummaryViewModel
                    {
                        StudentId = mm.StudentId,
                        StudentName = mm.Student?.FullName ?? "Unknown",
                        AssignedAt = mm.AssignedAt,
                        IsActive = mm.IsActive
                    }).ToList(),
                RecentProjects = mentor.Projects
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(5)
                    .Select(p => new ProjectSummaryViewModel
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Description = p.Description,
                        TechStack = p.TechStack,
                        Status = p.Status,
                        CreatedAt = p.CreatedAt
                    }).ToList()
            };

            return View(viewModel);
        }

        // GET: My Sessions
        [HttpGet]
        public async Task<IActionResult> MySessions()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            await _context.Entry(mentor)
                .Collection(m => m.Sessions)
                .Query()
                .Include(s => s.Student)
                .OrderByDescending(s => s.ScheduledAt)
                .LoadAsync();

            var viewModel = mentor.Sessions.Select(s => new SessionViewModel
            {
                Id = s.Id,
                StudentName = s.Student?.FullName ?? "Unknown",
                StudentEmail = s.Student?.Email,
                ScheduledAt = s.ScheduledAt,
                DurationMinutes = s.DurationMinutes,
                Topic = s.Topic ?? "General",
                Notes = s.Notes,
                IsConfirmed = s.IsConfirmed,
                IsCompleted = s.IsCompleted,
                StudentRating = s.StudentRating,
                StudentFeedback = s.StudentFeedback,
                MentorRating = s.MentorRating,
                MentorFeedback = s.MentorFeedback,
                CreatedAt = s.CreatedAt,
                CompletedAt = s.CompletedAt
            }).ToList();

            return View(viewModel);
        }

        // POST: Confirm Session
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ConfirmSession(int id)
        {
            var session = await _context.MentorSessions
                .Include(s => s.Mentor)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                return NotFound();

            // Verify current user is the mentor
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            if (session.Mentor.UserId != user.Id)
                return Forbid();

            session.IsConfirmed = true;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Session confirmed successfully!";
            return RedirectToAction(nameof(MySessions));
        }

        // POST: Complete Session
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CompleteSession(int id)
        {
            var session = await _context.MentorSessions
                .Include(s => s.Mentor)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (session == null)
                return NotFound();

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            if (session.Mentor.UserId != user.Id)
                return Forbid();

            session.IsCompleted = true;
            session.CompletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Session marked as completed!";
            return RedirectToAction(nameof(MySessions));
        }

        // GET: My Projects
        [HttpGet]
        public async Task<IActionResult> MyProjects()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            await _context.Entry(mentor)
                .Collection(m => m.Projects)
                .Query()
                .Include(p => p.Track)
                .OrderByDescending(p => p.CreatedAt)
                .LoadAsync();

            var viewModel = mentor.Projects.Select(p => new ProjectSummaryViewModel
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                TechStack = p.TechStack,
                Status = p.Status,
                TrackName = p.Track?.Name ?? "Unknown",
                CreatedAt = p.CreatedAt
            }).ToList();

            return View(viewModel);
        }

        // GET: Edit Mentor Profile
        [HttpGet]
        public async Task<IActionResult> EditProfile()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            var viewModel = new MentorEditViewModel
            {
                FullName = mentor.FullName,
                Expertise = mentor.Expertise,
                Bio = mentor.Bio,
                LinkedInUrl = mentor.LinkedInUrl,
                GitHubUrl = mentor.GitHubUrl,
                YearsOfExperience = mentor.YearsOfExperience,
                Skills = user.Skills ?? string.Empty,
                Email = user.Email,
                IsVerified = mentor.IsVerified
            };

            return View(viewModel);
        }

        // POST: Edit Mentor Profile
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditProfile(MentorEditViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            // Update mentor
            mentor.FullName = model.FullName;
            mentor.Expertise = model.Expertise;
            mentor.Bio = model.Bio;
            mentor.LinkedInUrl = model.LinkedInUrl;
            mentor.GitHubUrl = model.GitHubUrl;
            mentor.YearsOfExperience = model.YearsOfExperience;

            // Update user
            user.Skills = model.Skills;

            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Profile updated successfully!";
            return RedirectToAction(nameof(Dashboard));
        }

        // GET: Mentor Reviews
        [HttpGet]
        public async Task<IActionResult> Reviews()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            await _context.Entry(mentor)
                .Collection(m => m.Sessions)
                .Query()
                .Where(s => s.StudentRating.HasValue && s.IsCompleted)
                .Include(s => s.Student)
                .OrderByDescending(s => s.CompletedAt)
                .LoadAsync();

            var viewModel = mentor.Sessions
                .Where(s => s.StudentRating.HasValue)
                .Select(s => new MentorReviewViewModel
                {
                    Id = s.Id,
                    StudentName = s.Student?.FullName ?? "Unknown",
                    Rating = s.StudentRating ?? 0,
                    Comment = s.StudentFeedback,
                    CreatedAt = s.CompletedAt ?? s.CreatedAt,
                    SessionTopic = s.Topic ?? "General"
                }).ToList();

            return View(viewModel);
        }

        // GET: My Mentees
        [HttpGet]
        public async Task<IActionResult> MyMentees()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var mentor = await GetMentorByUserId(user.Id);
            if (mentor == null)
                return RedirectToAction("Index", "Home");

            await _context.Entry(mentor)
                .Collection(m => m.Mentees)
                .Query()
                .Include(mm => mm.Student)
                .OrderByDescending(mm => mm.AssignedAt)
                .LoadAsync();

            var viewModel = mentor.Mentees.Select(mm => new MenteeSummaryViewModel
            {
                StudentId = mm.StudentId,
                StudentName = mm.Student?.FullName ?? "Unknown",
                AssignedAt = mm.AssignedAt,
                IsActive = mm.IsActive
            }).ToList();

            return View(viewModel);
        }

        // ============================================================
        // 3. HELPER METHODS
        // ============================================================

        private async Task<Mentor?> GetMentorByUserId(string userId)
        {
            return await _context.Mentors
                .FirstOrDefaultAsync(m => m.UserId == userId);
        }

        private async Task<bool> IsUserMentor(string userId)
        {
            return await _context.Mentors.AnyAsync(m => m.UserId == userId);
        }
    }
}