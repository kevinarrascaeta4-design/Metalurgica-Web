using Metalurgica.API.Data;
using Metalurgica.API.DTOs.Pedido;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Services
{
    public class PedidoService : IPedidoService
    {
        private static readonly string[] EstadosValidos =
            { "Pendiente", "Confirmado", "Cancelado", "Entregado" };

        private readonly IPedidoRepository _pedidoRepository;
        private readonly MetalurgicaWebContext _context;

        public PedidoService(IPedidoRepository pedidoRepository, MetalurgicaWebContext context)
        {
            _pedidoRepository = pedidoRepository;
            _context = context;
        }

        public async Task<IEnumerable<PedidoResponseDto>> GetAllAsync()
        {
            var pedidos = await _pedidoRepository.GetAllWithDetallesAsync();
            return pedidos.Select(MapToResponseDto);
        }

        public async Task<PedidoResponseDto?> GetByIdAsync(int id)
        {
            var pedido = await _pedidoRepository.GetByIdWithDetallesAsync(id);
            return pedido is null ? null : MapToResponseDto(pedido);
        }

        public async Task<PedidoResponseDto> CreateAsync(PedidoRequestDto dto)
        {
            if (!await _pedidoRepository.ClienteExistsAsync(dto.ClienteId))
                throw new InvalidOperationException($"El cliente con id {dto.ClienteId} no existe o está inactivo.");

            // Transacción: si algo falla acá adentro, no queda nada guardado a medias
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var pedido = new Pedido
                {
                    ClienteId = dto.ClienteId,
                    NumeroPedido = (await _pedidoRepository.GetUltimoNumeroPedidoAsync() + 1).ToString(),
                    Estado = "Pendiente",
                    FechaCreacion = DateTime.Now,
                    FechaModificacion = DateTime.Now
                };

                foreach (var item in dto.Detalles)
                {
                    var producto = await _context.Productos
                        .FirstOrDefaultAsync(p => p.ProductoId == item.ProductoId);

                    if (producto is null)
                        throw new InvalidOperationException($"El producto con id {item.ProductoId} no existe.");

                    if (!producto.Activo)
                        throw new InvalidOperationException($"El producto '{producto.Nombre}' no está activo.");

                    if (producto.StockActual < item.Cantidad)
                        throw new InvalidOperationException(
                            $"Stock insuficiente para '{producto.Nombre}'. Disponible: {producto.StockActual}, solicitado: {item.Cantidad}.");

                    var subTotal = producto.Precio * item.Cantidad;

                    pedido.DetallePedidos.Add(new DetallePedido
                    {
                        ProductoId = producto.ProductoId,
                        Cantidad = item.Cantidad,
                        PrecioUnitario = producto.Precio,
                        SubTotal = subTotal
                    });

                    // Descontamos stock reservado para el pedido
                    producto.StockActual -= item.Cantidad;
                }

                await _pedidoRepository.AddAsync(pedido);
                await _pedidoRepository.SaveChangesAsync();
                await transaction.CommitAsync();

                var creado = await _pedidoRepository.GetByIdWithDetallesAsync(pedido.PedidoId);
                return MapToResponseDto(creado!);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> CambiarEstadoAsync(int id, string nuevoEstado)
        {
            if (!EstadosValidos.Contains(nuevoEstado))
                throw new InvalidOperationException(
                    $"Estado '{nuevoEstado}' inválido. Valores permitidos: {string.Join(", ", EstadosValidos)}.");

            var pedido = await _context.Pedidos.FirstOrDefaultAsync(p => p.PedidoId == id);
            if (pedido is null) return false;

            pedido.Estado = nuevoEstado;
            pedido.FechaModificacion = DateTime.Now;

            await _pedidoRepository.SaveChangesAsync();
            return true;
        }

        private static PedidoResponseDto MapToResponseDto(Pedido pedido)
        {
            return new PedidoResponseDto
            {
                PedidoId = pedido.PedidoId,
                NumeroPedido = pedido.NumeroPedido,
                ClienteId = pedido.ClienteId,
                ClienteRazonSocial = pedido.Cliente?.RazonSocial ?? string.Empty,
                Estado = pedido.Estado,
                FechaCreacion = pedido.FechaCreacion,
                FechaModificacion = pedido.FechaModificacion,
                Total = pedido.DetallePedidos.Sum(d => d.SubTotal),
                Detalles = pedido.DetallePedidos.Select(d => new DTOs.Pedido.DetallePedidoItemResponseDto
                {
                    DetallePedidoId = d.DetallePedidoId,
                    ProductoId = d.ProductoId,
                    ProductoNombre = d.Producto?.Nombre ?? string.Empty,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario,
                    SubTotal = d.SubTotal
                }).ToList()
            };
        }
    }
}
