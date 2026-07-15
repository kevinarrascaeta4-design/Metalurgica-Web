using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Models;

[Table("MovimientoStock")]
public partial class MovimientoStock
{
    [Key]
    public int MovimientoId { get; set; }

    public int UsuarioId { get; set; }

    public int ProductoId { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha { get; set; }

    public int Cantidad { get; set; }

    [StringLength(255)]
    public string? Observaciones { get; set; }

    [StringLength(20)]
    public string TipoMovimiento { get; set; } = null!;

    [StringLength(100)]
    public string? Motivo { get; set; }

    [ForeignKey("ProductoId")]
    [InverseProperty("MovimientoStocks")]
    public virtual Producto Producto { get; set; } = null!;

    [ForeignKey("UsuarioId")]
    [InverseProperty("MovimientoStocks")]
    public virtual Usuario Usuario { get; set; } = null!;
}
