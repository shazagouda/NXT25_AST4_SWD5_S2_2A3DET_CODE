using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.ViewModels.Student;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class StudentsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public StudentsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // ============================================================
        // GET: /Students — Student Directory (accessible to all logged-in users)
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> Index(
            string? search,
            string? university,
            string? track,
            string? academicYear,
            int page = 1)
        {
            // ─── Base query: only Students ──────────────────────────
            var query = _context.Users
                .Where(u => u.Role == "Student" && u.IsActive)
                .AsQueryable();

            // ─── Search by username or full name ─────────────────────
            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                query = query.Where(u =>
                    (u.UserName != null && u.UserName.ToLower().Contains(s)) ||
                    u.FullName.ToLower().Contains(s));
            }

            // ─── University filter ────────────────────────────────────
            if (!string.IsNullOrWhiteSpace(university) && university != "all")
                query = query.Where(u => u.University != null && u.University == university);

            // ─── Academic Year filter ─────────────────────────────────
            if (!string.IsNullOrWhiteSpace(academicYear) && academicYear != "all")
                query = query.Where(u => u.AcademicYear != null && u.AcademicYear == academicYear);

            // ─── Track filter (resolve via TeamMember or AssessmentResult) ─
            // First materialise IDs that match the track, then filter
            if (!string.IsNullOrWhiteSpace(track) && track != "all")
            {
                // User IDs enrolled in that track via a Team
                var teamTrackIds = await _context.TeamMembers
                    .Where(tm => tm.Team.Track.Name == track)
                    .Select(tm => tm.UserId)
                    .Distinct()
                    .ToListAsync();

                // User IDs enrolled via AssessmentResult (only those not already in team track)
                var assessmentTrackIds = await _context.AssessmentResults
                    .Where(ar => ar.Track.Name == track && !teamTrackIds.Contains(ar.UserId))
                    .Select(ar => ar.UserId)
                    .Distinct()
                    .ToListAsync();

                var allTrackIds = teamTrackIds.Union(assessmentTrackIds).ToList();
                query = query.Where(u => allTrackIds.Contains(u.Id));
            }

            // ─── Sort alphabetically by full name ────────────────────
            query = query.OrderBy(u => u.FullName);

            // ─── Pagination ───────────────────────────────────────────
            int pageSize = 12;
            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            page = Math.Max(1, Math.Min(page, Math.Max(1, totalPages)));

            var rawStudents = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // ─── Resolve enrolled track for each student ──────────────
            // Build lookup from TeamMembers to avoid N+1
            var studentIds = rawStudents.Select(u => u.Id).ToList();

            var teamTrackMap = await _context.TeamMembers
                .Where(tm => studentIds.Contains(tm.UserId) && tm.Team.Track != null)
                .Select(tm => new { tm.UserId, TrackName = tm.Team.Track.Name })
                .GroupBy(x => x.UserId)
                .Select(g => new { UserId = g.Key, TrackName = g.First().TrackName })
                .ToDictionaryAsync(x => x.UserId, x => x.TrackName);

            var assessTrackMap = await _context.AssessmentResults
                .Where(ar => studentIds.Contains(ar.UserId) && ar.Track != null)
                .OrderByDescending(ar => ar.CompletedAt)
                .Select(ar => new { ar.UserId, TrackName = ar.Track.Name })
                .GroupBy(x => x.UserId)
                .Select(g => new { UserId = g.Key, TrackName = g.First().TrackName })
                .ToDictionaryAsync(x => x.UserId, x => x.TrackName);

            var students = rawStudents.Select(u =>
            {
                teamTrackMap.TryGetValue(u.Id, out var tTrack);
                if (string.IsNullOrEmpty(tTrack))
                    assessTrackMap.TryGetValue(u.Id, out tTrack);

                return new StudentViewModel
                {
                    Id = u.Id,
                    Username = u.UserName ?? u.Email ?? "unknown",
                    FullName = u.FullName,
                    ProfileImageUrl = u.ProfileImageUrl,
                    Initials = GetInitials(u.FullName),
                    University = u.University ?? "Not specified",
                    Faculty = u.Faculty ?? "Not specified",
                    AcademicYear = u.AcademicYear ?? "Not specified",
                    EnrolledTrack = tTrack ?? "No Track",
                    Skills = u.Skills ?? string.Empty,
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                };
            }).ToList();

            // ─── Filter option lists ──────────────────────────────────
            // All Egyptian universities (hardcoded + merged with any extra values in DB)
            var egyptianUniversities = new List<string>
            {
                // Government universities
                "Cairo University",
                "Ain Shams University",
                "Alexandria University",
                "Tanta University",
                "Mansoura University",
                "Assiut University",
                "Minia University",
                "Sohag University",
                "Al-Azhar University",
                "Helwan University",
                "Benha University",
                "Zagazig University",
                "Damietta University",
                "Kafrelsheikh University",
                "Port Said University",
                "Suez University",
                "Suez Canal University",
                "Aswan University",
                "South Valley University",
                "Fayoum University",
                "Beni-Suef University",
                "Luxor University",
                "Matrouh University",
                "New Valley University",
                "Arish University",
                // Private / International universities
                "American University in Cairo (AUC)",
                "Nile University",
                "Misr University for Science and Technology (MUST)",
                "Modern Sciences and Arts University (MSA)",
                "Sinai University",
                "Pharos University",
                "Delta University",
                "Future University in Egypt (FUE)",
                "Ahram Canadian University (ACU)",
                "Badr University",
                "Zewail City of Science and Technology",
                "Arab Open University",
                "Canadian International College (CIC)",
                "German University in Cairo (GUC)",
                "British University in Egypt (BUE)",
                "French University in Egypt (UFE)",
                "Misr International University (MIU)",
                "October 6 University",
                "Modern Academy",
                "Arab Academy for Science, Technology & Maritime Transport"
            };

            // Merge with any extra universities students entered that aren't in the list
            var dbUniversities = await _context.Users
                .Where(u => u.Role == "Student" && u.IsActive && !string.IsNullOrEmpty(u.University))
                .Select(u => u.University!)
                .Distinct()
                .ToListAsync();

            var universityList = egyptianUniversities
                .Union(dbUniversities)
                .OrderBy(x => x)
                .ToList();

            // Academic years: Year 1 → Year 5 (Year 5 for Engineering etc.)
            var academicYearList = new List<string> { "Year 1", "Year 2", "Year 3", "Year 4", "Year 5" };

            // Merge with any extra year values in DB
            var dbYears = await _context.Users
                .Where(u => u.Role == "Student" && u.IsActive && !string.IsNullOrEmpty(u.AcademicYear))
                .Select(u => u.AcademicYear!)
                .Distinct()
                .ToListAsync();

            academicYearList = academicYearList.Union(dbYears).OrderBy(x => x).ToList();

            var trackList = await _context.Tracks
                .Select(t => t.Name)
                .OrderBy(n => n)
                .ToListAsync();

            // ─── Build ViewModel ──────────────────────────────────────
            var viewModel = new StudentPagedViewModel
            {
                Students = students,
                CurrentPage = page,
                TotalPages = totalPages,
                TotalCount = totalCount,
                PageSize = pageSize,
                SearchTerm = search,
                University = university,
                Track = track,
                AcademicYear = academicYear,
                UniversityList = universityList,
                TrackList = trackList,
                AcademicYearList = academicYearList
            };

            return View(viewModel);
        }

        // ─── Helper ──────────────────────────────────────────────────
        private static string GetInitials(string fullName)
        {
            if (string.IsNullOrWhiteSpace(fullName)) return "S";
            var parts = fullName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            return parts.Length == 1
                ? parts[0][0].ToString().ToUpper()
                : (parts[0][0].ToString() + parts[^1][0].ToString()).ToUpper();
        }
    }
}
