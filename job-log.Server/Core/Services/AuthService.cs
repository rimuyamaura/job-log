using job_log.Server.Core.Dtos;
using job_log.Server.Core.Interfaces;
using job_log.Server.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace job_log.Server.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;

        public AuthService(UserManager<User> userManager)
        {
            _userManager = userManager;
            // cache env variables to avoid multiple fetch calls
            _jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
            _jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            _jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        }


        public async Task<ServiceResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isUserExist = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isUserExist != null)
            {
                return new ServiceResponseDto
                {
                    IsSuccess = false,
                    StatusCode = 400,
                    Message = "User already exists."
                };
            }

            var newUser = new User
            {
                UserName = registerDto.UserName, 
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(" ", result.Errors.Select(e => $"#{e.Description}"));
                return new ServiceResponseDto()
                {
                    IsSuccess = false,
                    StatusCode = 400,
                    Message = $"User creation failed: {errors}"
                };
            }

            return new ServiceResponseDto()
            {
                IsSuccess = true,
                StatusCode = 201,
                Message = "User created successfully"
            };
        }

        public async Task<ServiceResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {
                return new ServiceResponseDto
                {
                    IsSuccess = false,
                    StatusCode = 404,
                    Message = "User not found."
                };
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
            {
                return new ServiceResponseDto
                {
                    IsSuccess = false,
                    StatusCode = 400,
                    Message = "Invalid password."
                };
            }

            var token = await GenerateJWTTokenAsync(user);

            return new ServiceResponseDto
            {
                IsSuccess = true,
                StatusCode = 200,
                Message = "Login successful",
                AuthResponse = new AuthResponseDto
                {
                    UserName = user.UserName,
                    Token = token
                }
            };
        }

        public async Task<UserInfoDto?> GetUserAsync(ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return null;
            }

            var currentUser = await _userManager.FindByIdAsync(userId);
            if (currentUser == null)
            {
                return null;
            }

            return new UserInfoDto
            {
                Id = currentUser.Id,
                UserName = currentUser.UserName,
                FirstName = currentUser.FirstName,
                LastName = currentUser.LastName,
                Email = currentUser.Email,
                CreatedAt = currentUser.CreatedAt,

            };
        }

        private async Task<string> GenerateJWTTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtIssuer,
                audience: _jwtAudience,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(3),
                claims: claims,
                signingCredentials: signingCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }


    }
}
