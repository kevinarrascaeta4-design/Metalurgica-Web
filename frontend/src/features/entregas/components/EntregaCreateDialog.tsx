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
import { EntregaCreateForm } from './EntregaCreateForm';
import { useCreateEntrega } from '../hooks/useCreateEntrega';
import type { EntregaFormValues } from '../schemas/entrega.schema';

export function EntregaCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateEntrega();

  const handleSubmit = (values: EntregaFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Entrega creada correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al crear la entrega.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <EntregaCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}