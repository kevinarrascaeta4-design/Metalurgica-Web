using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Usuario;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _service;

        public UsuarioController(IUsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioResponseDto>>> GetAll([FromQuery] bool incluirInactivos = false)
        {
            var usuarios = await _service.GetAllAsync(incluirInactivos);
            return Ok(usuarios);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UsuarioResponseDto>> GetById(int id)
        {
            var usuario = await _service.GetByIdAsync(id);
            if (usuario is null)
                return NotFound(new { mensaje = $"No se encontró el usuario con id {id}." });

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioResponseDto>> Create([FromBody] UsuarioRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.UsuarioId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UsuarioUpdateDto dto)
        {
            try
            {
                var actualizado = await _service.UpdateAsync(id, dto);
                if (!actualizado)
                    return NotFound(new { mensaje = $"No se encontró el usuario con id {id}." });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Deactivate(int id)
        {
            var desactivado = await _service.DeactivateAsync(id);
            if (!desactivado)
                return NotFound(new { mensaje = $"No se encontró el usuario con id {id}." });

            return NoContent();
        }

        [HttpPatch("{id:int}/reactivar")]
        public async Task<IActionResult> Reactivate(int id)
        {
            var reactivado = await _service.ReactivateAsync(id);
            if (!reactivado)
                return NotFound(new { mensaje = $"No se encontró el usuario con id {id}." });

            return NoContent();
        }
    }
}
