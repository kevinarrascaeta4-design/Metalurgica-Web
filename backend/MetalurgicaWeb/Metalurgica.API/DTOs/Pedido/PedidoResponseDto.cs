namespace Metalurgica.API.DTOs.Pedido
{
    public class PedidoResponseDto
    {
        public int PedidoId { get; set; }
        public string NumeroPedido { get; set; } = string.Empty;
        public int ClienteId { get; set; }
        public string ClienteRazonSocial { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public decimal Total { get; set; }
        public List<DetallePedidoItemResponseDto> Detalles { get; set; } = new();
    }
}
