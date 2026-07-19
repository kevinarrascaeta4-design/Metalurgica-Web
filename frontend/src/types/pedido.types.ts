export type EstadoPedido = 'Pendiente' | 'Confirmado' | 'Cancelado' | 'Entregado';

export interface DetallePedidoItemResponseDto {
  detallePedidoId: number;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
}

export interface PedidoResponseDto {
  pedidoId: number;
  numeroPedido: string;
  clienteId: number;
  clienteRazonSocial: string;
  estado: EstadoPedido;
  fechaCreacion: string;
  fechaModificacion: string | null;
  total: number;
  detalles: DetallePedidoItemResponseDto[];
}

export interface DetallePedidoItemRequestDto {
  productoId: number;
  cantidad: number;
}

export interface PedidoRequestDto {
  clienteId: number;
  detalles: DetallePedidoItemRequestDto[];
}

export interface CambiarEstadoDto {
  nuevoEstado: EstadoPedido;
}