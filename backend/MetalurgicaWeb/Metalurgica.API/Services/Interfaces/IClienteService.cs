using Metalurgica.API.DTOs.Cliente;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IClienteService
    {
        Task<IEnumerable<ClienteResponseDto>> GetAllAsync(bool incluirInactivos = false);
        Task<ClienteResponseDto?> GetByIdAsync(int id);
        Task<ClienteResponseDto> CreateAsync(ClienteRequestDto dto);
        Task<bool> UpdateAsync(int id, ClienteRequestDto dto);
        Task<bool> DeactivateAsync(int id);
        Task<bool> ReactivateAsync(int id);
    }
}