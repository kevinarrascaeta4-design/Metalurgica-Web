using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class MovimientoStockRepository : IMovimientoStockRepository
    {
        private readonly MetalurgicaWebContext _context;

        public MovimientoStockRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MovimientoStock>> GetAllWithDetallesAsync(int? productoId = null)
        {
            var query = _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .AsNoTracking()
                .AsQueryable();

            if (productoId.HasValue)
                query = query.Where(m => m.ProductoId == productoId.Value);

            return await query.OrderByDescending(m => m.Fecha).ToListAsync();
        }

        public async Task<MovimientoStock?> GetByIdWithDetallesAsync(int id)
        {
            return await _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.MovimientoId == id);
        }

        public async Task<Producto?> GetProductoAsync(int productoId)
        {
            return await _context.Productos.FirstOrDefaultAsync(p => p.ProductoId == productoId);
        }

        public async Task<bool> UsuarioExistsAsync(int usuarioId)
        {
            return await _context.Usuarios.AnyAsync(u => u.UsuarioId == usuarioId && u.Activo);
        }

        public async Task AddAsync(MovimientoStock movimiento)
        {
            await _context.MovimientoStocks.AddAsync(movimiento);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
