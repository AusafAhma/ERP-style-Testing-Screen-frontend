using System;
using ERPTestingApp.Models.Enums;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a Model in the Model Master
    /// </summary>
    public class ModelMaster
    {
        public Guid Id { get; set; }
        public string ModelName { get; set; } = string.Empty;
        public decimal Ratio { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? VAId { get; set; }
        public Phase Phase { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        // Navigation properties (for display purposes)
        public string? ClassName { get; set; }
        public string? VAName { get; set; }

        public ModelMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
