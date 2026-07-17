using System;

namespace A3DET_CODE.ViewModels.Notification
{
    public class NotificationViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // "JoinRequest" or "Booking"
        public string ActionUrl { get; set; } = string.Empty;
        public string IconClass { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string TargetName { get; set; } = string.Empty;
    }
}
