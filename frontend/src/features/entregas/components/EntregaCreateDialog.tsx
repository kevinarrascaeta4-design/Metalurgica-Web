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
import { EntregaCreateForm } from './EntregaCreateForm';
import { useCreateEntrega } from '../hooks/useCreateEntrega';
import type { EntregaFormValues } from '../schemas/entrega.schema';

export function EntregaCreateDialog() {
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useCreateEntrega();

  const handleSubmit = (values: EntregaFormValues) => {
    setErrorMensaje(null);
    mutate(values, {
      onSuccess: () => setOpen(false),
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al crear la entrega.');
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
          Nueva Entrega
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Entrega</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <EntregaCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}