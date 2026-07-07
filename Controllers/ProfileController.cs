
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Models;
using A3DET_CODE.Data;
using A3DET_CODE.ViewModels.Profile;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ProfileController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            await _context.Entry(user).ReloadAsync();

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            var viewModel = new ProfileViewModel
            {
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                Role = role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt,
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

            viewModel.TotalProjects = await _context.Projects.CountAsync();
            viewModel.TotalBadges = 3;

            return View(viewModel);
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

        public async Task<IActionResult> Details(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "Student";

            var viewModel = new ProfileViewModel
            {
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                Role = role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt,
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
    }
}