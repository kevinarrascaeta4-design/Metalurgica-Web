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