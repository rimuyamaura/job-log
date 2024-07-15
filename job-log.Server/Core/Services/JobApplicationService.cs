using job_log.Server.Core.Dtos;
using job_log.Server.Core.Interfaces;
using job_log.Server.Core.Models;
using System.Security.Claims;

namespace job_log.Server.Core.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        public Task<GetJobApplicationDto> CreateJobApplicationAsync(ClaimsPrincipal user, CreateJobApplicationDto createJobApplicationDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteJobApplicationAsync(ClaimsPrincipal user, int id)
        {
            throw new NotImplementedException();
        }

        public Task<GetJobApplicationDto> GetJobApplicationByIdAsync(ClaimsPrincipal user, int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GetJobApplicationDto>> GetMyJobApplicationsAsync(ClaimsPrincipal user)
        {
            throw new NotImplementedException();
        }

        public Task<GetJobApplicationDto> UpdateJobApplicationAsync(ClaimsPrincipal user, int id, JobApplication jobApplication)
        {
            throw new NotImplementedException();
        }
    }
}
