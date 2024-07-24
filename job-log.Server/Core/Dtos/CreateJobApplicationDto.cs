using System.ComponentModel.DataAnnotations;

namespace job_log.Server.Core.Dtos
{
    public class CreateJobApplicationDto
    {
        [Required]
        public string Position { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        public string Status { get; set; }

        public string? Location { get; set; }
        public string? Salary { get; set; }
        public string? Url { get; set; }
        public string? Notes { get; set; }
    }
}
