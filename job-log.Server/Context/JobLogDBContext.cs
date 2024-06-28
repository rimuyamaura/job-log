using job_log.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace job_log.Server.Context
{
    public class JobLogDBContext : DbContext
    {
        public JobLogDBContext(DbContextOptions<JobLogDBContext> options) : base(options)
        {
        }

        public DbSet<JobApplication> JobApplications { get; set; }
    }
}
