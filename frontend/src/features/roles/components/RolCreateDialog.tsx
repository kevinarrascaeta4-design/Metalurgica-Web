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
import { RolForm } from './RolForm';
import { useCreateRol } from '../hooks/useCreateRol';
import type { RolFormValues } from '../schemas/rol.schema';

export function RolCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateRol();

  const handleSubmit = (values: RolFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Rol creado correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al crear el rol.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo Rol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Rol</DialogTitle>
        </DialogHeader>
        <RolForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}