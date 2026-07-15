# 🏭 Metalurgica-Web

Sistema web para la gestión integral de una empresa metalúrgica.

El proyecto consiste en una API REST desarrollada con ASP.NET Core y SQL Server, utilizando una arquitectura por capas y el enfoque Database First con Entity Framework Core.

---

# 🚀 Tecnologías utilizadas

- ASP.NET Core Web API (.NET 9)
- Entity Framework Core
- SQL Server
- Database First
- Swagger / OpenAPI
- AutoMapper
- BCrypt.Net
- Arquitectura por capas
- DTOs
- Repository Pattern
- Service Layer

---

# 📁 Arquitectura

```
Metalurgica-Web
│
├── backend
│   ├── Metalurgica.API
│   ├── Metalurgica.Application
│   ├── Metalurgica.Domain
│   ├── Metalurgica.Infrastructure
│   └── Metalurgica.Shared
│
├── database
│
├── frontend
│
└── docs
```

---

# 📦 Módulos implementados

La API incluye CRUD completo para:

- Roles
- Usuarios
- Clientes
- Productos
- Pedidos
- Detalle de Pedidos
- Entregas
- Movimientos de Stock

---

# 🗄 Base de datos

Motor:

- SQL Server

ORM:

- Entity Framework Core

Enfoque:

- Database First

---

# 📌 Funcionalidades

- CRUD completo
- DTOs para entrada y salida
- Validaciones mediante DataAnnotations
- AutoMapper
- Repository Pattern
- Service Layer
- Documentación Swagger
- Manejo de errores mediante respuestas HTTP

---

# 📖 Endpoints

Cada entidad dispone de los siguientes endpoints REST:

```
GET

GET {id}

POST

PUT

DELETE
```

Ejemplo:

```
GET /api/productos

GET /api/productos/5

POST /api/productos

PUT /api/productos/5

DELETE /api/productos/5
```

---

# ▶ Cómo ejecutar

## Clonar

```bash
git clone https://github.com/TU-USUARIO/Metalurgica-Web.git
```

## Restaurar paquetes

```bash
dotnet restore
```

## Configurar la cadena de conexión

Modificar el archivo:

```
appsettings.json
```

Ejemplo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=MetalurgicaWeb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

## Ejecutar

```bash
dotnet run
```

o desde Visual Studio.

---

# 📚 Próximas mejoras

- Autenticación JWT
- Autorización por Roles
- FluentValidation
- Middleware global para manejo de excepciones
- Logging
- Pruebas Unitarias
- Docker
- CI/CD

---

# 👨‍💻 Autor

Kevin Arrascaeta

Analista Universitario de Sistemas Informáticos

Universidad Escuela Superior de Comercio Manuel Belgrano | UNC