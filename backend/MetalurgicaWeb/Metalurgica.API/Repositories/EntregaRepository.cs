using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class EntregaRepository : IEntregaRepository
    {
        private readonly MetalurgicaWebContext _context;

        public EntregaRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Entrega>> GetAllWithDetallesAsync()
        {
            return await _context.Entregas
                .Include(e => e.Pedido)
                .Include(e => e.Usuario)
                .AsNoTracking()
                .OrderByDescending(e => e.EntregaId)
                .ToListAsync();
        }

        public async Task<Entrega?> GetByIdWithDetallesAsync(int id)
        {
            return await _context.Entregas
                .Include(e => e.Pedido)
                .Include(e => e.Usuario)
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.EntregaId == id);
        }

        public async Task<bool> PedidoExistsAsync(int pedidoId)
        {
            return await _context.Pedidos.AnyAsync(p => p.PedidoId == pedidoId);
        }

        public async Task<bool> UsuarioExistsAsync(int usuarioId)
        {
            return await _context.Usuarios.AnyAsync(u => u.UsuarioId == usuarioId && u.Activo);
        }

        public async Task AddAsync(Entrega entrega)
        {
            await _context.Entregas.AddAsync(entrega);
        }

        public void Update(Entrega entrega)
        {
            _context.Entregas.Update(entrega);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
