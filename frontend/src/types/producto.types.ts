export interface ProductoResponseDto {
  productoId: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stockActual: number;
  stockMinimo: number;
  activo: boolean;
  codigo: string;
}

export interface ProductoRequestDto {
  nombre: string;
  descripcion?: string | null;
  precio: number;
  stockActual: number;
  stockMinimo: number;
  activo: boolean;
  codigo: string;
}