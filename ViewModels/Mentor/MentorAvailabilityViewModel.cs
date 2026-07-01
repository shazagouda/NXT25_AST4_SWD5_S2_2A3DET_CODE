namespace A3DET_CODE.ViewModels.Mentor
{
    public class MentorAvailabilityViewModel
    {
        public int MentorId { get; set; }
        public string MentorName { get; set; } = string.Empty;

        public Dictionary<DayOfWeek, List<TimeSlotViewModel>> WeeklySchedule { get; set; } = new();

        public string TimeZone { get; set; } = "UTC+2";

        public string TimeZoneDisplay => TimeZone;
    }

    public class TimeSlotViewModel
    {
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public bool IsAvailable { get; set; } = true;

        public string Display => $"{StartTime:hh:mm tt} - {EndTime:hh:mm tt}";
    }
}