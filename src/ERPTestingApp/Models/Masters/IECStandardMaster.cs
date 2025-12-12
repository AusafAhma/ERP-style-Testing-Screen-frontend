using System;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents an IEC Standard in the IEC Standard Master
    /// </summary>
    public class IECStandardMaster
    {
        public Guid Id { get; set; }
        public string IECStandard { get; set; } = string.Empty;
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        public IECStandardMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
