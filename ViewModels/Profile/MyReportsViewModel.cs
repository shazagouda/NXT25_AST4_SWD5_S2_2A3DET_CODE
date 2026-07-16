using A3DET_CODE.Models;
using System.Collections.Generic;

namespace A3DET_CODE.ViewModels.Profile
{
    public class MyReportsViewModel
    {
        public List<Report> SubmittedReports { get; set; } = new List<Report>();
        public List<Report> ReceivedReports { get; set; } = new List<Report>();
    }
}
