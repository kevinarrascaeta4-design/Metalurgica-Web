using Metalurgica.API.Data;
using Metalurgica.API.DTOs.MovimientoStock;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class MovimientoStockService : IMovimientoStockService
    {
        private static readonly string[] TiposValidos = { "Entrada", "Salida" };

        private readonly IMovimientoStockRepository _repository;
        private readonly MetalurgicaWebContext _context;

        public MovimientoStockService(IMovimientoStockRepository repository, MetalurgicaWebContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<MovimientoStockResponseDto>> GetAllAsync(int? productoId = null)
        {
            var movimientos = await _repository.GetAllWithDetallesAsync(productoId);
            return movimientos.Select(m => MapToResponseDto(m, m.Producto?.StockActual ?? 0));
        }

        public async Task<MovimientoStockResponseDto?> GetByIdAsync(int id)
        {
            var movimiento = await _repository.GetByIdWithDetallesAsync(id);
            return movimiento is null ? null : MapToResponseDto(movimiento, movimiento.Producto?.StockActual ?? 0);
        }

        public async Task<MovimientoStockResponseDto> CreateAsync(MovimientoStockRequestDto dto)
        {
            if (!TiposValidos.Contains(dto.TipoMovimiento))
                throw new InvalidOperationException(
                    $"Tipo de movimiento '{dto.TipoMovimiento}' inválido. Valores permitidos: {string.Join(", ", TiposValidos)}.");

            var producto = await _repository.GetProductoAsync(dto.ProductoId);
            if (producto is null)
                throw new InvalidOperationException($"El producto con id {dto.ProductoId} no existe.");

            if (!await _repository.UsuarioExistsAsync(dto.UsuarioId))
                throw new InvalidOperationException($"El usuario con id {dto.UsuarioId} no existe o está inactivo.");

            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                if (dto.TipoMovimiento == "Salida")
                {
                    if (producto.StockActual < dto.Cantidad)
                        throw new InvalidOperationException(
                            $"Stock insuficiente para '{producto.Nombre}'. Disponible: {producto.StockActual}, solicitado: {dto.Cantidad}.");

                    producto.StockActual -= dto.Cantidad;
                }
                else // Entrada
                {
                    producto.StockActual += dto.Cantidad;
                }

                var movimiento = new MovimientoStock
                {
                    ProductoId = dto.ProductoId,
                    UsuarioId = dto.UsuarioId,
                    Fecha = DateTime.Now,
                    Cantidad = dto.Cantidad,
                    TipoMovimiento = dto.TipoMovimiento,
                    Motivo = dto.Motivo,
                    Observaciones = dto.Observaciones
                };

                await _repository.AddAsync(movimiento);
                await _repository.SaveChangesAsync();
                await transaction.CommitAsync();

                var creado = await _repository.GetByIdWithDetallesAsync(movimiento.MovimientoId);
                return MapToResponseDto(creado!, producto.StockActual);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private static MovimientoStockResponseDto MapToResponseDto(MovimientoStock movimiento, int stockResultante)
        {
            return new MovimientoStockResponseDto
            {
                MovimientoId = movimiento.MovimientoId,
                ProductoId = movimiento.ProductoId,
                ProductoNombre = movimiento.Producto?.Nombre ?? string.Empty,
                UsuarioId = movimiento.UsuarioId,
                UsuarioNombre = movimiento.Usuario?.Nombre ?? string.Empty,
                Fecha = movimiento.Fecha,
                Cantidad = movimiento.Cantidad,
                TipoMovimiento = movimiento.TipoMovimiento,
                Motivo = movimiento.Motivo,
                Observaciones = movimiento.Observaciones,
                StockResultante = stockResultante
            };
        }
    }
}
