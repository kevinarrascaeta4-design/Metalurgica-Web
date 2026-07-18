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
import { UsuarioCreateForm } from './UsuarioCreateForm';
import { useCreateUsuario } from '../hooks/useCreateUsuario';
import type { UsuarioCreateFormValues } from '../schemas/usuario.schema';

export function UsuarioCreateDialog() {
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useCreateUsuario();

  const handleSubmit = (values: UsuarioCreateFormValues) => {
    setErrorMensaje(null);
    mutate(values, {
      onSuccess: () => setOpen(false),
      onError: (error: any) => {
        setErrorMensaje(error.mensaje ?? 'Ocurrió un error al crear el usuario.');
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
          Nuevo Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Usuario</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <UsuarioCreateForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}