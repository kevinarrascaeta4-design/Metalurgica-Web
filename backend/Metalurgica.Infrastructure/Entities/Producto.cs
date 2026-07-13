using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.Infrastructure.Entities;

[Table("Producto")]
[Index("Codigo", Name = "UQ_Producto_Codigo", IsUnique = true)]
public partial class Producto
{
    [Key]
    public int ProductoId { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    public string? Descripcion { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Precio { get; set; }

    public int StockActual { get; set; }

    public int StockMinimo { get; set; }

    public bool Activo { get; set; }

    [StringLength(30)]
    public string Codigo { get; set; } = null!;

    [InverseProperty("Producto")]
    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    [InverseProperty("Producto")]
    public virtual ICollection<MovimientoStock> MovimientoStocks { get; set; } = new List<MovimientoStock>();
}
