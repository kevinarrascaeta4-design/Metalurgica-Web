using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.Infrastructure.Entities;

[Table("Usuario")]
[Index("Email", Name = "UQ_Usuario_Email", IsUnique = true)]
public partial class Usuario
{
    [Key]
    public int UsuarioId { get; set; }

    public int RolId { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; } = null!;

    [StringLength(100)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string ContraseñaHash { get; set; } = null!;

    public bool Activo { get; set; }

    [InverseProperty("Usuario")]
    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    [InverseProperty("Usuario")]
    public virtual ICollection<MovimientoStock> MovimientoStocks { get; set; } = new List<MovimientoStock>();

    [ForeignKey("RolId")]
    [InverseProperty("Usuarios")]
    public virtual Rol Rol { get; set; } = null!;
}
