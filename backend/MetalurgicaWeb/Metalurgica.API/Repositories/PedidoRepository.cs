using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly MetalurgicaWebContext _context;

        public PedidoRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pedido>> GetAllWithDetallesAsync()
        {
            return await _context.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.DetallePedidos)
                    .ThenInclude(d => d.Producto)
                .AsNoTracking()
                .OrderByDescending(p => p.FechaCreacion)
                .ToListAsync();
        }

        public async Task<Pedido?> GetByIdWithDetallesAsync(int id)
        {
            return await _context.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.DetallePedidos)
                    .ThenInclude(d => d.Producto)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PedidoId == id);
        }

        public async Task<bool> ClienteExistsAsync(int clienteId)
        {
            return await _context.Clientes.AnyAsync(c => c.ClienteId == clienteId && c.Activo);
        }

        public async Task<int> GetUltimoNumeroPedidoAsync()
        {
            var ultimo = await _context.Pedidos
                .OrderByDescending(p => p.PedidoId)
                .Select(p => p.NumeroPedido)
                .FirstOrDefaultAsync();

            if (ultimo is null || !int.TryParse(ultimo, out var numero))
                return 1000; // punto de partida si la tabla está vacía

            return numero;
        }

        public async Task AddAsync(Pedido pedido)
        {
            await _context.Pedidos.AddAsync(pedido);
        }

        public void Update(Pedido pedido)
        {
            _context.Pedidos.Update(pedido);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
