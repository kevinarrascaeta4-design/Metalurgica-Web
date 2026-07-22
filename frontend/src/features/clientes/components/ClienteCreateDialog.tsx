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
import { ClienteForm } from './ClienteForm';
import { useCreateCliente } from '../hooks/useCreateCliente';
import type { ClienteFormValues } from '../schemas/cliente.schema';

export function ClienteCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateCliente();

  const handleSubmit = (values: ClienteFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Cliente creado correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al crear el cliente.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}