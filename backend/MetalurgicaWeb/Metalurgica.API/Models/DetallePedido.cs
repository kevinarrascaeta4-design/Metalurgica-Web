using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Models;

[Table("DetallePedido")]
public partial class DetallePedido
{
    [Key]
    public int DetallePedidoId { get; set; }

    public int PedidoId { get; set; }

    public int ProductoId { get; set; }

    public int Cantidad { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal SubTotal { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal PrecioUnitario { get; set; }

    [ForeignKey("PedidoId")]
    [InverseProperty("DetallePedidos")]
    public virtual Pedido Pedido { get; set; } = null!;

    [ForeignKey("ProductoId")]
    [InverseProperty("DetallePedidos")]
    public virtual Producto Producto { get; set; } = null!;
}
