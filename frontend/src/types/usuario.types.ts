export interface UsuarioResponseDto {
  usuarioId: number;
  rolId: number;
  rolNombre: string | null;
  nombre: string;
  email: string;
  activo: boolean;
}

export interface UsuarioRequestDto {
  rolId: number;
  nombre: string;
  email: string;
  password: string;
}

export interface UsuarioUpdateDto {
  rolId: number;
  nombre: string;
  email: string;
  password?: string;
}