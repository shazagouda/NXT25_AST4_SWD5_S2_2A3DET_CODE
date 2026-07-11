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

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IProfileImageStorageService _profileImageStorageService;

        public ProfileController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IProfileImageStorageService profileImageStorageService)
        {
            _userManager = userManager;
            _context = context;
            _profileImageStorageService = profileImageStorageService;
        }

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

            // Fetch portfolio
            var portfolio = await _context.Portfolios
                .Include(p => p.Projects).ThenInclude(pp => pp.Project)
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

            // Fetch projects
            var portfolioProjects = portfolio?.Projects.Select(pp => pp.Project).Where(p => p != null).Select(p => p!).ToList() ?? new List<Project>();
            var teamProjects = await _context.TeamMembers
                .Where(tm => tm.UserId == targetUserId)
                .Select(tm => tm.Team.Project)
                .Where(p => p != null)
                .Select(p => p!)
                .Distinct()
                .ToListAsync();
            var allProjects = portfolioProjects.Union(teamProjects).DistinctBy(p => p.Id).ToList();

            // Fetch user badges
            var badges = await _context.UserBadges
                .Include(ub => ub.Badge)
                .Where(ub => ub.UserId == targetUserId)
                .Select(ub => ub.Badge)
                .ToListAsync();

            // Fetch enrolled track
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

            // Fetch custom sections
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
                TotalBadges = badges.Count > 0 ? badges.Count : 3, // fallback to 3 as before
                EnrolledTrack = enrolledTrackName,
                CustomSections = customSections,
                Badges = badges
            };

            return View(viewModel);
        }

        public async Task<IActionResult> Details(string id)
        {
            return RedirectToAction(nameof(Index), new { id });
        }

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
                Website = user.Website
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

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                // Sync portfolio if it exists
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
    }
}
