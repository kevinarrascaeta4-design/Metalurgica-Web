namespace Metalurgica.API.DTOs.Rol
{
    public class RolResponseDto
    {
        public int RolId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int CantidadUsuarios { get; set; }
    }
}
