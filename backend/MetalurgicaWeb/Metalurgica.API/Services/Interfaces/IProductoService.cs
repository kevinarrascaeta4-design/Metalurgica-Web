using Metalurgica.API.DTOs.Producto;

namespace Metalurgica.API.Services.Interfaces
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoResponseDto>> GetAllAsync();
        Task<ProductoResponseDto?> GetByIdAsync(int id);
        Task<ProductoResponseDto?> GetByCodigoAsync(string codigo);
        Task<ProductoResponseDto> CreateAsync(ProductoRequestDto dto);
        Task<bool> UpdateAsync(int id, ProductoRequestDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
