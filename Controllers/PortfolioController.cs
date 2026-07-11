using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;
using System;
using System.Threading.Tasks;

namespace A3DET_CODE.Controllers
{
    [Authorize]
    public class PortfolioController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IPortfolioRepository _portfolioRepository;

        public PortfolioController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IPortfolioRepository portfolioRepository)
        {
            _userManager = userManager;
            _context = context;
            _portfolioRepository = portfolioRepository;
        }

        public async Task<IActionResult> Index()
        {
            return RedirectToAction("Index", "Profile");
        }

        public async Task<IActionResult> Generate()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var existing = await _portfolioRepository.GetByUserIdAsync(user.Id);
            if (existing != null)
                return RedirectToAction("Index", "Profile");

            var portfolio = new Portfolio
            {
                UserId = user.Id,
                Bio = user.CompanyDescription ?? string.Empty,
                Skills = user.Skills ?? string.Empty,
                GitHubUrl = string.Empty,
                LinkedInUrl = user.LinkedInUrl ?? string.Empty,
                ProfileStrength = 70,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Portfolios.Add(portfolio);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index", "Profile");
        }

        public async Task<IActionResult> Edit(int id)
        {
            var portfolio = await _portfolioRepository.GetByIdAsync(id);
            if (portfolio == null)
                return NotFound();

            return View(portfolio);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Portfolio portfolio)
        {
            if (!ModelState.IsValid)
                return View(portfolio);

            var existing = await _context.Portfolios.FindAsync(portfolio.Id);
            if (existing == null)
                return NotFound();

            existing.Bio = portfolio.Bio;
            existing.Skills = portfolio.Skills;
            existing.GitHubUrl = portfolio.GitHubUrl;
            existing.LinkedInUrl = portfolio.LinkedInUrl;
            existing.UpdatedAt = DateTime.UtcNow;

            await _portfolioRepository.UpdateAsync(existing);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "Profile");
        }

        public async Task<IActionResult> Details(string id)
        {
            return RedirectToAction("Index", "Profile", new { id });
        }
    }
}
