using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Entrega;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntregaController : ControllerBase
    {
        private readonly IEntregaService _service;

        public EntregaController(IEntregaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaResponseDto>>> GetAll()
        {
            var entregas = await _service.GetAllAsync();
            return Ok(entregas);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EntregaResponseDto>> GetById(int id)
        {
            var entrega = await _service.GetByIdAsync(id);
            if (entrega is null)
                return NotFound(new { mensaje = $"No se encontró la entrega con id {id}." });

            return Ok(entrega);
        }

        [HttpPost]
        public async Task<ActionResult<EntregaResponseDto>> Create([FromBody] EntregaRequestDto dto)
        {
            try
            {
                var creada = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creada.EntregaId }, creada);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPatch("{id:int}/estado")]
        public async Task<IActionResult> CambiarEstado(int id, [FromBody] CambiarEstadoEntregaDto dto)
        {
            try
            {
                var actualizado = await _service.CambiarEstadoAsync(id, dto);
                if (!actualizado)
                    return NotFound(new { mensaje = $"No se encontró la entrega con id {id}." });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
