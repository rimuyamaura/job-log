using job_log.Server.Core.Dtos;
using job_log.Server.Core.Models;
using System.Security.Claims;

namespace job_log.Server.Core.Interfaces
{
    public interface IJobApplicationService
    {
        Task<IEnumerable<GetJobApplicationDto>> GetMyJobApplicationsAsync(ClaimsPrincipal user);

        Task<GetJobApplicationDto> CreateJobApplicationAsync(CreateJobApplicationDto createJobApplicationDto);
    }
}
