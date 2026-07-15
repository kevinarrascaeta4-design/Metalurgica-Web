namespace Metalurgica.API.DTOs.Producto
{
    public class ProductoResponseDto
    {
        public int ProductoId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int StockActual { get; set; }
        public int StockMinimo { get; set; }
        public bool Activo { get; set; }
        public string Codigo { get; set; } = string.Empty;
    }
}