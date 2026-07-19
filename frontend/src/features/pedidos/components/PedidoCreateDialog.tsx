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
import { PedidoCreateForm } from './PedidoCreateForm';
import { useCreatePedido } from '../hooks/useCreatePedido';
import type { PedidoFormValues } from '../schemas/pedido.schema';

export function PedidoCreateDialog() {
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useCreatePedido();

  const handleSubmit = (values: PedidoFormValues) => {
    setErrorMensaje(null);
    mutate(values, {
      onSuccess: () => setOpen(false),
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al crear el pedido.');
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
          Nuevo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Pedido</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <PedidoCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}