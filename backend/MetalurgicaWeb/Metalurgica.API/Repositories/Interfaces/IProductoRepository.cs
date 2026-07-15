using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IProductoRepository
    {
        Task<IEnumerable<Producto>> GetAllAsync();
        Task<Producto?> GetByIdAsync(int id);
        Task<Producto?> GetByCodigoAsync(string codigo);
        Task AddAsync(Producto producto);
        void Update(Producto producto);
        void Delete(Producto producto);
        Task<bool> ExistsCodigoAsync(string codigo);
        Task SaveChangesAsync();
    }
}
