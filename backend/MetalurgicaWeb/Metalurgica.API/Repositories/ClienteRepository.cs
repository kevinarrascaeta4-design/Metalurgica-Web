using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly MetalurgicaWebContext _context;

        public ClienteRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cliente>> GetAllAsync(bool incluirInactivos = false)
        {
            var query = _context.Clientes.AsNoTracking();

            if (!incluirInactivos)
                query = query.Where(c => c.Activo);

            return await query.ToListAsync();
        }

        public async Task<Cliente?> GetByIdAsync(int id)
        {
            return await _context.Clientes.FindAsync(id);
        }

        public async Task<bool> ExistsCuitAsync(string cuit)
        {
            return await _context.Clientes.AnyAsync(c => c.Cuit == cuit);
        }

        public async Task AddAsync(Cliente cliente)
        {
            await _context.Clientes.AddAsync(cliente);
        }

        public void Update(Cliente cliente)
        {
            _context.Clientes.Update(cliente);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
