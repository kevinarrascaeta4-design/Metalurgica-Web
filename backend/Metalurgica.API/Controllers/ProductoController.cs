using Microsoft.AspNetCore.Mvc;

namespace Metalurgica.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("API de Productos funcionando.");
    }
}
