import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UsuarioEditForm } from './UsuarioEditForm';
import { useUpdateUsuario } from '../hooks/useUpdateUsuario';
import type { UsuarioUpdateFormValues } from '../schemas/usuario.schema';
import type { UsuarioResponseDto } from '@/types/usuario.types';

interface UsuarioEditDialogProps {
  usuario: UsuarioResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function UsuarioEditDialog({ usuario, onOpenChange }: UsuarioEditDialogProps) {
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateUsuario();

  if (!usuario) return null;

  const handleSubmit = (values: UsuarioUpdateFormValues) => {
    setErrorMensaje(null);

    // Si el campo de password quedó vacío, no lo mandamos (el backend interpreta
    // la ausencia de password como "no cambiar la contraseña actual").
    const dto = {
      ...values,
      password: values.password ? values.password : undefined,
    };

    mutate(
      { id: usuario.usuarioId, dto },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          setErrorMensaje(error.mensaje ?? 'Ocurrió un error al editar el usuario.');
        },
      },
    );
  };

  const defaultValues: UsuarioUpdateFormValues = {
    rolId: usuario.rolId,
    nombre: usuario.nombre,
    email: usuario.email,
    password: '',
  };

  return (
    <Dialog
      open={!!usuario}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setErrorMensaje(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <UsuarioEditForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}