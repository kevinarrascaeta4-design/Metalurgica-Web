USE MetalurgicaWeb;
GO
INSERT INTO MovimientoStock
(
    ProductoId,
    UsuarioId,
    Fecha,
    Cantidad,
    TipoMovimiento,
    Motivo,
    Observaciones
)
VALUES

-- ==========================
-- ENTRADAS (Stock inicial)
-- ==========================

(1,4,'2025-12-20',120,'Entrada','Compra','Ingreso inicial de stock'),
(2,4,'2025-12-20',95,'Entrada','Compra','Ingreso inicial de stock'),
(3,4,'2025-12-20',140,'Entrada','Compra','Ingreso inicial de stock'),
(4,4,'2025-12-20',35,'Entrada','Compra','Ingreso inicial de stock'),
(5,4,'2025-12-20',20,'Entrada','Compra','Ingreso inicial de stock'),
(6,5,'2025-12-20',200,'Entrada','Compra','Ingreso inicial de stock'),
(7,5,'2025-12-20',160,'Entrada','Compra','Ingreso inicial de stock'),
(8,5,'2025-12-20',80,'Entrada','Compra','Ingreso inicial de stock'),
(9,5,'2025-12-20',70,'Entrada','Compra','Ingreso inicial de stock'),
(10,5,'2025-12-20',55,'Entrada','Compra','Ingreso inicial de stock'),
(11,6,'2025-12-20',65,'Entrada','Compra','Ingreso inicial de stock'),
(12,6,'2025-12-20',110,'Entrada','Compra','Ingreso inicial de stock'),
(13,6,'2025-12-20',95,'Entrada','Compra','Ingreso inicial de stock'),
(14,6,'2025-12-20',100,'Entrada','Compra','Ingreso inicial de stock'),
(15,6,'2025-12-20',90,'Entrada','Compra','Ingreso inicial de stock'),
(16,4,'2025-12-20',300,'Entrada','Compra','Ingreso inicial de stock'),
(17,4,'2025-12-20',240,'Entrada','Compra','Ingreso inicial de stock'),
(18,5,'2025-12-20',1200,'Entrada','Compra','Ingreso inicial de stock'),
(19,5,'2025-12-20',950,'Entrada','Compra','Ingreso inicial de stock'),
(20,5,'2025-12-20',2500,'Entrada','Compra','Ingreso inicial de stock'),
(21,6,'2025-12-20',2200,'Entrada','Compra','Ingreso inicial de stock'),
(22,6,'2025-12-20',3000,'Entrada','Compra','Ingreso inicial de stock'),
(23,6,'2025-12-20',2800,'Entrada','Compra','Ingreso inicial de stock'),
(24,4,'2025-12-20',180,'Entrada','Compra','Ingreso inicial de stock'),
(25,4,'2025-12-20',150,'Entrada','Compra','Ingreso inicial de stock'),
(26,5,'2025-12-20',300,'Entrada','Compra','Ingreso inicial de stock'),
(27,5,'2025-12-20',180,'Entrada','Compra','Ingreso inicial de stock'),
(28,6,'2025-12-20',250,'Entrada','Compra','Ingreso inicial de stock'),
(29,6,'2025-12-20',60,'Entrada','Compra','Ingreso inicial de stock'),
(30,6,'2025-12-20',75,'Entrada','Compra','Ingreso inicial de stock'),

-- ==========================
-- SALIDAS
-- ==========================

(4,4,'2026-01-10',6,'Salida','Venta','Pedido N°1001'),
(1,4,'2026-01-10',10,'Salida','Venta','Pedido N°1001'),
(9,4,'2026-01-10',8,'Salida','Venta','Pedido N°1001'),

(2,5,'2026-01-14',12,'Salida','Venta','Pedido N°1002'),
(6,5,'2026-01-14',15,'Salida','Venta','Pedido N°1002'),

(18,6,'2026-01-19',150,'Salida','Venta','Pedido N°1003'),
(20,6,'2026-01-19',150,'Salida','Venta','Pedido N°1003'),

(5,5,'2026-02-05',4,'Salida','Venta','Pedido N°1005'),
(10,5,'2026-02-05',6,'Salida','Venta','Pedido N°1005'),

(4,4,'2026-02-17',8,'Salida','Venta','Pedido N°1007'),
(9,4,'2026-02-17',10,'Salida','Venta','Pedido N°1007'),

(1,4,'2026-03-06',8,'Salida','Venta','Pedido N°1010'),
(6,4,'2026-03-06',20,'Salida','Venta','Pedido N°1010'),

(4,6,'2026-03-18',10,'Salida','Venta','Pedido N°1012'),
(5,6,'2026-03-18',5,'Salida','Venta','Pedido N°1012'),

(4,4,'2026-04-20',6,'Salida','Venta','Pedido N°1016'),

(10,6,'2026-05-10',10,'Salida','Venta','Pedido N°1018'),

(6,4,'2026-05-15',20,'Salida','Venta','Pedido N°1019');