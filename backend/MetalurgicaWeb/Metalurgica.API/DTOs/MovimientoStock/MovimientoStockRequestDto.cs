using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.MovimientoStock
{
    public class MovimientoStockRequestDto
    {
        [Required(ErrorMessage = "El producto es obligatorio")]
        public int ProductoId { get; set; }

        [Required(ErrorMessage = "El usuario es obligatorio")]
        public int UsuarioId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0")]
        public int Cantidad { get; set; }

        [Required(ErrorMessage = "El tipo de movimiento es obligatorio")]
        public string TipoMovimiento { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Motivo { get; set; }

        [MaxLength(255)]
        public string? Observaciones { get; set; }
    }
}
