using Metalurgica.API.DTOs.Pedido;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IPedidoService
    {
        Task<IEnumerable<PedidoResponseDto>> GetAllAsync();
        Task<PedidoResponseDto?> GetByIdAsync(int id);
        Task<PedidoResponseDto> CreateAsync(PedidoRequestDto dto);
        Task<bool> CambiarEstadoAsync(int id, string nuevoEstado);
    }
}
