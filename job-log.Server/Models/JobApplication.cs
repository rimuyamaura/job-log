using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace job_log.Server.Models
{
    public class JobApplication
    {
        [Key]
        public long Id { get; set; }
        public string User { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Status { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }
        public string? Location { get; set; }
        public string? URL { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
