namespace Metalurgica.API.DTOs.MovimientoStock
{
    public class MovimientoStockResponseDto
    {
        public int MovimientoId { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; }
        public string TipoMovimiento { get; set; } = string.Empty;
        public string? Motivo { get; set; }
        public string? Observaciones { get; set; }
        public int StockResultante { get; set; }
    }
}
