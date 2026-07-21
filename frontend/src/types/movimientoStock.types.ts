export type TipoMovimiento = 'Entrada' | 'Salida';

export interface MovimientoStockResponseDto {
  movimientoId: number;
  productoId: number;
  productoNombre: string;
  usuarioId: number;
  usuarioNombre: string;
  fecha: string;
  cantidad: number;
  tipoMovimiento: TipoMovimiento;
  motivo: string | null;
  observaciones: string | null;
  stockResultante: number;
}

export interface MovimientoStockRequestDto {
  productoId: number;
  usuarioId: number;
  cantidad: number;
  tipoMovimiento: TipoMovimiento;
  motivo?: string | null;
  observaciones?: string | null;
}