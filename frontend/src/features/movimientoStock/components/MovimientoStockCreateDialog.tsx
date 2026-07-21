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
import { MovimientoStockCreateForm } from './MovimientoStockCreateForm';
import { useCreateMovimientoStock } from '../hooks/useCreateMovimientoStock';
import type { MovimientoStockFormValues } from '../schemas/movimientoStock.schema';

export function MovimientoStockCreateDialog() {
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useCreateMovimientoStock();

  const handleSubmit = (values: MovimientoStockFormValues) => {
    setErrorMensaje(null);
    mutate(values, {
      onSuccess: () => setOpen(false),
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al registrar el movimiento.');
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setErrorMensaje(null);
      }}
    >
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
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <MovimientoStockCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}