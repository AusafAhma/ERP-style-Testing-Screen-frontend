using System;

namespace ERPTestingApp.Models.Masters
{
    /// <summary>
    /// Represents a Party (Company/Customer) in the Party Master
    /// </summary>
    public class PartyMaster
    {
        public Guid Id { get; set; }
        public string PartyName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime CreatedDateTime { get; set; }
        public string Username { get; set; } = string.Empty;

        public PartyMaster()
        {
            Id = Guid.NewGuid();
            CreatedDateTime = DateTime.UtcNow;
            Username = Environment.UserName;
        }
    }
}
