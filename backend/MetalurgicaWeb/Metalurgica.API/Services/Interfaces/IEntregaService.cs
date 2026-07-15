using Metalurgica.API.DTOs.Entrega;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IEntregaService
    {
        Task<IEnumerable<EntregaResponseDto>> GetAllAsync();
        Task<EntregaResponseDto?> GetByIdAsync(int id);
        Task<EntregaResponseDto> CreateAsync(EntregaRequestDto dto);
        Task<bool> CambiarEstadoAsync(int id, CambiarEstadoEntregaDto dto);
    }
}
