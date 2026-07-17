using System;
using System.Collections.Generic;

namespace A3DET_CODE.ViewModels.Chat
{
    public class ChatDetailsViewModel
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; } = string.Empty;
        public bool IsPrivate { get; set; }
        public string CurrentUserId { get; set; } = string.Empty;
        public List<ChatMessageViewModel> Messages { get; set; } = new();
        public string AvatarColor { get; set; } = "linear-gradient(135deg,#0d9488,#2563eb)";
        public string AvatarLetter { get; set; } = "G";
        public bool IsGroup { get; set; }
        public string? Tag { get; set; }
        public bool IsOnline { get; set; }
    }

    public class ChatMessageViewModel
    {
        public int Id { get; set; }
        public string SenderId { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime SentAt { get; set; }
        public bool IsMine { get; set; }
        public string TimeDisplay => SentAt.ToString("hh:mm tt");
    }
}