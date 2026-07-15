using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Rol
{
    public class RolRequestDto
    {
        [Required(ErrorMessage = "El nombre del rol es obligatorio")]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;
    }
}
