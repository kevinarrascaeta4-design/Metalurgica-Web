USE MetalurgicaWeb;
GO
INSERT INTO Entrega
(
    PedidoId,
    UsuarioId,
    Observaciones,
    FechaEntrega,
    EstadoEntrega
)
VALUES

(1,4,'Entrega realizada sin inconvenientes.','2026-01-10','Entregada'),

(2,5,'Mercadería recibida conforme por el cliente.','2026-01-14','Entregada'),

(3,6,'La mercadería salió del depósito y se encuentra en distribución.','2026-01-20','En Camino'),

(4,4,'Pedido pendiente de preparación en depósito.',NULL,'Pendiente'),

(5,5,'Entrega completa y firmada por el cliente.','2026-02-05','Entregada'),

(6,6,'Pedido cancelado por solicitud del cliente.',NULL,'Cancelada'),

(7,4,'Entrega realizada sin observaciones.','2026-02-17','Entregada'),

(8,5,'La unidad de transporte se encuentra en camino al cliente.',NULL,'En Camino'),

(9,6,'Pedido pendiente de despacho.',NULL,'Pendiente'),

(10,4,'Entrega realizada correctamente.','2026-03-06','Entregada'),

(11,5,'Mercadería preparada para distribución.',NULL,'En Camino'),

(12,6,'Entrega realizada y recepcionada por el cliente.','2026-03-18','Entregada'),

(13,4,'Esperando confirmación de despacho.',NULL,'Pendiente'),

(14,5,'Entrega completada sin inconvenientes.','2026-04-04','Entregada'),

(15,6,'Pedido embalado y listo para entrega.',NULL,'En Camino'),

(16,4,'Entrega realizada correctamente.','2026-04-20','Entregada'),

(17,5,'Pedido pendiente de aprobación para despacho.',NULL,'Pendiente'),

(18,6,'Entrega realizada conforme al remito.','2026-05-10','Entregada'),

(19,4,'Mercadería en reparto hacia el cliente.',NULL,'En Camino'),

(20,5,'Pedido pendiente de preparación.',NULL,'Pendiente');