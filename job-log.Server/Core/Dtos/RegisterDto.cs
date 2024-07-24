using System.ComponentModel.DataAnnotations;

namespace job_log.Server.Core.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        //[Required(ErrorMessage = "Password is required")]
        //[StringLength(100, ErrorMessage = "Password must be at least 6 characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

    }
}
