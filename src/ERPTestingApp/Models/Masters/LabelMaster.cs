using System;
using ERPTestingApp.Models.Enums;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a Label configuration in the Label Master
    /// </summary>
    public class LabelMaster
    {
        public Guid Id { get; set; }
        public LabelType LabelType { get; set; }
        public string LabelLink { get; set; } = string.Empty; // URL or file path
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        public LabelMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
