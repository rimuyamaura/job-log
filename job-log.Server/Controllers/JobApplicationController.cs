using job_log.Server.Core.Dtos;
using job_log.Server.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_log.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobApplicationController : ControllerBase
    {
        private readonly IJobApplicationService _jobApplicationService;

        public JobApplicationController(IJobApplicationService jobApplicationService)
        {
            _jobApplicationService = jobApplicationService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetJobApplicationDto>>> GetJobApplications()
        {
            var jobApplications = await _jobApplicationService.GetJobApplicationsAsync(User);
            return Ok(jobApplications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetJobApplicationDto>> GetJobApplicationById(int id)
        {
            var jobApplication = await _jobApplicationService.GetJobApplicationByIdAsync(User, id);
            if (jobApplication == null)
            {
                return NotFound("Job application not found");
            }
            return Ok(jobApplication);
        }

        [HttpPost]
        public async Task<ActionResult<GetJobApplicationDto>> CreateJobApplication(CreateJobApplicationDto createJobApplicationDto)
        {
            var jobApplication = await _jobApplicationService.CreateJobApplicationAsync(User, createJobApplicationDto);
            return Ok(jobApplication);
        }

        [HttpPut]
        public async Task<ActionResult<GetJobApplicationDto>> UpdateJobApplication(int id, CreateJobApplicationDto updatedApplicationDto)
        {
            var jobApplication = await _jobApplicationService.UpdateJobApplicationAsync(User, id, updatedApplicationDto);
            return Ok(jobApplication);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteJobApplication(int id)
        {
            var result = await _jobApplicationService.DeleteJobApplicationAsync(User, id);
            if (!result)
            {
                return NotFound("Job application not found");
            }
            return Ok(result);
        }
    }
        
}
