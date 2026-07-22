using Metalurgica.API.DTOs.Auth;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
    }
}