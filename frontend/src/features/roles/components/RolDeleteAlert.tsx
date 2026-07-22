import { toast } from 'sonner';
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
  const { mutate, isPending } = useDeleteRol();

  const handleDelete = () => {
    if (!rol) return;
    mutate(rol.rolId, {
      onSuccess: () => {
        toast.success('Rol eliminado correctamente.');
        onOpenChange(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al eliminar el rol.');
      },
    });
  };

  return (
    <AlertDialog open={!!rol} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el rol{' '}
            <strong>{rol?.nombre}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
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