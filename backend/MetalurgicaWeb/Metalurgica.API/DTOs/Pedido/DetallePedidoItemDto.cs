using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Pedido
{
    public class DetallePedidoItemRequestDto
    {
        [Required(ErrorMessage = "El producto es obligatorio")]
        public int ProductoId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0")]
        public int Cantidad { get; set; }
    }

    public class DetallePedidoItemResponseDto
    {
        public int DetallePedidoId { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal SubTotal { get; set; }
    }
}
