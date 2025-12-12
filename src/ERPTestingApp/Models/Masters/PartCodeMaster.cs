using System;
using ERPTestingApp.Models.Enums;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a Part Code in the Part Code Master
    /// </summary>
    public class PartCodeMaster
    {
        public Guid Id { get; set; }
        public string PartCode { get; set; } = string.Empty;
        public string ItemDescription { get; set; } = string.Empty;
        public decimal Ratio { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? VAId { get; set; }
        public LabelType LabelType { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        // Navigation properties (for display purposes)
        public string? ClassName { get; set; }
        public string? VAName { get; set; }

        public PartCodeMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
