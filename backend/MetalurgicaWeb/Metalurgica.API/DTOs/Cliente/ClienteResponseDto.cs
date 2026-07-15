namespace Metalurgica.API.DTOs.Cliente
{
    public class ClienteResponseDto
    {
        public int ClienteId { get; set; }
        public string Cuit { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? Direccion { get; set; }
        public string RazonSocial { get; set; } = string.Empty;
        public bool Activo { get; set; }
    }
}
