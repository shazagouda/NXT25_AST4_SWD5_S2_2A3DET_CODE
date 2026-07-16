using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Models;
using A3DET_CODE.Data;
using A3DET_CODE.Services.Interfaces;
using A3DET_CODE.ViewModels.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task; // ✅ حل مشكلة الـ ambiguous

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IProfileImageStorageService _profileImageStorageService;

        public ProfileController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            IProfileImageStorageService profileImageStorageService)
        {
            _userManager = userManager;
            _context = context;
            _profileImageStorageService = profileImageStorageService;
        }

        // ============================================================
        // ✅ INDEX (Profile View)
        // ============================================================
        public async Task<IActionResult> Index(string? id)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
                return RedirectToAction("Login", "Account");

            var targetUserId = string.IsNullOrEmpty(id) ? currentUser.Id : id;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == targetUserId);
            if (user == null)
                return NotFound();

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";
            bool isOwnProfile = (currentUser.Id == targetUserId);

            // Admin: redirect to admin dashboard when viewing own profile
            if (isOwnProfile && role == "Admin")
                return RedirectToAction("Dashboard", "Admin");

            // 🔹 Fetch portfolio
            var portfolio = await _context.Portfolios
                .Include(p => p.Projects)
                    .ThenInclude(pp => pp.Project)
                .FirstOrDefaultAsync(p => p.UserId == targetUserId);

            if (portfolio == null && isOwnProfile)
            {
                portfolio = new Portfolio
                {
                    UserId = targetUserId,
                    Bio = user.CompanyDescription ?? string.Empty,
                    Skills = user.Skills ?? string.Empty,
                    GitHubUrl = string.Empty,
                    LinkedInUrl = user.LinkedInUrl ?? string.Empty,
                    ProfileStrength = 70,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Portfolios.Add(portfolio);
                await _context.SaveChangesAsync();
            }

            // ✅ Fetch projects from PortfolioProject
            var portfolioProjects = portfolio?.Projects
                .Where(pp => pp.Project != null)
                .Select(pp => pp.Project!)
                .ToList() ?? new List<Project>();

            // ✅ Fetch projects from teams
            var teamProjects = await _context.TeamMembers
                .Where(tm => tm.UserId == targetUserId)
                .Select(tm => tm.Team.Project)
                .Where(p => p != null)
                .Select(p => p!)
                .Distinct()
                .ToListAsync();

            // ✅ Merge projects
            var allProjects = portfolioProjects.Union(teamProjects).DistinctBy(p => p.Id).ToList();

            // 🔹 Fetch user badges
            var userBadges = await _context.UserBadges
                .Include(ub => ub.Badge)
                .Where(ub => ub.UserId == targetUserId)
                .ToListAsync();

            var badges = userBadges.Select(ub => ub.Badge).ToList();

            // 🔹 Fetch reviews
            var reviews = await _context.Reviews
                .Include(r => r.Reviewer)
                .Where(r => r.ReviewedUserId == targetUserId)
                .OrderByDescending(r => r.CreatedAt)
                .Take(10)
                .ToListAsync();

            // 🔹 Fetch pending reports
            var pendingReportsCount = await _context.Reports
                .Where(r => r.ReportedUserId == targetUserId && r.Status == "Pending")
                .CountAsync();

            // 🔹 Fetch enrolled track
            var enrolledTrackName = await _context.TeamMembers
                .Where(tm => tm.UserId == targetUserId)
                .Select(tm => tm.Team.Track.Name)
                .FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(enrolledTrackName))
            {
                enrolledTrackName = await _context.AssessmentResults
                    .Where(ar => ar.UserId == targetUserId)
                    .OrderByDescending(ar => ar.CompletedAt)
                    .Select(ar => ar.Track.Name)
                    .FirstOrDefaultAsync();
            }

            // 🔹 Fetch custom sections
            var customSections = await _context.CustomProfileSections
                .Where(cps => cps.UserId == targetUserId)
                .OrderBy(cps => cps.DisplayOrder)
                .ToListAsync();

            var viewModel = new ProfileViewModel
            {
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                Role = role,
                IsActive = user.IsActive,
                ProfileImageUrl = user.ProfileImageUrl,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt,
                University = user.University,
                Faculty = user.Faculty,
                AcademicYear = user.AcademicYear,
                JobTitle = user.JobTitle,
                YearsOfExperience = user.YearsOfExperience,
                Skills = portfolio?.Skills ?? user.Skills,
                LinkedInUrl = portfolio?.LinkedInUrl ?? user.LinkedInUrl,
                CompanyName = user.CompanyName,
                Industry = user.Industry,
                CompanyDescription = user.CompanyDescription,
                Website = user.Website,
                IsOwnProfile = isOwnProfile,
                Portfolio = portfolio,
                Projects = allProjects,
                TotalProjects = allProjects.Count,
                TotalBadges = badges.Count,
                TotalReviews = reviews.Count,
                PendingReports = pendingReportsCount,
                EnrolledTrack = enrolledTrackName,
                CustomSections = customSections,
                Badges = badges,
                Reviews = reviews.Select(r => new ReviewDisplayViewModel
                {
                    Id = r.Id,
                    ReviewerName = r.Reviewer.FullName,
                    ReviewerRole = "Mentor",
                    OverallRating = r.OverallRating,
                    AverageRating = r.AverageRating,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt,
                    IsPublic = r.IsPublic
                }).ToList()
            };

            return View(viewModel);
        }

        public async Task<IActionResult> Details(string id)
        {
            return RedirectToAction(nameof(Index), new { id });
        }

        // ============================================================
        // ✅ EDIT
        // ============================================================
        public async Task<IActionResult> Edit()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            await _context.Entry(user).ReloadAsync();

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            var viewModel = new EditProfileViewModel
            {
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                CurrentProfileImageUrl = user.ProfileImageUrl,
                Role = role,
                University = user.University,
                Faculty = user.Faculty,
                AcademicYear = user.AcademicYear,
                JobTitle = user.JobTitle,
                YearsOfExperience = user.YearsOfExperience,
                Skills = user.Skills,
                LinkedInUrl = user.LinkedInUrl,
                CompanyName = user.CompanyName,
                Industry = user.Industry,
                CompanyDescription = user.CompanyDescription,
                Website = user.Website,
                HourlyRate = user.HourlyRate
            };

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(EditProfileViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var currentUser = await _userManager.GetUserAsync(User);
                if (currentUser != null)
                {
                    model.CurrentProfileImageUrl = currentUser.ProfileImageUrl;
                    var roles = await _userManager.GetRolesAsync(currentUser);
                    model.Role = roles.FirstOrDefault() ?? "Student";
                }

                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                TempData["Error"] = string.Join(" ", errors);
                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "User not found. Please log in again.");
                return View(model);
            }

            user.FullName = model.FullName;
            if (model.ProfileImage != null && model.ProfileImage.Length > 0)
            {
                try
                {
                    var newImagePath = await _profileImageStorageService.SaveProfileImageAsync(model.ProfileImage, user.ProfileImageUrl);
                    user.ProfileImageUrl = newImagePath;
                }
                catch (InvalidOperationException ex)
                {
                    ModelState.AddModelError(nameof(model.ProfileImage), ex.Message);
                    TempData["Error"] = ex.Message;
                    return View(model);
                }
            }

            user.University = model.University;
            user.Faculty = model.Faculty;
            user.AcademicYear = model.AcademicYear;
            user.JobTitle = model.JobTitle;
            user.YearsOfExperience = model.YearsOfExperience;
            user.Skills = model.Skills;
            user.LinkedInUrl = model.LinkedInUrl;
            user.CompanyName = model.CompanyName;
            user.Industry = model.Industry;
            user.CompanyDescription = model.CompanyDescription;
            user.Website = model.Website;
            user.HourlyRate = model.HourlyRate;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                // Sync portfolio
                var portfolio = await _context.Portfolios.FirstOrDefaultAsync(p => p.UserId == user.Id);
                if (portfolio != null)
                {
                    portfolio.Skills = model.Skills;
                    portfolio.LinkedInUrl = model.LinkedInUrl;
                    portfolio.Bio = model.CompanyDescription ?? model.JobTitle ?? model.FullName;
                    portfolio.UpdatedAt = DateTime.UtcNow;
                    _context.Portfolios.Update(portfolio);
                    await _context.SaveChangesAsync();
                }

                // Sync Mentor hourly rate if applicable
                var mentor = await _context.Mentors.FirstOrDefaultAsync(m => m.UserId == user.Id);
                if (mentor != null && model.HourlyRate.HasValue)
                {
                    mentor.HourlyRate = model.HourlyRate.Value;
                    _context.Mentors.Update(mentor);
                    await _context.SaveChangesAsync();
                }

                TempData["Success"] = "Profile updated successfully!";
                return RedirectToAction("Index");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
                TempData["Error"] = error.Description;
            }

            return View(model);
        }

        // ============================================================
        // ✅ MY REPORTS
        // ============================================================
        public async Task<IActionResult> MyReports()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var submitted = await _context.Reports
                .Include(r => r.ReportedUser)
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Where(r => r.ReporterId == user.Id)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var received = await _context.Reports
                .Include(r => r.Reporter)
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Where(r => r.ReportedUserId == user.Id)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var model = new ViewModels.Profile.MyReportsViewModel
            {
                SubmittedReports = submitted,
                ReceivedReports = received
            };

            return View(model);
        }

        // ============================================================
        // ✅ MY REVIEWS
        // ============================================================
        public async Task<IActionResult> MyReviews()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var reviews = await _context.Reviews
                .Include(r => r.ReviewedUser)
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Where(r => r.ReviewerId == user.Id)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return View(reviews);
        }

        // ============================================================
        // ✅ REPORT USER (POST)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Report(ReportViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Please fill in all required fields.";
                return RedirectToAction("Index", new { id = model.ReportedUserId });
            }

            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
                return RedirectToAction("Login", "Account");

            // ❌ منع الإبلاغ عن النفس
            if (model.ReportedUserId == currentUser.Id)
            {
                TempData["Error"] = "You cannot report yourself.";
                return RedirectToAction("Index", new { id = model.ReportedUserId });
            }

            // ✅ التحقق من عدم وجود بلاغ مكرر
            var existingReport = await _context.Reports
                .FirstOrDefaultAsync(r => r.ReporterId == currentUser.Id
                    && r.ReportedUserId == model.ReportedUserId
                    && r.Reason == model.Reason
                    && r.Status == "Pending");

            if (existingReport != null)
            {
                TempData["Error"] = "You have already reported this user for this reason. Our team is reviewing it.";
                return RedirectToAction("Index", new { id = model.ReportedUserId });
            }

            var report = new Report
            {
                ReporterId = currentUser.Id,
                ReportedUserId = model.ReportedUserId,
                ProjectId = model.ProjectId,
                TeamId = model.TeamId,
                Reason = model.Reason,
                AdditionalDetails = model.AdditionalDetails,
                IsAnonymous = model.IsAnonymous,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Your report has been submitted. Our moderation team will review it within 48 hours.";
            return RedirectToAction("Index", new { id = model.ReportedUserId });
        }

        // ============================================================
        // ✅ REVIEW USER (POST)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Review(ReviewViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Please fill in all required fields.";
                return RedirectToAction("Index", new { id = model.ReviewedUserId });
            }

            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
                return RedirectToAction("Login", "Account");

            // ❌ منع التقييم عن النفس
            if (model.ReviewedUserId == currentUser.Id)
            {
                TempData["Error"] = "You cannot review yourself.";
                return RedirectToAction("Index", new { id = model.ReviewedUserId });
            }

            // ✅ التحقق من عدم وجود تقييم مكرر
            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.ReviewerId == currentUser.Id
                    && r.ReviewedUserId == model.ReviewedUserId
                    && r.ProjectId == model.ProjectId
                    && r.TeamId == model.TeamId);

            if (existingReview != null)
            {
                TempData["Error"] = "You have already reviewed this user for this project/team.";
                return RedirectToAction("Index", new { id = model.ReviewedUserId });
            }

            var review = new Review
            {
                ReviewerId = currentUser.Id,
                ReviewedUserId = model.ReviewedUserId,
                ProjectId = model.ProjectId,
                TeamId = model.TeamId,
                OverallRating = model.OverallRating,
                TeamworkRating = model.TeamworkRating,
                TechnicalSkillsRating = model.TechnicalSkillsRating,
                DeliveryRating = model.DeliveryRating,
                CommunicationRating = model.CommunicationRating,
                Comment = model.Comment,
                IsPublic = model.IsPublic,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // ✅ تحديث الشارات (Badges) للمستخدم المُقيم
            await UpdateBadgesForUser(model.ReviewedUserId);

            TempData["Success"] = "Your review has been submitted successfully! Thank you for your feedback.";
            return RedirectToAction("Index", new { id = model.ReviewedUserId });
        }

        // ============================================================
        // ✅ CUSTOM SECTIONS (CRUD)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddCustomSection(string title, string content)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(content))
            {
                TempData["Error"] = "Title and Content are required.";
                return RedirectToAction(nameof(Index));
            }

            var maxOrder = await _context.CustomProfileSections
                .Where(cps => cps.UserId == user.Id)
                .Select(cps => (int?)cps.DisplayOrder)
                .MaxAsync() ?? 0;

            var section = new CustomProfileSection
            {
                UserId = user.Id,
                Title = title,
                Content = content,
                DisplayOrder = maxOrder + 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.CustomProfileSections.Add(section);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Custom section added successfully!";
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditCustomSection(int id, string title, string content)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var section = await _context.CustomProfileSections.FirstOrDefaultAsync(cps => cps.Id == id && cps.UserId == user.Id);
            if (section == null)
            {
                TempData["Error"] = "Section not found or access denied.";
                return RedirectToAction(nameof(Index));
            }

            if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(content))
            {
                TempData["Error"] = "Title and Content are required.";
                return RedirectToAction(nameof(Index));
            }

            section.Title = title;
            section.Content = content;
            section.UpdatedAt = DateTime.UtcNow;

            _context.CustomProfileSections.Update(section);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Custom section updated successfully!";
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteCustomSection(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var section = await _context.CustomProfileSections.FirstOrDefaultAsync(cps => cps.Id == id && cps.UserId == user.Id);
            if (section == null)
            {
                TempData["Error"] = "Section not found or access denied.";
                return RedirectToAction(nameof(Index));
            }

            _context.CustomProfileSections.Remove(section);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Custom section deleted successfully!";
            return RedirectToAction(nameof(Index));
        }

        // ============================================================
        // ✅ HELPER: UPDATE BADGES
        // ============================================================
        private async System.Threading.Tasks.Task UpdateBadgesForUser(string userId)
        {
            // جلب عدد التقييمات
            var reviewsCount = await _context.Reviews
                .Where(r => r.ReviewedUserId == userId)
                .CountAsync();

            var avgRating = await _context.Reviews
                .Where(r => r.ReviewedUserId == userId)
                .Select(r => r.AverageRating)
                .DefaultIfEmpty()
                .AverageAsync();

            // جلب المشاريع المكتملة
            var projectsCount = await _context.Projects.CountAsync();

            // جلب الشارات المتاحة
            var badges = await _context.Badges.ToListAsync();

            foreach (var badge in badges)
            {
                bool earned = badge.Category switch
                {
                    "Project" => projectsCount >= badge.RequiredCount,
                    "Review" => reviewsCount >= badge.RequiredCount && avgRating >= 4.0,
                    "Team" => false,
                    "Learning" => false,
                    "Company" => false,
                    _ => false
                };

                if (earned)
                {
                    var existing = await _context.UserBadges
                        .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BadgeId == badge.Id);

                    if (existing == null)
                    {
                        _context.UserBadges.Add(new UserBadge
                        {
                            UserId = userId,
                            BadgeId = badge.Id,
                            EarnedAt = DateTime.UtcNow
                        });
                    }
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}