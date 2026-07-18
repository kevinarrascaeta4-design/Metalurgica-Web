export interface ClienteResponseDto {
  clienteId: number;
  cuit: string;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  razonSocial: string;
  activo: boolean;
}

export interface ClienteRequestDto {
  cuit: string;
  email?: string | null;
  telefono?: string | null;
  direccion?: string | null;
  razonSocial: string;
}