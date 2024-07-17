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

        public AuthService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        public async Task<bool> RegisterAsync(RegisterDto registerDto)
        {
            var isUserExist = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isUserExist != null)
            {
                throw new Exception("User already exists"); // maybe implement custom exceptions
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
                throw new Exception("User creation failed! Please check user details and try again.");
            }

            return true;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
            {
                throw new Exception("Invalid password");
            }

            var token = await GenerateJWTTokenAsync(user);

            return new AuthResponseDto
            {
                UserName = user.UserName,
                Token = token
            };
        }

        private async Task<string> GenerateJWTTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")));
            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
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
