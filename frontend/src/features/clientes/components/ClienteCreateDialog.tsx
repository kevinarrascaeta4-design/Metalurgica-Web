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
import { ClienteForm } from './ClienteForm';
import { useCreateCliente } from '../hooks/useCreateCliente';
import type { ClienteFormValues } from '../schemas/cliente.schema';

export function ClienteCreateDialog() {
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useCreateCliente();

  const handleSubmit = (values: ClienteFormValues) => {
    setErrorMensaje(null);
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al crear el cliente.');
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
          Nuevo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Cliente</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <ClienteForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}