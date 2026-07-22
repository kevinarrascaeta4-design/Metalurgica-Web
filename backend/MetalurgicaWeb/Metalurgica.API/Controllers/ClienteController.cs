using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Cliente;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _service;

        public ClienteController(IClienteService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteResponseDto>>> GetAll([FromQuery] bool incluirInactivos = false)
        {
            var clientes = await _service.GetAllAsync(incluirInactivos);
            return Ok(clientes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ClienteResponseDto>> GetById(int id)
        {
            var cliente = await _service.GetByIdAsync(id);
            if (cliente is null)
                return NotFound(new { mensaje = $"No se encontró el cliente con id {id}." });

            return Ok(cliente);
        }

        [HttpPost]
        public async Task<ActionResult<ClienteResponseDto>> Create([FromBody] ClienteRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.ClienteId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClienteRequestDto dto)
        {
            var actualizado = await _service.UpdateAsync(id, dto);
            if (!actualizado)
                return NotFound(new { mensaje = $"No se encontró el cliente con id {id}." });

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Deactivate(int id)
        {
            var desactivado = await _service.DeactivateAsync(id);
            if (!desactivado)
                return NotFound(new { mensaje = $"No se encontró el cliente con id {id}." });

            return NoContent();
        }

        [HttpPatch("{id:int}/reactivar")]
        public async Task<IActionResult> Reactivate(int id)
        {
            var reactivado = await _service.ReactivateAsync(id);
            if (!reactivado)
                return NotFound(new { mensaje = $"No se encontró el cliente con id {id}." });

            return NoContent();
        }
    }
}
