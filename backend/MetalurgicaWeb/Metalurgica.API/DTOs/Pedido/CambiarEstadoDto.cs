using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Pedido
{
    public class CambiarEstadoDto
    {
        [Required(ErrorMessage = "El nuevo estado es obligatorio")]
        public string NuevoEstado { get; set; } = string.Empty;
    }
}
