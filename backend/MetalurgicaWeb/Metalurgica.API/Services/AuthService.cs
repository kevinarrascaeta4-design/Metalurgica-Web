using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Metalurgica.API.Data;
using Metalurgica.API.DTOs.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly MetalurgicaWebContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(MetalurgicaWebContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.Rol)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            // Mensaje genérico a propósito: no revelamos si el email existe o no,
            // para no darle información extra a quien intenta adivinar credenciales.
            if (usuario is null || !BCrypt.Net.BCrypt.Verify(dto.Password, usuario.ContraseñaHash))
                throw new UnauthorizedAccessException("Email o contraseña incorrectos.");

            if (!usuario.Activo)
                throw new UnauthorizedAccessException("El usuario está inactivo. Contactá a un administrador.");

            var jwtKey = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("Falta configurar 'Jwt:Key' en appsettings.json.");
            var jwtIssuer = _configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("Falta configurar 'Jwt:Issuer' en appsettings.json.");
            var jwtAudience = _configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("Falta configurar 'Jwt:Audience' en appsettings.json.");
            var expirationMinutes = _configuration.GetValue<int>("Jwt:ExpirationMinutes", 60);

            var rolNombre = usuario.Rol?.Nombre ?? string.Empty;

            var claims = new List<Claim>
            {
                new Claim("UsuarioId", usuario.UsuarioId.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim("RolNombre", rolNombre),
                new Claim(ClaimTypes.Role, rolNombre), // habilita [Authorize(Roles = "...")] a futuro
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiracion = DateTime.UtcNow.AddMinutes(expirationMinutes);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: expiracion,
                signingCredentials: credentials
            );

            return new LoginResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiracion,
                UsuarioId = usuario.UsuarioId,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                RolNombre = rolNombre
            };
        }
    }
}