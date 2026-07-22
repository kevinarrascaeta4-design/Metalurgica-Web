import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MovimientoStockCreateForm } from './MovimientoStockCreateForm';
import { useCreateMovimientoStock } from '../hooks/useCreateMovimientoStock';
import type { MovimientoStockFormValues } from '../schemas/movimientoStock.schema';

export function MovimientoStockCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateMovimientoStock();

  const handleSubmit = (values: MovimientoStockFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Movimiento registrado correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al registrar el movimiento.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo Movimiento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento de Stock</DialogTitle>
        </DialogHeader>
        <MovimientoStockCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}