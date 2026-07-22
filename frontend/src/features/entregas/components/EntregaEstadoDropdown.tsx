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
import { useCambiarEstadoEntrega } from '../hooks/useCambiarEstadoEntrega';
import {
  estadoEntregaConfig,
  estadosQueRequierenConfirmacion,
  transicionesPermitidas,
} from '../estadoEntregaConfig';
import type { EstadoEntrega } from '@/types/entrega.types';

interface EntregaEstadoDropdownProps {
  entregaId: number;
  estadoActual: EstadoEntrega;
}

export function EntregaEstadoDropdown({ entregaId, estadoActual }: EntregaEstadoDropdownProps) {
  const [estadoPendiente, setEstadoPendiente] = useState<EstadoEntrega | null>(null);
  const { mutate, isPending } = useCambiarEstadoEntrega();

  const config = estadoEntregaConfig[estadoActual];
  const opcionesDisponibles = transicionesPermitidas[estadoActual];

  const ejecutarCambio = (nuevoEstado: EstadoEntrega) => {
    mutate(
      { id: entregaId, nuevoEstado },
      {
        onSuccess: () => {
          toast.success(`Entrega marcada como ${estadoEntregaConfig[nuevoEstado].label}.`);
          setEstadoPendiente(null);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al cambiar el estado.');
        },
      },
    );
  };

  const handleSeleccionar = (nuevoEstado: EstadoEntrega) => {
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
              Marcar como {estadoEntregaConfig[opcion].label}
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
              ¿Marcar entrega como{' '}
              {estadoPendiente ? estadoEntregaConfig[estadoPendiente].label : ''}?
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