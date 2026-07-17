using System;
using System.Collections.Generic;

namespace A3DET_CODE.ViewModels.Chat
{
    public class ChatIndexViewModel
    {
        public string UserId { get; set; } = string.Empty;
        public List<ChatGroupSummary> Groups { get; set; } = new();
    }

    public class ChatGroupSummary
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsPrivate { get; set; }
        public string? LastMessage { get; set; }
        public DateTime? LastMessageTime { get; set; }
        public string AvatarColor { get; set; } = "linear-gradient(135deg,#0d9488,#2563eb)";
        public string AvatarLetter { get; set; } = "G";
        public bool IsGroup { get; set; }
        public int UnreadCount { get; set; }
        public string? Tag { get; set; }
        public bool IsOnline { get; set; }
    }
}