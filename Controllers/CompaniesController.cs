using A3DET_CODE.Data;
using A3DET_CODE.ViewModels.Company;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace A3DET_CODE.Controllers
{
    [AllowAnonymous]
    public class CompaniesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? search, string? industry, string? sort, int page = 1)
        {
            var query = _context.Users
                .Where(u => u.Role == "Company")
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(u =>
                    (u.CompanyName != null && u.CompanyName.ToLower().Contains(searchLower)) ||
                    (u.Industry != null && u.Industry.ToLower().Contains(searchLower)) ||
                    (u.CompanyDescription != null && u.CompanyDescription.ToLower().Contains(searchLower))
                );
            }

            if (!string.IsNullOrEmpty(industry) && industry != "all")
            {
                var industryLower = industry.ToLower();
                query = query.Where(u => u.Industry != null && u.Industry.ToLower().Contains(industryLower));
            }

            query = sort switch
            {
                "newest" => query.OrderByDescending(u => u.CreatedAt),
                _ => query.OrderBy(u => u.CompanyName ?? u.FullName ?? string.Empty)
            };

            int pageSize = 12;
            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var companies = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var viewModel = new CompanyPagedViewModel
            {
                Companies = companies.Select(c => new CompanyViewModel
                {
                    Id = c.Id,
                    CompanyName = c.CompanyName ?? c.FullName ?? "Company",
                    ProfileImageUrl = c.ProfileImageUrl,
                    Industry = c.Industry ?? "General",
                    CompanyDescription = c.CompanyDescription ?? "No description provided yet.",
                    Website = c.Website,
                    Email = c.Email,
                    CreatedAt = c.CreatedAt,
                    IsActive = c.IsActive,
                    Initials = GetInitials(c.CompanyName ?? c.FullName ?? "Company")
                }).ToList(),
                CurrentPage = page,
                TotalPages = totalPages,
                TotalCount = totalCount,
                PageSize = pageSize,
                SearchTerm = search,
                Industry = industry,
                SortBy = sort
            };

            ViewBag.IndustryList = await _context.Users
                .Where(u => u.Role == "Company" && !string.IsNullOrEmpty(u.Industry))
                .Select(u => u.Industry!)
                .Distinct()
                .OrderBy(i => i)
                .ToListAsync();

            return View(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return NotFound();

            var company = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id && u.Role == "Company");

            if (company == null)
                return NotFound();

            var viewModel = new CompanyDetailViewModel
            {
                Id = company.Id,
                CompanyName = company.CompanyName ?? company.FullName ?? "Company",
                ProfileImageUrl = company.ProfileImageUrl,
                Industry = company.Industry ?? "General",
                CompanyDescription = company.CompanyDescription ?? "No description provided yet.",
                Website = company.Website,
                LinkedInUrl = company.LinkedInUrl,
                Email = company.Email,
                CreatedAt = company.CreatedAt,
                IsActive = company.IsActive,
                Initials = GetInitials(company.CompanyName ?? company.FullName ?? "Company"),
                PostedProjectsCount = await _context.Projects.CountAsync(p => p.ClientId == company.Id)
            };

            return View(viewModel);
        }

        private static string GetInitials(string value)
        {
            var words = value.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (words.Length == 0)
                return "C";

            if (words.Length == 1)
                return words[0][0].ToString().ToUpper();

            return string.Concat(words.Take(2).Select(w => w[0].ToString().ToUpper()));
        }
    }
}
