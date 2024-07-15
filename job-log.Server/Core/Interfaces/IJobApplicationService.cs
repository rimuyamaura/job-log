﻿using job_log.Server.Core.Dtos;
using job_log.Server.Core.Models;
using System.Security.Claims;

namespace job_log.Server.Core.Interfaces
{
    public interface IJobApplicationService
    {
        Task<IEnumerable<GetJobApplicationDto>> GetMyJobApplicationsAsync(ClaimsPrincipal user);

        Task<GetJobApplicationDto> GetJobApplicationByIdAsync(ClaimsPrincipal user, int id);


        Task<GetJobApplicationDto> CreateJobApplicationAsync(ClaimsPrincipal user, CreateJobApplicationDto createJobApplicationDto);

        Task<GetJobApplicationDto> UpdateJobApplicationAsync(ClaimsPrincipal user, int id, JobApplication jobApplication);

        Task<bool> DeleteJobApplicationAsync(ClaimsPrincipal user, int id);

        // Add feature to search job applications
        // Task<IEnumerable<GetJobApplicationDto>> SearchJobApplicationsAsync(ClaimsPrincipal user, string searchTerm);
    }
}