using Metalurgica.API.Models;

namespace Metalurgica.API.Repositories.Interfaces
{
    public interface IEntregaRepository
    {
        Task<IEnumerable<Entrega>> GetAllWithDetallesAsync();
        Task<Entrega?> GetByIdWithDetallesAsync(int id);
        Task<bool> PedidoExistsAsync(int pedidoId);
        Task<bool> UsuarioExistsAsync(int usuarioId);
        Task AddAsync(Entrega entrega);
        void Update(Entrega entrega);
        Task SaveChangesAsync();
    }
}
