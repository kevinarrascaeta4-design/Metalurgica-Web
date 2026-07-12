USE MetalurgicaWeb;
GO

INSERT INTO Producto
(
    Nombre,
    Descripcion,
    Precio,
    StockActual,
    StockMinimo,
    Activo,
    Codigo
)
VALUES

('Perfil U 100','Perfil estructural U de acero 100 mm',25000,120,20,1,'PER-U-100'),

('Perfil C 80','Perfil estructural C de acero 80 mm',22000,95,20,1,'PER-C-080'),

('Perfil L 50x50','Perfil ángulo 50x50 mm',18000,140,25,1,'PER-L-5050'),

('Perfil IPN 120','Perfil IPN 120 mm',68000,35,8,1,'IPN-120'),

('Perfil IPN 160','Perfil IPN 160 mm',92000,20,5,1,'IPN-160'),

('Caño estructural 40x40','Caño estructural 40x40x2 mm',14500,200,40,1,'CAN-4040'),

('Caño estructural 60x40','Caño estructural 60x40x2 mm',17500,160,30,1,'CAN-6040'),

('Caño estructural 80x80','Caño estructural 80x80x3 mm',29500,80,15,1,'CAN-8080'),

('Chapa galvanizada N°18','Chapa galvanizada espesor N°18',38000,70,15,1,'CHG-018'),

('Chapa negra N°16','Chapa negra espesor N°16',45000,55,10,1,'CHN-016'),

('Chapa lisa 2 mm','Chapa lisa de acero 2 mm',42000,65,15,1,'CHL-002'),

('Planchuela 2"','Planchuela de acero de 2 pulgadas',16500,110,20,1,'PLA-200'),

('Planchuela 3"','Planchuela de acero de 3 pulgadas',21000,95,20,1,'PLA-300'),

('Ángulo 1 1/2"','Perfil ángulo de 1 1/2 pulgadas',17000,100,20,1,'ANG-150'),

('Ángulo 2"','Perfil ángulo de 2 pulgadas',21000,90,15,1,'ANG-200'),

('Varilla roscada M10','Varilla roscada galvanizada M10',6500,300,50,1,'VAR-M10'),

('Varilla roscada M12','Varilla roscada galvanizada M12',7900,240,40,1,'VAR-M12'),

('Tornillo hexagonal M10','Tornillo hexagonal M10 x 50 mm',450,1200,200,1,'TOR-M10'),

('Tornillo hexagonal M12','Tornillo hexagonal M12 x 60 mm',620,950,150,1,'TOR-M12'),

('Tuerca M10','Tuerca hexagonal M10',120,2500,400,1,'TUE-M10'),

('Tuerca M12','Tuerca hexagonal M12',150,2200,350,1,'TUE-M12'),

('Arandela M10','Arandela plana M10',60,3000,500,1,'ARA-M10'),

('Arandela M12','Arandela plana M12',75,2800,450,1,'ARA-M12'),

('Electrodo E6013','Electrodo para soldadura E6013',9800,180,30,1,'ELE-6013'),

('Electrodo E7018','Electrodo para soldadura E7018',12400,150,25,1,'ELE-7018'),

('Disco de corte 7"','Disco de corte para acero 7 pulgadas',4200,300,50,1,'DIS-C7'),

('Disco flap 7"','Disco flap abrasivo 7 pulgadas',5900,180,30,1,'DIS-F7'),

('Bisagra reforzada','Bisagra de acero reforzada',3800,250,40,1,'BIS-001'),

('Cerradura industrial','Cerradura metálica industrial',16500,60,10,1,'CER-001'),

('Pintura anticorrosiva','Pintura anticorrosiva gris 4 L',24500,75,15,1,'PIN-001');