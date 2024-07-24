namespace job_log.Server.Core.Dtos
{
    public class ServiceResponseDto
    {
        public bool IsSuccess { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public AuthResponseDto? AuthResponse { get; set; }
    }
}
