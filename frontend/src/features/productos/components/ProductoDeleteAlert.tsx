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
import { useDeleteProducto } from '../hooks/useDeleteProducto';
import type { ProductoResponseDto } from '@/types/producto.types';

interface ProductoDeleteAlertProps {
  producto: ProductoResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function ProductoDeleteAlert({ producto, onOpenChange }: ProductoDeleteAlertProps) {
  const { mutate, isPending } = useDeleteProducto();

  const handleDelete = () => {
    if (!producto) return;
    mutate(producto.productoId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={!!producto} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el producto{' '}
            <strong>{producto?.nombre}</strong>.
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