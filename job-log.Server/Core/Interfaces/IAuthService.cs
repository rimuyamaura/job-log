using job_log.Server.Core.Dtos;
using job_log.Server.Core.Models;
using System.Security.Claims;

namespace job_log.Server.Core.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    }
}
