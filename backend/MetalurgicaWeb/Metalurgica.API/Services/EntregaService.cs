using Metalurgica.API.Data;
using Metalurgica.API.DTOs.Entrega;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Services
{
    public class EntregaService : IEntregaService
    {
        private static readonly string[] EstadosValidos =
            { "Pendiente", "En Camino", "Entregada", "Cancelada" };

        private readonly IEntregaRepository _repository;
        private readonly MetalurgicaWebContext _context;

        public EntregaService(IEntregaRepository repository, MetalurgicaWebContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<EntregaResponseDto>> GetAllAsync()
        {
            var entregas = await _repository.GetAllWithDetallesAsync();
            return entregas.Select(MapToResponseDto);
        }

        public async Task<EntregaResponseDto?> GetByIdAsync(int id)
        {
            var entrega = await _repository.GetByIdWithDetallesAsync(id);
            return entrega is null ? null : MapToResponseDto(entrega);
        }

        public async Task<EntregaResponseDto> CreateAsync(EntregaRequestDto dto)
        {
            if (!await _repository.PedidoExistsAsync(dto.PedidoId))
                throw new InvalidOperationException($"El pedido con id {dto.PedidoId} no existe.");

            if (!await _repository.UsuarioExistsAsync(dto.UsuarioId))
                throw new InvalidOperationException($"El usuario con id {dto.UsuarioId} no existe o está inactivo.");

            var entrega = new Entrega
            {
                PedidoId = dto.PedidoId,
                UsuarioId = dto.UsuarioId,
                Observaciones = dto.Observaciones,
                FechaEntrega = null,
                EstadoEntrega = "Pendiente"
            };

            await _repository.AddAsync(entrega);
            await _repository.SaveChangesAsync();

            var creada = await _repository.GetByIdWithDetallesAsync(entrega.EntregaId);
            return MapToResponseDto(creada!);
        }

        public async Task<bool> CambiarEstadoAsync(int id, CambiarEstadoEntregaDto dto)
        {
            if (!EstadosValidos.Contains(dto.NuevoEstado))
                throw new InvalidOperationException(
                    $"Estado '{dto.NuevoEstado}' inválido. Valores permitidos: {string.Join(", ", EstadosValidos)}.");

            var entrega = await _context.Entregas
                .Include(e => e.Pedido)
                .FirstOrDefaultAsync(e => e.EntregaId == id);

            if (entrega is null) return false;

            entrega.EstadoEntrega = dto.NuevoEstado;

            if (dto.Observaciones is not null)
                entrega.Observaciones = dto.Observaciones;

            if (dto.NuevoEstado == "Entregada")
            {
                entrega.FechaEntrega = DateTime.Now;

                // Sincronizamos el estado del pedido asociado
                if (entrega.Pedido is not null)
                {
                    entrega.Pedido.Estado = "Entregado";
                    entrega.Pedido.FechaModificacion = DateTime.Now;
                }
            }

            await _repository.SaveChangesAsync();
            return true;
        }

        private static EntregaResponseDto MapToResponseDto(Entrega entrega)
        {
            return new EntregaResponseDto
            {
                EntregaId = entrega.EntregaId,
                PedidoId = entrega.PedidoId,
                NumeroPedido = entrega.Pedido?.NumeroPedido ?? string.Empty,
                UsuarioId = entrega.UsuarioId,
                UsuarioNombre = entrega.Usuario?.Nombre ?? string.Empty,
                Observaciones = entrega.Observaciones,
                FechaEntrega = entrega.FechaEntrega,
                EstadoEntrega = entrega.EstadoEntrega
            };
        }
    }
}
