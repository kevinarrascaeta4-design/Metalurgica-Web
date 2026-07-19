import type { EstadoPedido } from '@/types/pedido.types';

interface EstadoConfig {
  label: string;
  badgeClassName: string;
}

export const estadoPedidoConfig: Record<EstadoPedido, EstadoConfig> = {
  Pendiente: {
    label: 'Pendiente',
    badgeClassName: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  },
  Confirmado: {
    label: 'Confirmado',
    badgeClassName: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  Entregado: {
    label: 'Entregado',
    badgeClassName: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  Cancelado: {
    label: 'Cancelado',
    badgeClassName: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

// Qué transiciones de estado tienen sentido de negocio desde cada estado actual.
// Entregado y Cancelado son estados finales: no se puede cambiar desde ahí.
export const transicionesPermitidas: Record<EstadoPedido, EstadoPedido[]> = {
  Pendiente: ['Confirmado', 'Cancelado'],
  Confirmado: ['Entregado', 'Cancelado'],
  Entregado: [],
  Cancelado: [],
};

// Transiciones que, por su impacto (sincronizan otras entidades, o son
// difíciles de revertir), piden confirmación explícita antes de aplicarse.
export const estadosQueRequierenConfirmacion: EstadoPedido[] = ['Entregado', 'Cancelado'];