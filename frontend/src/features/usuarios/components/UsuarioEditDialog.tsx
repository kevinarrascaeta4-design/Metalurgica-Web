import { toast } from 'sonner';
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
  const { mutate, isPending } = useUpdateUsuario();

  if (!usuario) return null;

  const handleSubmit = (values: UsuarioUpdateFormValues) => {
    const dto = {
      ...values,
      password: values.password ? values.password : undefined,
    };

    mutate(
      { id: usuario.usuarioId, dto },
      {
        onSuccess: () => {
          toast.success('Usuario actualizado correctamente.');
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al editar el usuario.');
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
    <Dialog open={!!usuario} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <UsuarioEditForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}