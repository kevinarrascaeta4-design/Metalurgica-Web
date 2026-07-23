export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  expiracion: string;
  usuarioId: number;
  nombre: string;
  email: string;
  rolNombre: string;
}