using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.API.Models;

[Table("Entrega")]
public partial class Entrega
{
    [Key]
    public int EntregaId { get; set; }

    public int UsuarioId { get; set; }

    public int PedidoId { get; set; }

    [StringLength(255)]
    public string? Observaciones { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaEntrega { get; set; }

    [StringLength(30)]
    public string EstadoEntrega { get; set; } = null!;

    [ForeignKey("PedidoId")]
    [InverseProperty("Entregas")]
    public virtual Pedido Pedido { get; set; } = null!;

    [ForeignKey("UsuarioId")]
    [InverseProperty("Entregas")]
    public virtual Usuario Usuario { get; set; } = null!;
}
