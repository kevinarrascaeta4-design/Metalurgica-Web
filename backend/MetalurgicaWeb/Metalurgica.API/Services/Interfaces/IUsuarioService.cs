using Metalurgica.API.DTOs.Usuario;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioResponseDto>> GetAllAsync(bool incluirInactivos = false);
        Task<UsuarioResponseDto?> GetByIdAsync(int id);
        Task<UsuarioResponseDto> CreateAsync(UsuarioRequestDto dto);
        Task<bool> UpdateAsync(int id, UsuarioUpdateDto dto);
        Task<bool> DeactivateAsync(int id);
        Task<bool> ReactivateAsync(int id);
    }
}
