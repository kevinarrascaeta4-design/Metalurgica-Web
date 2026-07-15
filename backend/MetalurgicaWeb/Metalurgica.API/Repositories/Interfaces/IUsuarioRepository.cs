using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> GetAllAsync(bool incluirInactivos = false);
        Task<Usuario?> GetByIdAsync(int id);
        Task<Usuario?> GetByIdWithRolAsync(int id);
        Task<IEnumerable<Usuario>> GetAllWithRolAsync(bool incluirInactivos = false);
        Task<bool> ExistsEmailAsync(string email);
        Task<bool> RolExistsAsync(int rolId);
        Task AddAsync(Usuario usuario);
        void Update(Usuario usuario);
        Task SaveChangesAsync();
    }
}
