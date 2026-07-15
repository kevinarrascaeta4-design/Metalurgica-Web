using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Models;

[Table("Rol")]
[Index("Nombre", Name = "UQ_Rol_Nombre", IsUnique = true)]
public partial class Rol
{
    [Key]
    public int RolId { get; set; }

    [StringLength(50)]
    public string Nombre { get; set; } = null!;

    [InverseProperty("Rol")]
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
