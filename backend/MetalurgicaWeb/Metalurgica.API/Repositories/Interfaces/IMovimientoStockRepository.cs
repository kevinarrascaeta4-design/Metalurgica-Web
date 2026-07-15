using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IMovimientoStockRepository
    {
        Task<IEnumerable<MovimientoStock>> GetAllWithDetallesAsync(int? productoId = null);
        Task<MovimientoStock?> GetByIdWithDetallesAsync(int id);
        Task<Producto?> GetProductoAsync(int productoId);
        Task<bool> UsuarioExistsAsync(int usuarioId);
        Task AddAsync(MovimientoStock movimiento);
        Task SaveChangesAsync();
    }
}
