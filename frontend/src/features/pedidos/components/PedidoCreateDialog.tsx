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
import { PedidoCreateForm } from './PedidoCreateForm';
import { useCreatePedido } from '../hooks/useCreatePedido';
import type { PedidoFormValues } from '../schemas/pedido.schema';

export function PedidoCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreatePedido();

  const handleSubmit = (values: PedidoFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Pedido creado correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al crear el pedido.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <PedidoCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}