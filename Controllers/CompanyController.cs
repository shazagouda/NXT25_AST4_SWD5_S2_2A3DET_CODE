using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.ViewModels.Account;
using A3DET_CODE.ViewModels.Project;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class CompanyController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly IProjectRepository _projectRepository;
        private readonly IApplicationRepository _applicationRepository;
        private readonly IHiringRepository _hiringRepository;

        public CompanyController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            IProjectRepository projectRepository,
            IApplicationRepository applicationRepository,
            IHiringRepository hiringRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
            _projectRepository = projectRepository;
            _applicationRepository = applicationRepository;
            _hiringRepository = hiringRepository;
        }

        [AllowAnonymous]
        public IActionResult Register() => View(new RegisterCompanyViewModel());

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterCompanyViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                ModelState.AddModelError(string.Empty, "This email is already registered.");
                return View(model);
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.CompanyName,
                Role = "Company",
                CompanyName = model.CompanyName,
                Industry = model.Industry,
                Website = model.Website,
                CompanyDescription = model.CompanyDescription,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await EnsureRoleExistsAsync("Company");
                await _userManager.AddToRoleAsync(user, "Company");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToAction(nameof(Dashboard));
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return View(model);
        }

        private async System.Threading.Tasks.Task EnsureRoleExistsAsync(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        public async Task<IActionResult> Dashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var projects = await _projectRepository.GetProjectsByStatusAsync("Open");
            var applications = await _applicationRepository.GetAllAsync();

            ViewBag.Projects = projects.Where(p => p.ClientId == user.Id).ToList();
            ViewBag.Applications = applications.Where(a => a.Project?.ClientId == user.Id).ToList();
            return View(user);
        }

        public async Task<IActionResult> BrowseStudents()
        {
            var students = await _context.Users
                .Where(u => u.Role == "Student")
                .OrderBy(u => u.FullName)
                .ToListAsync();

            return View(students);
        }

        public async Task<IActionResult> BrowseTeams()
        {
            var teams = await _context.Teams
                .Include(t => t.Members).ThenInclude(m => m.User)
                .Include(t => t.Project)
                .Include(t => t.Track)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return View(teams);
        }

        public async Task<IActionResult> PostProject()
        {
            ViewBag.Tracks = await _context.Tracks.ToListAsync();
            return View(new ProjectViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> PostProject(ProjectViewModel model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Tracks = await _context.Tracks.ToListAsync();
                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var project = new Project
            {
                Title = model.Title,
                Description = model.Description,
                TechStack = model.TechStack,
                Type = model.Type,
                Status = "Open",
                TrackId = model.TrackId,
                ClientId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Project posted successfully.";
            return RedirectToAction(nameof(Dashboard));
        }

        public async Task<IActionResult> Applications()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var applications = await _context.Applications
                .Include(a => a.Project)
                .Include(a => a.Applicant)
                .Where(a => a.Project.ClientId == user.Id)
                .OrderByDescending(a => a.AppliedAt)
                .ToListAsync();

            return View(applications);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Hire(int applicationId, string decision, string? notes)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var application = await _context.Applications
                .Include(a => a.Project)
                .Include(a => a.Applicant)
                .FirstOrDefaultAsync(a => a.Id == applicationId);

            if (application == null || application.Project?.ClientId != user.Id)
                return Forbid();

            if (decision == "Accept")
            {
                application.Status = "Accepted";
                var hiring = new Hiring
                {
                    ApplicationId = application.Id,
                    CompanyId = user.Id,
                    StudentId = application.ApplicantId,
                    Status = "Accepted",
                    Notes = notes,
                    HiredAt = DateTime.UtcNow
                };

                _context.Hirings.Add(hiring);
            }
            else
            {
                application.Status = "Rejected";
            }

            await _context.SaveChangesAsync();
            TempData["Success"] = decision == "Accept" ? "Applicant hired successfully." : "Application rejected.";
            return RedirectToAction(nameof(Applications));
        }
    }
}
