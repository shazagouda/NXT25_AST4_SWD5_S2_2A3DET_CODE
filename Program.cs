using A3DET_CODE.Data;
using A3DET_CODE.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// إضافة تسجيل الأخطاء
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddControllersWithViews();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = false;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure cookie
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(14);
    options.Cookie.Name = "A3DET_CODE_Auth";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

// Add External Login Providers (only if configured)
var authBuilder = builder.Services.AddAuthentication();

// Google
var googleClientId = builder.Configuration["Authentication:Google:ClientId"];
var googleClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
if (!string.IsNullOrEmpty(googleClientId) && !string.IsNullOrEmpty(googleClientSecret))
{
    authBuilder.AddGoogle(options =>
    {
        options.ClientId = googleClientId;
        options.ClientSecret = googleClientSecret;
    });
}

// GitHub
var githubClientId = builder.Configuration["Authentication:GitHub:ClientId"];
var githubClientSecret = builder.Configuration["Authentication:GitHub:ClientSecret"];
if (!string.IsNullOrEmpty(githubClientId) && !string.IsNullOrEmpty(githubClientSecret))
{
    authBuilder.AddOAuth("GitHub", options =>
    {
        options.ClientId = githubClientId;
        options.ClientSecret = githubClientSecret;
        options.CallbackPath = "/signin-github";

        options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
        options.TokenEndpoint = "https://github.com/login/oauth/access_token";
        options.UserInformationEndpoint = "https://api.github.com/user";

        options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
        options.ClaimActions.MapJsonKey(ClaimTypes.Name, "login");
        options.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
    });
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// ============ SEED DATA ============
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        // Create roles
        string[] roleNames = { "Student", "Mentor", "Company", "Admin" };
        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
                Console.WriteLine($"✅ Role '{roleName}' created.");
            }
        }

        // Create test student
        var studentEmail = "student@a3det.com";
        var studentUser = await userManager.FindByEmailAsync(studentEmail);
        if (studentUser == null)
        {
            var user = new ApplicationUser
            {
                UserName = studentEmail,
                Email = studentEmail,
                FullName = "Test Student",
                Role = "Student",
                University = "Cairo University",
                Faculty = "Engineering",
                AcademicYear = "3",
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(user, "Student@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Student");
                Console.WriteLine($"✅ User '{studentEmail}' created!");
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"❌ Error: {error.Description}");
                }
            }
        }

        // Create test mentor
        var mentorEmail = "mentor@a3det.com";
        var mentorUser = await userManager.FindByEmailAsync(mentorEmail);
        if (mentorUser == null)
        {
            var user = new ApplicationUser
            {
                UserName = mentorEmail,
                Email = mentorEmail,
                FullName = "Test Mentor",
                Role = "Mentor",
                JobTitle = "Senior Developer",
                YearsOfExperience = 8,
                Skills = "C#, React, Cloud",
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(user, "Mentor@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Mentor");
                Console.WriteLine($"✅ User '{mentorEmail}' created!");
            }
        }

        // Create test company
        var companyEmail = "company@a3det.com";
        var companyUser = await userManager.FindByEmailAsync(companyEmail);
        if (companyUser == null)
        {
            var user = new ApplicationUser
            {
                UserName = companyEmail,
                Email = companyEmail,
                FullName = "Test Company",
                Role = "Company",
                CompanyName = "Tech Corp",
                Industry = "Technology",
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(user, "Company@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Company");
                Console.WriteLine($"✅ User '{companyEmail}' created!");
            }
        }

        Console.WriteLine("✅ Seed data completed!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Error seeding data: {ex.Message}");
    }
}
// ============ END SEED DATA ============

app.Run();