USE MetalurgicaWeb;
GO
INSERT INTO Usuario (RolId, Nombre, Email, ContraseñaHash, Activo)
VALUES
(1, 'Juan Perez', 'admin@metalurgica.com', 'Admin123', 1),
(2, 'Maria Gomez', 'maria.gomez@metalurgica.com', 'Admin123', 1),
(2, 'Carlos Rodriguez', 'carlos.rodriguez@metalurgica.com', 'Admin123', 1),
(3, 'Diego Fernandez', 'diego.fernandez@metalurgica.com', 'Admin123', 1),
(3, 'Luis Martinez', 'luis.martinez@metalurgica.com', 'Admin123', 1),
(3, 'Martin Suarez', 'martin.suarez@metalurgica.com', 'Admin123', 1);
