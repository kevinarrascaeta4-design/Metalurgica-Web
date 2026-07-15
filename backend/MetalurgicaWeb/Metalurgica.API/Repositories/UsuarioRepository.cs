using Microsoft.EntityFrameworkCore;
using Metalurgica.API.Data;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;

namespace Metalurgica.API.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly MetalurgicaWebContext _context;

        public UsuarioRepository(MetalurgicaWebContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync(bool incluirInactivos = false)
        {
            var query = _context.Usuarios.AsNoTracking();
            if (!incluirInactivos)
                query = query.Where(u => u.Activo);

            return await query.ToListAsync();
        }

        public async Task<Usuario?> GetByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario?> GetByIdWithRolAsync(int id)
        {
            return await _context.Usuarios
                .Include(u => u.Rol)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.UsuarioId == id);
        }

        public async Task<IEnumerable<Usuario>> GetAllWithRolAsync(bool incluirInactivos = false)
        {
            var query = _context.Usuarios.Include(u => u.Rol).AsNoTracking();
            if (!incluirInactivos)
                query = query.Where(u => u.Activo);

            return await query.ToListAsync();
        }

        public async Task<bool> ExistsEmailAsync(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> RolExistsAsync(int rolId)
        {
            return await _context.Rols.AnyAsync(r => r.RolId == rolId);
        }

        public async Task AddAsync(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
        }

        public void Update(Usuario usuario)
        {
            _context.Usuarios.Update(usuario);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
