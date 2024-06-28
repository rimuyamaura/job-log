using System.ComponentModel.DataAnnotations.Schema;

namespace job_log.Server.Dtos
{
    public class CreateUpdateJobApplication
    {
        public string User { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Status { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }
        public string? Location { get; set; }
        public string? URL { get; set; }
        public string? Description { get; set; }
    }
}
