using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IRolRepository
    {
        Task<IEnumerable<Rol>> GetAllAsync();
        Task<Rol?> GetByIdAsync(int id);
        Task<bool> ExistsNombreAsync(string nombre);
        Task<int> CountUsuariosAsync(int rolId);
        Task AddAsync(Rol rol);
        void Update(Rol rol);
        void Delete(Rol rol);
        Task SaveChangesAsync();
    }
}
