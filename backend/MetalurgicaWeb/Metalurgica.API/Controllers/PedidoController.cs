using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Pedido;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoService _service;

        public PedidoController(IPedidoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoResponseDto>>> GetAll()
        {
            var pedidos = await _service.GetAllAsync();
            return Ok(pedidos);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PedidoResponseDto>> GetById(int id)
        {
            var pedido = await _service.GetByIdAsync(id);
            if (pedido is null)
                return NotFound(new { mensaje = $"No se encontró el pedido con id {id}." });

            return Ok(pedido);
        }

        [HttpPost]
        public async Task<ActionResult<PedidoResponseDto>> Create([FromBody] PedidoRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.PedidoId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPatch("{id:int}/estado")]
        public async Task<IActionResult> CambiarEstado(int id, [FromBody] CambiarEstadoDto dto)
        {
            try
            {
                var actualizado = await _service.CambiarEstadoAsync(id, dto.NuevoEstado);
                if (!actualizado)
                    return NotFound(new { mensaje = $"No se encontró el pedido con id {id}." });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
