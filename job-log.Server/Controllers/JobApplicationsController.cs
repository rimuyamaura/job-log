using job_log.Server.Context;
using job_log.Server.Dtos;
using job_log.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace job_log.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly JobLogDBContext _context;

        public JobApplicationsController(JobLogDBContext context)
        {
            _context = context;
        }

        // CRUD operations
        [HttpPost]
        public async Task<IActionResult> CreateJobApplication([FromBody] CreateUpdateJobApplication dto)
        {
            var newJobApplication = new JobApplication()
            {
                User = dto.User,
                Company = dto.Company,
                Position = dto.Position,
                Status = dto.Status,
                Salary = dto.Salary,
                Location = dto.Location,
                URL = dto.URL,
                Description = dto.Description
            };
            await _context.JobApplications.AddAsync(newJobApplication);
            await _context.SaveChangesAsync();

            return Ok("Job Application Saved Successfully");
        }

        [HttpGet]
        public async Task<ActionResult<List<JobApplication>>> GetJobApplications()
        {
            var jobApplications = await _context.JobApplications.ToListAsync();

            return Ok(jobApplications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetJobApplicationByID(long id)
        {
            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);

            if (jobApplication == null)
            {
                return NotFound("Job Application Not Found");
            }
            return Ok(jobApplication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobApplication(long id, [FromBody] CreateUpdateJobApplication dto)
        {
            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);

            if (jobApplication == null)
            {
                return NotFound("Job Application Not Found");
            }

            jobApplication.User = dto.User;
            jobApplication.Company = dto.Company;
            jobApplication.Position = dto.Position;
            jobApplication.Status = dto.Status;
            jobApplication.Salary = dto.Salary;
            jobApplication.Location = dto.Location;
            jobApplication.URL = dto.URL;
            jobApplication.Description = dto.Description;

            await _context.SaveChangesAsync();

            return Ok("Job Application Updated Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobApplication(long id)
        {
            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);

            if (jobApplication == null)
            {
                return NotFound("Job Application Not Found");
            }

            _context.JobApplications.Remove(jobApplication);
            await _context.SaveChangesAsync();

            return Ok("Job Application Deleted Successfully");
        }
    }
}
