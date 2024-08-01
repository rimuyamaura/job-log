using job_log.Server.Core.Dtos;
using job_log.Server.Core.Models;
using System.Security.Claims;

namespace job_log.Server.Core.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<ServiceResponseDto> LoginAsync(LoginDto loginDto);
        Task<UserInfoDto?> GetUserAsync(ClaimsPrincipal user);
    }
}
