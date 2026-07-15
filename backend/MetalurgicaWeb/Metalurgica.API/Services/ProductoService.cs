using Metalurgica.API.DTOs.Producto;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _repository;

        public ProductoService(IProductoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductoResponseDto>> GetAllAsync()
        {
            var productos = await _repository.GetAllAsync();
            return productos.Select(MapToResponseDto);
        }

        public async Task<ProductoResponseDto?> GetByIdAsync(int id)
        {
            var producto = await _repository.GetByIdAsync(id);
            return producto is null ? null : MapToResponseDto(producto);
        }

        public async Task<ProductoResponseDto?> GetByCodigoAsync(string codigo)
        {
            var producto = await _repository.GetByCodigoAsync(codigo);
            return producto is null ? null : MapToResponseDto(producto);
        }

        public async Task<ProductoResponseDto> CreateAsync(ProductoRequestDto dto)
        {
            if (await _repository.ExistsCodigoAsync(dto.Codigo))
                throw new InvalidOperationException($"Ya existe un producto con el código '{dto.Codigo}'.");

            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                StockActual = dto.StockActual,
                StockMinimo = dto.StockMinimo,
                Activo = dto.Activo,
                Codigo = dto.Codigo
            };

            await _repository.AddAsync(producto);
            await _repository.SaveChangesAsync();

            return MapToResponseDto(producto);
        }

        public async Task<bool> UpdateAsync(int id, ProductoRequestDto dto)
        {
            var producto = await _repository.GetByIdAsync(id);
            if (producto is null) return false;

            producto.Nombre = dto.Nombre;
            producto.Descripcion = dto.Descripcion;
            producto.Precio = dto.Precio;
            producto.StockActual = dto.StockActual;
            producto.StockMinimo = dto.StockMinimo;
            producto.Activo = dto.Activo;
            producto.Codigo = dto.Codigo;

            _repository.Update(producto);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var producto = await _repository.GetByIdAsync(id);
            if (producto is null) return false;

            _repository.Delete(producto);
            await _repository.SaveChangesAsync();
            return true;
        }

        private static ProductoResponseDto MapToResponseDto(Producto producto)
        {
            return new ProductoResponseDto
            {
                ProductoId = producto.ProductoId,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                StockActual = producto.StockActual,
                StockMinimo = producto.StockMinimo,
                Activo = producto.Activo,
                Codigo = producto.Codigo
            };
        }
    }
}
