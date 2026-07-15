using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class RolRepository : IRolRepository
    {
        private readonly MetalurgicaWebContext _context;

        public RolRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Rol>> GetAllAsync()
        {
            return await _context.Rols.AsNoTracking().ToListAsync();
        }

        public async Task<Rol?> GetByIdAsync(int id)
        {
            return await _context.Rols.FindAsync(id);
        }

        public async Task<bool> ExistsNombreAsync(string nombre)
        {
            return await _context.Rols.AnyAsync(r => r.Nombre == nombre);
        }

        public async Task<int> CountUsuariosAsync(int rolId)
        {
            return await _context.Usuarios.CountAsync(u => u.RolId == rolId);
        }

        public async Task AddAsync(Rol rol)
        {
            await _context.Rols.AddAsync(rol);
        }

        public void Update(Rol rol)
        {
            _context.Rols.Update(rol);
        }

        public void Delete(Rol rol)
        {
            _context.Rols.Remove(rol);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
