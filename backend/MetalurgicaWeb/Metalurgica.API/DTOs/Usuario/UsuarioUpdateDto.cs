using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Usuario
{
    public class UsuarioUpdateDto
    {
        [Required(ErrorMessage = "El rol es obligatorio")]
        public int RolId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
        public string? Password { get; set; }
    }
}
