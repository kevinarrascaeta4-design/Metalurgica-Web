namespace Metalurgica.API.DTOs.Entrega
{
    public class EntregaResponseDto
    {
        public int EntregaId { get; set; }
        public int PedidoId { get; set; }
        public string NumeroPedido { get; set; } = string.Empty;
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; } = string.Empty;
        public string? Observaciones { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public string EstadoEntrega { get; set; } = string.Empty;
    }
}
