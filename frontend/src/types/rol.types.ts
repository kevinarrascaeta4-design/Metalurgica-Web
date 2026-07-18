export interface RolResponseDto {
  rolId: number;
  nombre: string;
  cantidadUsuarios: number;
}

export interface RolRequestDto {
  nombre: string;
}