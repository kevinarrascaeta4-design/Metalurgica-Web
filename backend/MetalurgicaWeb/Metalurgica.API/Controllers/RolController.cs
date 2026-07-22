using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Rol;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RolController : ControllerBase
    {
        private readonly IRolService _service;

        public RolController(IRolService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolResponseDto>>> GetAll()
        {
            var roles = await _service.GetAllAsync();
            return Ok(roles);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<RolResponseDto>> GetById(int id)
        {
            var rol = await _service.GetByIdAsync(id);
            if (rol is null)
                return NotFound(new { mensaje = $"No se encontró el rol con id {id}." });

            return Ok(rol);
        }

        [HttpPost]
        public async Task<ActionResult<RolResponseDto>> Create([FromBody] RolRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.RolId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] RolRequestDto dto)
        {
            try
            {
                var actualizado = await _service.UpdateAsync(id, dto);
                if (!actualizado)
                    return NotFound(new { mensaje = $"No se encontró el rol con id {id}." });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var eliminado = await _service.DeleteAsync(id);
                if (!eliminado)
                    return NotFound(new { mensaje = $"No se encontró el rol con id {id}." });

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }
    }
}
