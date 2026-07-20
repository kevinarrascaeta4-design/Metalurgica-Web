export type EstadoEntrega = 'Pendiente' | 'En Camino' | 'Entregada' | 'Cancelada';

export interface EntregaResponseDto {
  entregaId: number;
  pedidoId: number;
  numeroPedido: string;
  usuarioId: number;
  usuarioNombre: string;
  observaciones: string | null;
  fechaEntrega: string | null;
  estadoEntrega: EstadoEntrega;
}

export interface EntregaRequestDto {
  pedidoId: number;
  usuarioId: number;
  observaciones?: string | null;
}

export interface CambiarEstadoEntregaDto {
  nuevoEstado: EstadoEntrega;
  observaciones?: string | null;
}