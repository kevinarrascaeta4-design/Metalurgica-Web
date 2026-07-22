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
import { UsuarioCreateForm } from './UsuarioCreateForm';
import { useCreateUsuario } from '../hooks/useCreateUsuario';
import type { UsuarioCreateFormValues } from '../schemas/usuario.schema';

export function UsuarioCreateDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateUsuario();

  const handleSubmit = (values: UsuarioCreateFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Usuario creado correctamente.');
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.mensaje ?? 'Ocurrió un error al crear el usuario.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <UsuarioCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}