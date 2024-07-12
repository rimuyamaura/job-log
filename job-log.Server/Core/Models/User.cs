using Microsoft.AspNetCore.Identity;

namespace job_log.Server.Core.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
