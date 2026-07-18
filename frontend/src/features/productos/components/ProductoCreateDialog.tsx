import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductoForm } from './ProductoForm';
import { useCreateProducto } from '../hooks/useCreateProducto';
import type { ProductoFormValues } from '../schemas/producto.schema';

export function ProductoCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateProducto();

  const handleSubmit = (values: ProductoFormValues) => {
    mutate(values, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
        </DialogHeader>
        <ProductoForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}