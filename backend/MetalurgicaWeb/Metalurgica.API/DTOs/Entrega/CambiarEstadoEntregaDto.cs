using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Entrega
{
    public class CambiarEstadoEntregaDto
    {
        [Required(ErrorMessage = "El nuevo estado es obligatorio")]
        public string NuevoEstado { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Observaciones { get; set; }
    }
}
