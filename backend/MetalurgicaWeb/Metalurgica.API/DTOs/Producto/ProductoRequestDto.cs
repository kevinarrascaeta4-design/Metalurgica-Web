using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Producto
{
    public class ProductoRequestDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "El precio no puede ser negativo")]
        public decimal Precio { get; set; }

        [Range(0, int.MaxValue)]
        public int StockActual { get; set; }

        [Range(0, int.MaxValue)]
        public int StockMinimo { get; set; }

        public bool Activo { get; set; } = true;

        [Required(ErrorMessage = "El código es obligatorio")]
        [MaxLength(30)]
        public string Codigo { get; set; } = string.Empty;
    }
}
