using Metalurgica.API.DTOs.MovimientoStock;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IMovimientoStockService
    {
        Task<IEnumerable<MovimientoStockResponseDto>> GetAllAsync(int? productoId = null);
        Task<MovimientoStockResponseDto?> GetByIdAsync(int id);
        Task<MovimientoStockResponseDto> CreateAsync(MovimientoStockRequestDto dto);
    }
}
