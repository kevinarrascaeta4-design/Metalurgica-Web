using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IClienteRepository
    {
        Task<IEnumerable<Cliente>> GetAllAsync(bool incluirInactivos = false);
        Task<Cliente?> GetByIdAsync(int id);
        Task<bool> ExistsCuitAsync(string cuit);
        Task AddAsync(Cliente cliente);
        void Update(Cliente cliente);
        Task SaveChangesAsync();
    }
}
