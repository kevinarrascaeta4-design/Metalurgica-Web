using Metalurgica.API.DTOs.Rol;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IRolService
    {
        Task<IEnumerable<RolResponseDto>> GetAllAsync();
        Task<RolResponseDto?> GetByIdAsync(int id);
        Task<RolResponseDto> CreateAsync(RolRequestDto dto);
        Task<bool> UpdateAsync(int id, RolRequestDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
