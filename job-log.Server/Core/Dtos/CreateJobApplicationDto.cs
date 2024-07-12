namespace job_log.Server.Core.Dtos
{
    public class CreateJobApplicationDto
    {
        public string Position { get; set; }
        public string Company { get; set; }
        public string Status { get; set; }

        public string? Location { get; set; }
        public string? Salary { get; set; }
        public string? Url { get; set; }
        public string? Notes { get; set; }
    }
}
