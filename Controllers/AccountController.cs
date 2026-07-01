using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using A3DET_CODE.Models;
using A3DET_CODE.Data;
using A3DET_CODE.ViewModels.Account;

namespace A3DET_CODE.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
        }

        // GET: Login
        public IActionResult Login(string? returnUrl = null)
        {
            if (User.Identity?.IsAuthenticated == true)
                return RedirectToAction("Index", "Profile");

            ViewData["ReturnUrl"] = returnUrl;
            return View(new LoginViewModel());
        }

        // POST: Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "No user found with this email.");
                return View(model);
            }

            var passwordCheck = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordCheck)
            {
                ModelState.AddModelError(string.Empty, "Incorrect password.");
                return View(model);
            }

            var result = await _signInManager.PasswordSignInAsync(
                user.UserName ?? user.Email,
                model.Password,
                model.RememberMe,
                lockoutOnFailure: true);

            if (result.Succeeded)
            {
                user.LastLoginAt = DateTime.UtcNow;
                await _userManager.UpdateAsync(user);
                return RedirectToAction("Index", "Profile");
            }

            if (result.IsLockedOut)
                ModelState.AddModelError(string.Empty, "Account locked. Try again later.");
            else if (result.IsNotAllowed)
                ModelState.AddModelError(string.Empty, "Email not confirmed.");
            else
                ModelState.AddModelError(string.Empty, "Login failed. Please try again.");

            return View(model);
        }

        // GET: Sign Up
        public IActionResult SignUp()
        {
            if (User.Identity?.IsAuthenticated == true)
                return RedirectToAction("Index", "Profile");
            return View();
        }

        // POST: RegisterStudent
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterStudent(RegisterStudentViewModel model)
        {
            if (!ModelState.IsValid)
                return View("SignUp", model);

            if (!model.AcceptTerms)
            {
                ModelState.AddModelError(string.Empty, "You must accept the Terms & Conditions.");
                return View("SignUp", model);
            }

            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                ModelState.AddModelError(string.Empty, "This email is already registered.");
                return View("SignUp", model);
            }
            if (await _userManager.FindByNameAsync(model.Username) != null)
            {
                ModelState.AddModelError(string.Empty, "This username is already taken.");
                return View("SignUp", model);
            }

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                FullName = model.FullName,
                Role = "Student",
                University = model.University,
                Faculty = model.Faculty,
                AcademicYear = model.AcademicYear,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Student");

                var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: false);
                if (signInResult.Succeeded)
                    return RedirectToAction("Index", "Profile");
                else
                    ModelState.AddModelError(string.Empty, "Account created but sign-in failed. Please login manually.");
            }
            else
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
            }

            return View("SignUp", model);
        }

        // ============================================================
        // ✅ POST: RegisterMentor (مع إضافة Mentor profile)
        // ============================================================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterMentor(RegisterMentorViewModel model)
        {
            if (!ModelState.IsValid)
                return View("SignUp", model);

            if (!model.AcceptTerms)
            {
                ModelState.AddModelError(string.Empty, "You must accept the Terms & Conditions.");
                return View("SignUp", model);
            }

            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                ModelState.AddModelError(string.Empty, "This email is already registered.");
                return View("SignUp", model);
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName,
                Role = "Mentor",
                JobTitle = model.JobTitle,
                YearsOfExperience = model.YearsOfExperience,
                Skills = model.Skills,
                LinkedInUrl = model.LinkedInUrl,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Mentor");

                // ✅ إنشاء Mentor profile وربطه بالمستخدم
                var mentor = new Mentor
                {
                    UserId = user.Id,
                    FullName = model.FullName,
                    Initials = GetInitials(model.FullName),
                    Expertise = model.JobTitle ?? "Mentor",
                    Rating = 0,
                    IsVerified = false,
                    Bio = null,
                    LinkedInUrl = model.LinkedInUrl,
                    GitHubUrl = null,
                    YearsOfExperience = model.YearsOfExperience,
                    TotalSessions = 0
                };

                await _context.Mentors.AddAsync(mentor);
                await _context.SaveChangesAsync();

                var signInResult = await _signInManager.PasswordSignInAsync(
                    user, model.Password, isPersistent: false, lockoutOnFailure: false);

                if (signInResult.Succeeded)
                    return RedirectToAction("Index", "Profile");
                else
                    ModelState.AddModelError(string.Empty, "Account created but sign-in failed. Please login manually.");
            }
            else
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
            }

            return View("SignUp", model);
        }

        // Helper function
        private string GetInitials(string fullName)
        {
            if (string.IsNullOrEmpty(fullName)) return "U";
            var parts = fullName.Trim().Split(' ');
            if (parts.Length == 1) return parts[0].Substring(0, 1).ToUpper();
            return (parts[0].Substring(0, 1) + parts[parts.Length - 1].Substring(0, 1)).ToUpper();
        }

        // POST: RegisterCompany
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterCompany(RegisterCompanyViewModel model)
        {
            if (!ModelState.IsValid)
                return View("SignUp", model);

            if (!model.AcceptTerms)
            {
                ModelState.AddModelError(string.Empty, "You must accept the Terms & Conditions.");
                return View("SignUp", model);
            }

            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                ModelState.AddModelError(string.Empty, "This email is already registered.");
                return View("SignUp", model);
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
                await _userManager.AddToRoleAsync(user, "Company");
                var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: false);
                if (signInResult.Succeeded)
                    return RedirectToAction("Index", "Profile");
                else
                    ModelState.AddModelError(string.Empty, "Account created but sign-in failed. Please login manually.");
            }
            else
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
            }

            return View("SignUp", model);
        }

        // GET: Forgot Password
        public IActionResult ForgotPassword() => View(new ForgotPasswordViewModel());

        // POST: Forgot Password
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "No user found.");
                return View(model);
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = Url.Action("ResetPassword", "Account", new { token, email = user.Email }, Request.Scheme);
            ViewData["Success"] = "Reset link sent.";
            return View();
        }

        // GET: Reset Password
        public IActionResult ResetPassword(string token, string email)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(email))
                return BadRequest();

            return View(new ResetPasswordViewModel { Token = token, Email = email });
        }

        // POST: Reset Password
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid request.");
                return View(model);
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                ViewData["Success"] = "Password reset successfully.";
                return View("ResetPasswordSuccess");
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);

            return View(model);
        }

        // GET: Logout
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        // GET: Verify Email
        public async Task<IActionResult> VerifyEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
            {
                ViewData["Error"] = "Invalid request.";
                return View();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                ViewData["Error"] = "User not found.";
                return View();
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                ViewData["Success"] = "Email verified!";
            else
                ViewData["Error"] = "Verification failed.";

            return View();
        }

        // POST: Resend Verification
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResendVerification(string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                ViewData["Error"] = "User not found.";
                return View("VerifyEmail");
            }

            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                ViewData["Success"] = "Email already verified.";
                return View("VerifyEmail");
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var verificationLink = Url.Action("VerifyEmail", "Account", new { userId = user.Id, token }, Request.Scheme);
            ViewData["Success"] = "Verification email sent.";
            return View("VerifyEmail");
        }
    }
}