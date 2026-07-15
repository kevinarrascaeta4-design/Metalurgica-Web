using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Entrega
{
    public class EntregaRequestDto
    {
        [Required(ErrorMessage = "El pedido es obligatorio")]
        public int PedidoId { get; set; }

        [Required(ErrorMessage = "El usuario es obligatorio")]
        public int UsuarioId { get; set; }

        [MaxLength(255)]
        public string? Observaciones { get; set; }
    }
}
