using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.MovimientoStock;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimientoStockController : ControllerBase
    {
        private readonly IMovimientoStockService _service;

        public MovimientoStockController(IMovimientoStockService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovimientoStockResponseDto>>> GetAll([FromQuery] int? productoId = null)
        {
            var movimientos = await _service.GetAllAsync(productoId);
            return Ok(movimientos);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovimientoStockResponseDto>> GetById(int id)
        {
            var movimiento = await _service.GetByIdAsync(id);
            if (movimiento is null)
                return NotFound(new { mensaje = $"No se encontró el movimiento con id {id}." });

            return Ok(movimiento);
        }

        [HttpPost]
        public async Task<ActionResult<MovimientoStockResponseDto>> Create([FromBody] MovimientoStockRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.MovimientoId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }
    }
}
