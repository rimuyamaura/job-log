using job_log.Server.Core.Data;
using job_log.Server.Core.Dtos;
using job_log.Server.Core.Interfaces;
using job_log.Server.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace job_log.Server.Core.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly ApplicationDbContext _context;

        public JobApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetJobApplicationDto>> GetJobApplicationsAsync(ClaimsPrincipal user)
        {
            var currentUser = user.Identity.Name;

            var jobApplications = await _context.JobApplications.Where(j => j.UserName == currentUser).ToListAsync();

            return jobApplications.Select(j => new GetJobApplicationDto
            {
                Id = j.Id,
                Position = j.Position,
                Company = j.Company,
                Status = j.Status,
                Location = j.Location,
                Salary = j.Salary,
                Url = j.Url,
                Notes = j.Notes,
                UpdatedAt = j.UpdatedAt
            });
        }

        public async Task<GetJobApplicationDto?> GetJobApplicationByIdAsync(ClaimsPrincipal user, int id)
        {
            var currentUser = user.Identity.Name;

            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.UserName == currentUser && j.Id == id);
            if (jobApplication == null)
            {
                return null;
            }

            return new GetJobApplicationDto
            {
                Id = jobApplication.Id,
                Position = jobApplication.Position,
                Company = jobApplication.Company,
                Status = jobApplication.Status,
                Location = jobApplication.Location,
                Salary = jobApplication.Salary,
                Url = jobApplication.Url,
                Notes = jobApplication.Notes,
                UpdatedAt = jobApplication.UpdatedAt
            };
        }

        public async Task<GetJobApplicationDto> CreateJobApplicationAsync(ClaimsPrincipal user, CreateJobApplicationDto createJobApplicationDto)
        {
            JobApplication newJobApplication = new JobApplication
            {
                Position = createJobApplicationDto.Position,
                Company = createJobApplicationDto.Company,
                Status = createJobApplicationDto.Status,
                Location = createJobApplicationDto.Location,
                Salary = createJobApplicationDto.Salary,
                Url = createJobApplicationDto.Url,
                Notes = createJobApplicationDto.Notes,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserName = user.Identity.Name
            };

            await _context.JobApplications.AddAsync(newJobApplication);
            await _context.SaveChangesAsync();

            return new GetJobApplicationDto
            {
                Id = newJobApplication.Id,
                Position = newJobApplication.Position,
                Company = newJobApplication.Company,
                Status = newJobApplication.Status,
                Location = newJobApplication.Location,
                Salary = newJobApplication.Salary,
                Url = newJobApplication.Url,
                Notes = newJobApplication.Notes,
                UpdatedAt = newJobApplication.UpdatedAt,
            };
        }

        public async Task<bool> DeleteJobApplicationAsync(ClaimsPrincipal user, int id)
        {
            var currentUser = user.Identity.Name;

            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.UserName == currentUser && j.Id == id);
            if (jobApplication == null)
            {
                return false;
            }

            _context.JobApplications.Remove(jobApplication);
            await _context.SaveChangesAsync();

            return true; // maybe create a general response dto for this
        }

        public async Task<GetJobApplicationDto> UpdateJobApplicationAsync(ClaimsPrincipal user, int id, CreateJobApplicationDto updatedApplicationDto)
        {
            var currentUser = user.Identity.Name;

            var jobApplication = await _context.JobApplications.FirstOrDefaultAsync(j => j.UserName == currentUser && j.Id == id);
            if (jobApplication == null)
            {
                throw new Exception("Job application not found");
            }

            jobApplication.Position = updatedApplicationDto.Position;
            jobApplication.Company = updatedApplicationDto.Company;
            jobApplication.Status = updatedApplicationDto.Status;
            jobApplication.Location = updatedApplicationDto.Location;
            jobApplication.Salary = updatedApplicationDto.Salary;
            jobApplication.Url = updatedApplicationDto.Url;
            jobApplication.Notes = updatedApplicationDto.Notes;
            jobApplication.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return new GetJobApplicationDto
            {
                Id = jobApplication.Id,
                Position = jobApplication.Position,
                Company = jobApplication.Company,
                Status = jobApplication.Status,
                Location = jobApplication.Location,
                Salary = jobApplication.Salary,
                Url = jobApplication.Url,
                Notes = jobApplication.Notes,
                UpdatedAt = jobApplication.UpdatedAt
            };
        }
    }
}
