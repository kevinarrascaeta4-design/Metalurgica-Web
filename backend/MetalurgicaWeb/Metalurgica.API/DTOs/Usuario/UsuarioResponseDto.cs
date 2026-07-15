namespace Metalurgica.API.DTOs.Usuario
{
    public class UsuarioResponseDto
    {
        public int UsuarioId { get; set; }
        public int RolId { get; set; }
        public string? RolNombre { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool Activo { get; set; }
    }
}
