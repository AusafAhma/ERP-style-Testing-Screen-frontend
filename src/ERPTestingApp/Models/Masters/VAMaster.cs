using System;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a VA (Volt-Ampere) rating in the VA Master
    /// </summary>
    public class VAMaster
    {
        public Guid Id { get; set; }
        public string VAName { get; set; } = string.Empty;
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        public VAMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
