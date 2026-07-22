using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Metalurgica.API.DTOs.Producto;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoService _service;

        public ProductoController(IProductoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoResponseDto>>> GetAll()
        {
            var productos = await _service.GetAllAsync();
            return Ok(productos);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductoResponseDto>> GetById(int id)
        {
            var producto = await _service.GetByIdAsync(id);
            if (producto is null)
                return NotFound(new { mensaje = $"No se encontró el producto con id {id}." });

            return Ok(producto);
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<ProductoResponseDto>> GetByCodigo(string codigo)
        {
            var producto = await _service.GetByCodigoAsync(codigo);
            if (producto is null)
                return NotFound(new { mensaje = $"No se encontró un producto con código '{codigo}'." });

            return Ok(producto);
        }

        [HttpPost]
        public async Task<ActionResult<ProductoResponseDto>> Create([FromBody] ProductoRequestDto dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = creado.ProductoId }, creado);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductoRequestDto dto)
        {
            var actualizado = await _service.UpdateAsync(id, dto);
            if (!actualizado)
                return NotFound(new { mensaje = $"No se encontró el producto con id {id}." });

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var eliminado = await _service.DeleteAsync(id);
            if (!eliminado)
                return NotFound(new { mensaje = $"No se encontró el producto con id {id}." });

            return NoContent();
        }
    }
}
