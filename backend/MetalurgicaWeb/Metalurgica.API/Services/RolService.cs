using Metalurgica.API.DTOs.Rol;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class RolService : IRolService
    {
        private readonly IRolRepository _repository;

        public RolService(IRolRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RolResponseDto>> GetAllAsync()
        {
            var roles = await _repository.GetAllAsync();
            var result = new List<RolResponseDto>();

            foreach (var rol in roles)
            {
                result.Add(new RolResponseDto
                {
                    RolId = rol.RolId,
                    Nombre = rol.Nombre,
                    CantidadUsuarios = await _repository.CountUsuariosAsync(rol.RolId)
                });
            }

            return result;
        }

        public async Task<RolResponseDto?> GetByIdAsync(int id)
        {
            var rol = await _repository.GetByIdAsync(id);
            if (rol is null) return null;

            return new RolResponseDto
            {
                RolId = rol.RolId,
                Nombre = rol.Nombre,
                CantidadUsuarios = await _repository.CountUsuariosAsync(rol.RolId)
            };
        }

        public async Task<RolResponseDto> CreateAsync(RolRequestDto dto)
        {
            if (await _repository.ExistsNombreAsync(dto.Nombre))
                throw new InvalidOperationException($"Ya existe un rol con el nombre '{dto.Nombre}'.");

            var rol = new Models.Rol { Nombre = dto.Nombre };

            await _repository.AddAsync(rol);
            await _repository.SaveChangesAsync();

            return new RolResponseDto { RolId = rol.RolId, Nombre = rol.Nombre, CantidadUsuarios = 0 };
        }

        public async Task<bool> UpdateAsync(int id, RolRequestDto dto)
        {
            var rol = await _repository.GetByIdAsync(id);
            if (rol is null) return false;

            if (await _repository.ExistsNombreAsync(dto.Nombre) && rol.Nombre != dto.Nombre)
                throw new InvalidOperationException($"Ya existe un rol con el nombre '{dto.Nombre}'.");

            rol.Nombre = dto.Nombre;
            _repository.Update(rol);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var rol = await _repository.GetByIdAsync(id);
            if (rol is null) return false;

            var cantidadUsuarios = await _repository.CountUsuariosAsync(id);
            if (cantidadUsuarios > 0)
                throw new InvalidOperationException(
                    $"No se puede eliminar el rol porque tiene {cantidadUsuarios} usuario(s) asignado(s).");

            _repository.Delete(rol);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}
