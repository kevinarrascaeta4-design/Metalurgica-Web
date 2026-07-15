using Metalurgica.API.DTOs.Usuario;
using Metalurgica.API.Models;
using Metalurgica.API.Repositories.Interfaces;
using Metalurgica.API.Services.Interfaces;

namespace Metalurgica.API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UsuarioResponseDto>> GetAllAsync(bool incluirInactivos = false)
        {
            var usuarios = await _repository.GetAllWithRolAsync(incluirInactivos);
            return usuarios.Select(MapToResponseDto);
        }

        public async Task<UsuarioResponseDto?> GetByIdAsync(int id)
        {
            var usuario = await _repository.GetByIdWithRolAsync(id);
            return usuario is null ? null : MapToResponseDto(usuario);
        }

        public async Task<UsuarioResponseDto> CreateAsync(UsuarioRequestDto dto)
        {
            if (await _repository.ExistsEmailAsync(dto.Email))
                throw new InvalidOperationException($"Ya existe un usuario con el email '{dto.Email}'.");

            if (!await _repository.RolExistsAsync(dto.RolId))
                throw new InvalidOperationException($"El rol con id {dto.RolId} no existe.");

            var usuario = new Usuario
            {
                RolId = dto.RolId,
                Nombre = dto.Nombre,
                Email = dto.Email,
                ContraseñaHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Activo = true
            };

            await _repository.AddAsync(usuario);
            await _repository.SaveChangesAsync();

            var creado = await _repository.GetByIdWithRolAsync(usuario.UsuarioId);
            return MapToResponseDto(creado!);
        }

        public async Task<bool> UpdateAsync(int id, UsuarioUpdateDto dto)
        {
            var usuario = await _repository.GetByIdAsync(id);
            if (usuario is null) return false;

            if (!await _repository.RolExistsAsync(dto.RolId))
                throw new InvalidOperationException($"El rol con id {dto.RolId} no existe.");

            usuario.RolId = dto.RolId;
            usuario.Nombre = dto.Nombre;
            usuario.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.Password))
                usuario.ContraseñaHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            _repository.Update(usuario);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateAsync(int id)
        {
            var usuario = await _repository.GetByIdAsync(id);
            if (usuario is null) return false;

            usuario.Activo = false;
            _repository.Update(usuario);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ReactivateAsync(int id)
        {
            var usuario = await _repository.GetByIdAsync(id);
            if (usuario is null) return false;

            usuario.Activo = true;
            _repository.Update(usuario);
            await _repository.SaveChangesAsync();
            return true;
        }

        private static UsuarioResponseDto MapToResponseDto(Usuario usuario)
        {
            return new UsuarioResponseDto
            {
                UsuarioId = usuario.UsuarioId,
                RolId = usuario.RolId,
                RolNombre = usuario.Rol?.Nombre,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Activo = usuario.Activo
            };
        }
    }
}
