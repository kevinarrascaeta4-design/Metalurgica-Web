using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Models;

[Table("Pedido")]
[Index("NumeroPedido", Name = "UQ_Pedido_NumeroPedido", IsUnique = true)]
public partial class Pedido
{
    [Key]
    public int PedidoId { get; set; }

    public int ClienteId { get; set; }

    [StringLength(30)]
    public string NumeroPedido { get; set; } = null!;

    [StringLength(30)]
    public string Estado { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaCreacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaModificacion { get; set; }

    [ForeignKey("ClienteId")]
    [InverseProperty("Pedidos")]
    public virtual Cliente Cliente { get; set; } = null!;

    [InverseProperty("Pedido")]
    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    [InverseProperty("Pedido")]
    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();
}
