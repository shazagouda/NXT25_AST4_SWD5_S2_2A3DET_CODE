using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Interfaces;

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
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var portfolio = await _portfolioRepository.GetByUserIdAsync(user.Id);
            if (portfolio == null)
            {
                return RedirectToAction(nameof(Generate));
            }

            return View(portfolio);
        }

        public async Task<IActionResult> Generate()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return RedirectToAction("Login", "Account");

            var existing = await _portfolioRepository.GetByUserIdAsync(user.Id);
            if (existing != null)
                return RedirectToAction(nameof(Index));

            var portfolio = new Portfolio
            {
                UserId = user.Id,
                Bio = user.CompanyDescription ?? user.JobTitle ?? user.FullName,
                Skills = user.Skills,
                GitHubUrl = user.LinkedInUrl,
                LinkedInUrl = user.LinkedInUrl,
                ProfileStrength = 70,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Portfolios.Add(portfolio);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
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

            portfolio.UpdatedAt = DateTime.UtcNow;
            await _portfolioRepository.UpdateAsync(portfolio);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Details(string id)
        {
            if (int.TryParse(id, out var portfolioId))
            {
                var portfolio = await _portfolioRepository.GetByIdAsync(portfolioId);
                if (portfolio == null)
                    return NotFound();

                return View(portfolio);
            }

            var userPortfolio = await _portfolioRepository.GetByUserIdAsync(id);
            if (userPortfolio == null)
                return RedirectToAction(nameof(Generate));

            return View(userPortfolio);
        }
    }
}
