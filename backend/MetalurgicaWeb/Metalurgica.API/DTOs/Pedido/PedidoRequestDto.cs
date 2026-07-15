using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Pedido
{
    public class PedidoRequestDto
    {
        [Required(ErrorMessage = "El cliente es obligatorio")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El pedido debe tener al menos un producto")]
        [MinLength(1, ErrorMessage = "El pedido debe tener al menos un producto")]
        public List<DetallePedidoItemRequestDto> Detalles { get; set; } = new();
    }
}
