import { useState } from 'react';
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
import { useDeleteRol } from '../hooks/useDeleteRol';
import type { RolResponseDto } from '@/types/rol.types';

interface RolDeleteAlertProps {
  rol: RolResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function RolDeleteAlert({ rol, onOpenChange }: RolDeleteAlertProps) {
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useDeleteRol();

  const handleDelete = () => {
    if (!rol) return;
    setErrorMensaje(null);
    mutate(rol.rolId, {
      onSuccess: () => onOpenChange(false),
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al eliminar el rol.');
      },
    });
  };

  return (
    <AlertDialog
      open={!!rol}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setErrorMensaje(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el rol{' '}
            <strong>{rol?.nombre}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}