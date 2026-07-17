using A3DET_CODE.Data;
using A3DET_CODE.Models;
using A3DET_CODE.Repositories.Implementations;
using A3DET_CODE.Repositories.Interfaces;
using A3DET_CODE.Services;
using A3DET_CODE.Services.Implementations;
using A3DET_CODE.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using A3DET_CODE.Hubs; // ✅ أضفنا هذا الـ using

var builder = WebApplication.CreateBuilder(args);

// إضافة تسجيل الأخطاء
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddControllersWithViews();

// injecting the repository pattern
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ISubmissionRepository, SubmissionRepository>();
builder.Services.AddScoped<ITeamMemberRepository, TeamMemberRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
builder.Services.AddScoped<IHiringRepository, HiringRepository>();
builder.Services.AddScoped<IProfileImageStorageService, LocalFileProfileImageStorageService>();
builder.Services.AddScoped<IJoinRequestRepository, JoinRequestRepository>();
builder.Services.AddScoped<ITrackRepository, TrackRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddSignalR();
builder.Services.AddScoped<IChatService, ChatService>();

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

// ✅ هذا السطر هو الحل لمشكلة 404
app.MapHub<ChatHub>("/chatHub");

// ============================================================
// ✅ HELPER FUNCTION
// ============================================================
async System.Threading.Tasks.Task EnsureRoleExistsAsync(RoleManager<IdentityRole> roleManager, string roleName)
{
    if (await roleManager.RoleExistsAsync(roleName))
        return;

    var result = await roleManager.CreateAsync(new IdentityRole(roleName));
    if (result.Succeeded)
    {
        Console.WriteLine($"✅ Role '{roleName}' created.");
    }
    else
    {
        foreach (var error in result.Errors)
        {
            Console.WriteLine($"❌ Error creating role '{roleName}': {error.Description}");
        }
    }
}

// ============ SEED DATA ============
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var context = services.GetRequiredService<ApplicationDbContext>();

        // ============================================================
        // ✅ 1. CREATE ROLES
        // ============================================================
        string[] roleNames = { "Student", "Mentor", "Company", "Admin" };
        foreach (var roleName in roleNames)
        {
            await EnsureRoleExistsAsync(roleManager, roleName);
        }

        // ============================================================
        // ✅ 2. CREATE TEST STUDENT
        // ============================================================
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

        // ============================================================
        // ✅ 3. CREATE TEST MENTOR
        // ============================================================
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
                mentorUser = user;
            }
        }

        if (mentorUser != null)
        {
            var existingMentor = await context.Mentors.FirstOrDefaultAsync(m => m.UserId == mentorUser.Id);
            if (existingMentor == null)
            {
                var mentor = new Mentor
                {
                    UserId = mentorUser.Id,
                    FullName = "Test Mentor",
                    Initials = "TM",
                    Expertise = "Full-Stack Development",
                    Rating = 4.8,
                    IsVerified = true,
                    Bio = "Experienced full-stack developer with 8 years of industry experience.",
                    LinkedInUrl = "https://linkedin.com/in/testmentor",
                    GitHubUrl = "https://github.com/testmentor",
                    YearsOfExperience = 8,
                    TotalSessions = 45
                };
                await context.Mentors.AddAsync(mentor);
                await context.SaveChangesAsync();
                Console.WriteLine($"✅ Mentor profile created for {mentorEmail}");
            }
        }

        // ============================================================
        // ✅ 4. CREATE TEST COMPANY
        // ============================================================
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

        // ============================================================
        // ✅ 4.5 CREATE TEST ADMIN
        // ============================================================
        var adminEmail = "admin@a3detcode.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            var user = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "System Admin",
                Role = "Admin",
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(user, "Admin@123456");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Admin");
                Console.WriteLine($"✅ User '{adminEmail}' created!");
            }
        }

        // ============================================================
        // ✅ 5. SEED TRACKS
        // ============================================================
        if (!context.Tracks.Any())
        {
            var tracks = new List<Track>
            {
                new Track { Name = "Frontend Development", Description = "React, accessibility, and modern UI engineering.", Icon = "FE", Skills = "HTML, CSS, JavaScript, React, Angular, Vue", Roadmap = "HTML → CSS → JavaScript → React → Advanced Patterns", Color = "#2F6FED" },
                new Track { Name = "Backend Development", Description = "APIs, databases, and scalable architecture.", Icon = "BE", Skills = "C#, .NET, SQL, API Design, Cloud", Roadmap = "C# → .NET → SQL → REST APIs → Microservices", Color = "#22C55E" },
                new Track { Name = "AI & Machine Learning", Description = "Models, data pipelines, and applied ML systems.", Icon = "AI", Skills = "Python, Pandas, Scikit-learn, TensorFlow, PyTorch", Roadmap = "Python → Data Analysis → ML Algorithms → Deep Learning", Color = "#A78BFA" },
                new Track { Name = "Data Science", Description = "Extract insights from data with statistical analysis.", Icon = "DS", Skills = "Python, R, SQL, Statistics, Data Visualization", Roadmap = "Python → Statistics → Data Visualization → Advanced Analytics", Color = "#F59E0B" },
                new Track { Name = "Mobile Development", Description = "Native and cross-platform app engineering.", Icon = "MO", Skills = "Flutter, Kotlin, Swift, React Native", Roadmap = "Flutter → Dart → Firebase → Advanced Mobile", Color = "#38BDF8" },
                new Track { Name = "DevOps", Description = "Automate infrastructure and deployment pipelines.", Icon = "DO", Skills = "Docker, Kubernetes, CI/CD, AWS, Azure", Roadmap = "Linux → Docker → Kubernetes → Cloud → CI/CD", Color = "#FB923C" },
                new Track { Name = "Cybersecurity", Description = "Protect systems and networks from security threats.", Icon = "CS", Skills = "Network Security, Cryptography, Ethical Hacking", Roadmap = "Networking → Security Basics → Ethical Hacking → Advanced Security", Color = "#F87171" },
                new Track { Name = "Game Development", Description = "Build immersive games with Unity or Unreal.", Icon = "GD", Skills = "C#, C++, Unity, Unreal, Game Design", Roadmap = "C# → Unity → Game Physics → Advanced Game Development", Color = "#A3E635" },
                new Track { Name = "Embedded Systems", Description = "Program microcontrollers and IoT devices.", Icon = "ES", Skills = "C, C++, Microcontrollers, IoT, RTOS", Roadmap = "C → Microcontrollers → IoT → RTOS", Color = "#2DD4BF" },
                new Track { Name = "Software Testing", Description = "Ensure quality with automated testing and QA.", Icon = "ST", Skills = "Unit Testing, Selenium, Test Automation, QA", Roadmap = "Testing Basics → Unit Testing → Selenium → Advanced QA", Color = "#C084FC" }
            };

            await context.Tracks.AddRangeAsync(tracks);
            await context.SaveChangesAsync();
            Console.WriteLine("✅ 10 Tracks added successfully!");
        }

        // ============================================================
        // ✅ 6. SEED BADGES
        // ============================================================
        if (!context.Badges.Any())
        {
            var badges = new List<Badge>
            {
                new Badge { Name = "Rising Developer", Icon = "🚀", Description = "Completed 5 projects successfully", Level = "Beginner", Category = "Project", RequiredCount = 5 },
                new Badge { Name = "Consistent Builder", Icon = "💪", Description = "Completed 10 projects", Level = "Intermediate", Category = "Project", RequiredCount = 10 },
                new Badge { Name = "Team Player", Icon = "🤝", Description = "Collaborated on 3 team projects", Level = "Beginner", Category = "Team", RequiredCount = 3 },
                new Badge { Name = "Project Master", Icon = "🏆", Description = "Completed 15 projects with high ratings", Level = "Advanced", Category = "Project", RequiredCount = 15 },
                new Badge { Name = "High Performer", Icon = "⭐", Description = "Average rating 4.5+ from 10 reviews", Level = "Advanced", Category = "Review", RequiredCount = 10 },
                new Badge { Name = "Team Leader", Icon = "👑", Description = "Led 5 team projects", Level = "Expert", Category = "Team", RequiredCount = 5 },
                new Badge { Name = "Track Explorer", Icon = "📚", Description = "Completed 3 different tracks", Level = "Intermediate", Category = "Learning", RequiredCount = 3 },
                new Badge { Name = "Track Master", Icon = "🎯", Description = "Completed 5 tracks", Level = "Expert", Category = "Learning", RequiredCount = 5 },
                new Badge { Name = "Top Learner", Icon = "🏅", Description = "Top 10% in assessment scores", Level = "Expert", Category = "Learning", RequiredCount = 1 },
                new Badge { Name = "Graduate", Icon = "🎓", Description = "Completed all requirements for a track", Level = "Advanced", Category = "Learning", RequiredCount = 1 },
                new Badge { Name = "Review Master", Icon = "📝", Description = "Wrote 20 helpful reviews", Level = "Advanced", Category = "Review", RequiredCount = 20 },
                new Badge { Name = "Top Employer", Icon = "🌟", Description = "Hired 5 students from platform", Level = "Expert", Category = "Company", RequiredCount = 5 }
            };

            await context.Badges.AddRangeAsync(badges);
            await context.SaveChangesAsync();
            Console.WriteLine("✅ 12 Badges added successfully!");
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