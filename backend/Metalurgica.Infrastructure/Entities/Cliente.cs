using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.Infrastructure.Entities;

[Table("Cliente")]
[Index("Cuit", Name = "UQ_Cliente_Cuit", IsUnique = true)]
public partial class Cliente
{
    [Key]
    public int ClienteId { get; set; }

    [StringLength(11)]
    [Unicode(false)]
    public string Cuit { get; set; } = null!;

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(20)]
    public string? Telefono { get; set; }

    [StringLength(150)]
    public string? Direccion { get; set; }

    [StringLength(150)]
    public string RazonSocial { get; set; } = null!;

    public bool Activo { get; set; }

    [InverseProperty("Cliente")]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
