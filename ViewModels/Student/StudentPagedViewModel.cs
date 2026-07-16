namespace A3DET_CODE.ViewModels.Student
{
    public class StudentPagedViewModel
    {
        public List<StudentViewModel> Students { get; set; } = new();
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }

        // Filters
        public string? SearchTerm { get; set; }
        public string? University { get; set; }
        public string? Track { get; set; }
        public string? AcademicYear { get; set; }

        // Available filter options (populated from DB)
        public List<string> UniversityList { get; set; } = new();
        public List<string> TrackList { get; set; } = new();
        public List<string> AcademicYearList { get; set; } = new();

        public bool HasPreviousPage => CurrentPage > 1;
        public bool HasNextPage => CurrentPage < TotalPages;

        public List<int> GetPageNumbers()
        {
            var pages = new List<int>();
            var start = Math.Max(1, CurrentPage - 2);
            var end = Math.Min(TotalPages, CurrentPage + 2);
            for (int i = start; i <= end; i++)
                pages.Add(i);
            return pages;
        }
    }
}
