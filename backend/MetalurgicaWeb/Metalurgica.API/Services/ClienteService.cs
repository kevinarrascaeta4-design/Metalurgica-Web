using Metalurgica.API.DTOs.Cliente;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;

        public ClienteService(IClienteRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ClienteResponseDto>> GetAllAsync(bool incluirInactivos = false)
        {
            var clientes = await _repository.GetAllAsync(incluirInactivos);
            return clientes.Select(MapToResponseDto);
        }

        public async Task<ClienteResponseDto?> GetByIdAsync(int id)
        {
            var cliente = await _repository.GetByIdAsync(id);
            return cliente is null ? null : MapToResponseDto(cliente);
        }

        public async Task<ClienteResponseDto> CreateAsync(ClienteRequestDto dto)
        {
            if (await _repository.ExistsCuitAsync(dto.Cuit))
                throw new InvalidOperationException($"Ya existe un cliente con el CUIT '{dto.Cuit}'.");

            var cliente = new Cliente
            {
                Cuit = dto.Cuit,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Direccion = dto.Direccion,
                RazonSocial = dto.RazonSocial,
                Activo = true
            };

            await _repository.AddAsync(cliente);
            await _repository.SaveChangesAsync();

            return MapToResponseDto(cliente);
        }

        public async Task<bool> UpdateAsync(int id, ClienteRequestDto dto)
        {
            var cliente = await _repository.GetByIdAsync(id);
            if (cliente is null) return false;

            cliente.Cuit = dto.Cuit;
            cliente.Email = dto.Email;
            cliente.Telefono = dto.Telefono;
            cliente.Direccion = dto.Direccion;
            cliente.RazonSocial = dto.RazonSocial;

            _repository.Update(cliente);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateAsync(int id)
        {
            var cliente = await _repository.GetByIdAsync(id);
            if (cliente is null) return false;

            cliente.Activo = false;
            _repository.Update(cliente);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ReactivateAsync(int id)
        {
            var cliente = await _repository.GetByIdAsync(id);
            if (cliente is null) return false;

            cliente.Activo = true;
            _repository.Update(cliente);
            await _repository.SaveChangesAsync();
            return true;
        }

        private static ClienteResponseDto MapToResponseDto(Cliente cliente)
        {
            return new ClienteResponseDto
            {
                ClienteId = cliente.ClienteId,
                Cuit = cliente.Cuit,
                Email = cliente.Email,
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion,
                RazonSocial = cliente.RazonSocial,
                Activo = cliente.Activo
            };
        }
    }
}
