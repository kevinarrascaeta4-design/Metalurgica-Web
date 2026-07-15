using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly MetalurgicaWebContext _context;

        public ProductoRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Producto>> GetAllAsync()
        {
            return await _context.Productos.AsNoTracking().ToListAsync();
        }

        public async Task<Producto?> GetByIdAsync(int id)
        {
            return await _context.Productos.FindAsync(id);
        }

        public async Task<Producto?> GetByCodigoAsync(string codigo)
        {
            return await _context.Productos
                .FirstOrDefaultAsync(p => p.Codigo == codigo);
        }

        public async Task AddAsync(Producto producto)
        {
            await _context.Productos.AddAsync(producto);
        }

        public void Update(Producto producto)
        {
            _context.Productos.Update(producto);
        }

        public void Delete(Producto producto)
        {
            _context.Productos.Remove(producto);
        }

        public async Task<bool> ExistsCodigoAsync(string codigo)
        {
            return await _context.Productos.AnyAsync(p => p.Codigo == codigo);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
