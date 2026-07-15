using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IPedidoRepository
    {
        Task<IEnumerable<Pedido>> GetAllWithDetallesAsync();
        Task<Pedido?> GetByIdWithDetallesAsync(int id);
        Task<bool> ClienteExistsAsync(int clienteId);
        Task<int> GetUltimoNumeroPedidoAsync();
        Task AddAsync(Pedido pedido);
        void Update(Pedido pedido);
        Task SaveChangesAsync();
    }
}
