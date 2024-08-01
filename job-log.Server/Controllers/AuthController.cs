using job_log.Server.Core.Dtos;
using job_log.Server.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace job_log.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {

            var result = await _authService.RegisterAsync(registerDto);
            return StatusCode(result.StatusCode, result.Message);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, result.Message);
            }
            return Ok(result.AuthResponse);
        }
        
        [HttpGet("user")]
        [Authorize]
        public async Task<ActionResult<UserInfoDto>> GetUser()
        {
            var user = await _authService.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

    }
}
