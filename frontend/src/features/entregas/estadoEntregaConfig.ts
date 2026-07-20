import type { EstadoEntrega } from '@/types/entrega.types';

interface EstadoConfig {
  label: string;
  badgeClassName: string;
}

export const estadoEntregaConfig: Record<EstadoEntrega, EstadoConfig> = {
  Pendiente: {
    label: 'Pendiente',
    badgeClassName: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  },
  'En Camino': {
    label: 'En Camino',
    badgeClassName: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  Entregada: {
    label: 'Entregada',
    badgeClassName: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  Cancelada: {
    label: 'Cancelada',
    badgeClassName: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

export const transicionesPermitidas: Record<EstadoEntrega, EstadoEntrega[]> = {
  Pendiente: ['En Camino', 'Cancelada'],
  'En Camino': ['Entregada', 'Cancelada'],
  Entregada: [],
  Cancelada: [],
};

export const estadosQueRequierenConfirmacion: EstadoEntrega[] = ['Entregada', 'Cancelada'];