using System;
using System.Collections.Generic;
using A3DET_CODE.Models;

namespace A3DET_CODE.ViewModels.Profile
{
    public class ProfileViewModel
    {
        // ============================================================
        // ✅ Core User Data
        // ============================================================
        public string UserId { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }

        // ============================================================
        // ✅ Role-specific fields
        // ============================================================
        public string? University { get; set; }
        public string? Faculty { get; set; }
        public string? AcademicYear { get; set; }
        public string? JobTitle { get; set; }
        public int? YearsOfExperience { get; set; }
        public string? CompanyName { get; set; }
        public string? Industry { get; set; }
        public string? CompanyDescription { get; set; }
        public string? Website { get; set; }
        public string? Skills { get; set; }
        public string? LinkedInUrl { get; set; }

        // ============================================================
        // ✅ Statistics
        // ============================================================
        public int TotalProjects { get; set; }
        public int TotalBadges { get; set; }
        public int TotalReviews { get; set; }
        public int PendingReports { get; set; }

        // ============================================================
        // ✅ Track enrollment
        // ============================================================
        public string? EnrolledTrack { get; set; }

        // ============================================================
        // ✅ Ownership state
        // ============================================================
        public bool IsOwnProfile { get; set; }

        // ============================================================
        // ✅ Portfolio info
        // ============================================================
        public Portfolio? Portfolio { get; set; }

        // ============================================================
        // ✅ Projects List (✅ باستخدام الـ Fully Qualified Name)
        // ============================================================
        public List<A3DET_CODE.Models.Project> Projects { get; set; } = new();

        // ============================================================
        // ✅ Custom Sections
        // ============================================================
        public List<CustomProfileSection> CustomSections { get; set; } = new();

        // ============================================================
        // ✅ Badges List
        // ============================================================
        public List<Badge> Badges { get; set; } = new();

        // ============================================================
        // ✅ Reviews List
        // ============================================================
        public List<ReviewDisplayViewModel> Reviews { get; set; } = new();

        // ============================================================
        // ✅ Total Badges Count
        // ============================================================
        public int TotalBadgesCount => Badges?.Count ?? 0;
    }

    // ============================================================
    // ✅ ReviewDisplayViewModel
    // ============================================================
    public class ReviewDisplayViewModel
    {
        public int Id { get; set; }
        public string ReviewerName { get; set; } = string.Empty;
        public string ReviewerRole { get; set; } = string.Empty;
        public int OverallRating { get; set; }
        public double AverageRating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublic { get; set; }
    }
}