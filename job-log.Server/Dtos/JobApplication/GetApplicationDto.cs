namespace job_log.Server.Dtos.JobApplication
{
    public class GetApplicationDto
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string? UserName { get; set; }


    }
}
