USE MetalurgicaWeb
GO
ALTER TABLE Usuario
ADD CONSTRAINT FK_Usuario_Rol
FOREIGN KEY (RolId)
REFERENCES Rol(RolId);

ALTER TABLE MovimientoStock
ADD CONSTRAINT FK_MovimientoStock_Usuario
FOREIGN KEY (UsuarioId)
REFERENCES Usuario(UsuarioId);

ALTER TABLE Entrega
ADD CONSTRAINT FK_Entrega_Usuario
FOREIGN KEY (UsuarioId)
REFERENCES Usuario(UsuarioId);

ALTER TABLE Pedido
ADD CONSTRAINT FK_Pedido_Cliente
FOREIGN KEY (ClienteId)
REFERENCES Cliente(ClienteId);

ALTER TABLE Entrega
ADD CONSTRAINT FK_Entrega_Pedido
FOREIGN KEY (PedidoId)
REFERENCES Pedido(PedidoId);

ALTER TABLE DetallePedido
ADD CONSTRAINT FK_DetallePedido_Pedido
FOREIGN KEY (PedidoId)
REFERENCES Pedido(PedidoId);

ALTER TABLE DetallePedido
ADD CONSTRAINT FK_DetallePedido_Producto
FOREIGN KEY (ProductoId)
REFERENCES Producto(ProductoId);

ALTER TABLE MovimientoStock
ADD CONSTRAINT FK_MovimientoStock_Producto
FOREIGN KEY (ProductoId)
REFERENCES Producto(ProductoId);

ALTER TABLE Cliente
ADD CONSTRAINT UQ_Cliente_Cuit
UNIQUE (Cuit);

ALTER TABLE Usuario
ADD CONSTRAINT UQ_Usuario_Email
UNIQUE (Email);

ALTER TABLE Pedido
ADD CONSTRAINT UQ_Pedido_NumeroPedido
UNIQUE (NumeroPedido);

ALTER TABLE Producto 
ADD CONSTRAINT UQ_Producto_Codigo
UNIQUE (Codigo);

ALTER TABLE Rol
ADD CONSTRAINT UQ_Rol_Nombre
UNIQUE (Nombre);

ALTER TABLE Producto
ADD CONSTRAINT CK_Producto_Precio
CHECK (Precio >= 0);

ALTER TABLE Producto
ADD CONSTRAINT CK_Producto_StockMinimo
CHECK (StockMinimo >= 0);

ALTER TABLE Producto
ADD CONSTRAINT CK_Producto_StockActual
CHECK (StockActual >= 0);

ALTER TABLE MovimientoStock
ADD CONSTRAINT CK_MovimientoStock_Cantidad
CHECK (Cantidad > 0);

ALTER TABLE MovimientoStock
ADD CONSTRAINT CK_MovimientoStock_TipoMovimiento
CHECK (TipoMovimiento IN ('Entrada', 'Salida'));

ALTER TABLE Pedido
ADD CONSTRAINT CK_Pedido_Estado
CHECK (Estado IN ('Pendiente', 'Confirmado', 'Cancelado', 'Entregado'));

ALTER TABLE DetallePedido
ADD CONSTRAINT CK_DetallePedido_Cantidad
CHECK (Cantidad > 0);

ALTER TABLE DetallePedido
ADD CONSTRAINT CK_DetallePedido_PrecioUnitario
CHECK (PrecioUnitario >= 0);

ALTER TABLE DetallePedido
ADD CONSTRAINT CK_DetallePedido_SubTotal
CHECK (SubTotal >= 0);

ALTER TABLE Entrega
ADD CONSTRAINT CK_Entrega_EstadoEntrega
CHECK (EstadoEntrega IN ('Pendiente', 'En Camino', 'Entregada', 'Cancelada'));