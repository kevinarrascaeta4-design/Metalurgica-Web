import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductoForm } from './ProductoForm';
import { useUpdateProducto } from '../hooks/useUpdateProducto';
import type { ProductoFormValues } from '../schemas/producto.schema';
import type { ProductoResponseDto } from '@/types/producto.types';

interface ProductoEditDialogProps {
  producto: ProductoResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function ProductoEditDialog({ producto, onOpenChange }: ProductoEditDialogProps) {
  const { mutate, isPending } = useUpdateProducto();

  if (!producto) return null;

  const handleSubmit = (values: ProductoFormValues) => {
    mutate(
      { id: producto.productoId, dto: values },
      {
        onSuccess: () => {
          toast.success('Producto actualizado correctamente.');
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al editar el producto.');
        },
      },
    );
  };

  const defaultValues: ProductoFormValues = {
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? '',
    precio: producto.precio,
    stockActual: producto.stockActual,
    stockMinimo: producto.stockMinimo,
    activo: producto.activo,
    codigo: producto.codigo,
  };

  return (
    <Dialog open={!!producto} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <ProductoForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}