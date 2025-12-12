using System;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a Class in the Class Master
    /// </summary>
    public class ClassMaster
    {
        public Guid Id { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        public ClassMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
