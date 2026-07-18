import { useState } from 'react';
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
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateProducto();

  if (!producto) return null;

  const handleSubmit = (values: ProductoFormValues) => {
    setErrorMensaje(null);
    mutate(
      { id: producto.productoId, dto: values },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          setErrorMensaje(error.mensaje ?? 'Ocurrió un error al editar el producto.');
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
    <Dialog
      open={!!producto}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setErrorMensaje(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <ProductoForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}