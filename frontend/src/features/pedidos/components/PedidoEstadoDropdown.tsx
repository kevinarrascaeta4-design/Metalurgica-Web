import { useState } from 'react';
import { toast } from 'sonner';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCambiarEstadoPedido } from '../hooks/useCambiarEstadoPedido';
import {
  estadoPedidoConfig,
  estadosQueRequierenConfirmacion,
  transicionesPermitidas,
} from '../estadoPedidoConfig';
import type { EstadoPedido } from '@/types/pedido.types';

interface PedidoEstadoDropdownProps {
  pedidoId: number;
  estadoActual: EstadoPedido;
}

export function PedidoEstadoDropdown({ pedidoId, estadoActual }: PedidoEstadoDropdownProps) {
  const [estadoPendiente, setEstadoPendiente] = useState<EstadoPedido | null>(null);
  const { mutate, isPending } = useCambiarEstadoPedido();

  const config = estadoPedidoConfig[estadoActual];
  const opcionesDisponibles = transicionesPermitidas[estadoActual];

  const ejecutarCambio = (nuevoEstado: EstadoPedido) => {
    mutate(
      { id: pedidoId, nuevoEstado },
      {
        onSuccess: () => {
          toast.success(`Pedido marcado como ${estadoPedidoConfig[nuevoEstado].label}.`);
          setEstadoPendiente(null);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al cambiar el estado.');
        },
      },
    );
  };

  const handleSeleccionar = (nuevoEstado: EstadoPedido) => {
    if (estadosQueRequierenConfirmacion.includes(nuevoEstado)) {
      setEstadoPendiente(nuevoEstado);
    } else {
      ejecutarCambio(nuevoEstado);
    }
  };

  if (opcionesDisponibles.length === 0) {
    return <Badge className={config.badgeClassName}>{config.label}</Badge>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-1">
            <Badge className={config.badgeClassName}>{config.label}</Badge>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {opcionesDisponibles.map((opcion) => (
            <DropdownMenuItem key={opcion} onClick={() => handleSeleccionar(opcion)}>
              Marcar como {estadoPedidoConfig[opcion].label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={estadoPendiente !== null}
        onOpenChange={(open) => !open && setEstadoPendiente(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Marcar pedido como{' '}
              {estadoPendiente ? estadoPedidoConfig[estadoPendiente].label : ''}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción puede no ser reversible desde esta pantalla. Confirmá que querés
              continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => estadoPendiente && ejecutarCambio(estadoPendiente)}
              disabled={isPending}
            >
              {isPending ? 'Guardando...' : 'Confirmar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}