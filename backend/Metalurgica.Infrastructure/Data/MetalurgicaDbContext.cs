using System;
using System.Collections.Generic;
using Metalurgica.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Metalurgica.Infrastructure.Data;

public partial class MetalurgicaDbContext : DbContext
{
    public MetalurgicaDbContext()
    {
    }

    public MetalurgicaDbContext(DbContextOptions<MetalurgicaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<DetallePedido> DetallePedidos { get; set; }

    public virtual DbSet<Entrega> Entregas { get; set; }

    public virtual DbSet<MovimientoStock> MovimientoStocks { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__71ABD087AA9BD43C");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Cuit).IsFixedLength();
        });

        modelBuilder.Entity<DetallePedido>(entity =>
        {
            entity.HasKey(e => e.DetallePedidoId).HasName("PK__DetalleP__6ED21C21640968D6");

            entity.HasOne(d => d.Pedido).WithMany(p => p.DetallePedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetallePedido_Pedido");

            entity.HasOne(d => d.Producto).WithMany(p => p.DetallePedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetallePedido_Producto");
        });

        modelBuilder.Entity<Entrega>(entity =>
        {
            entity.HasKey(e => e.EntregaId).HasName("PK__Entrega__D9AD23038022B653");

            entity.HasOne(d => d.Pedido).WithMany(p => p.Entregas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Entrega_Pedido");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Entregas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Entrega_Usuario");
        });

        modelBuilder.Entity<MovimientoStock>(entity =>
        {
            entity.HasKey(e => e.MovimientoId).HasName("PK__Movimien__BF923C2CBE1C965C");

            entity.Property(e => e.Fecha).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Producto).WithMany(p => p.MovimientoStocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MovimientoStock_Producto");

            entity.HasOne(d => d.Usuario).WithMany(p => p.MovimientoStocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MovimientoStock_Usuario");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.PedidoId).HasName("PK__Pedido__09BA1430F8B24FC9");

            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Cliente).WithMany(p => p.Pedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Pedido_Cliente");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__Producto__A430AEA3A74DA8B3");

            entity.Property(e => e.Activo).HasDefaultValue(true);
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Rol__F92302F11F4DB2FA");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuario__2B3DE7B87DCDE1AD");

            entity.Property(e => e.Activo).HasDefaultValue(true);

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
