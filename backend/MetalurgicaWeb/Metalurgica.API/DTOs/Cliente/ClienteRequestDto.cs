using System.ComponentModel.DataAnnotations;

namespace Metalurgica.API.DTOs.Cliente
{
    public class ClienteRequestDto
    {
        [Required(ErrorMessage = "El CUIT es obligatorio")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "El CUIT debe tener 11 dígitos")]
        public string Cuit { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "El email no tiene un formato válido")]
        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(20)]
        public string? Telefono { get; set; }

        [MaxLength(150)]
        public string? Direccion { get; set; }

        [Required(ErrorMessage = "La razón social es obligatoria")]
        [MaxLength(150)]
        public string RazonSocial { get; set; } = string.Empty;
    }
}
