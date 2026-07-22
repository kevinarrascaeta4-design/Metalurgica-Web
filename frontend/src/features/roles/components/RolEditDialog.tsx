import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RolForm } from './RolForm';
import { useUpdateRol } from '../hooks/useUpdateRol';
import type { RolFormValues } from '../schemas/rol.schema';
import type { RolResponseDto } from '@/types/rol.types';

interface RolEditDialogProps {
  rol: RolResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function RolEditDialog({ rol, onOpenChange }: RolEditDialogProps) {
  const { mutate, isPending } = useUpdateRol();

  if (!rol) return null;

  const handleSubmit = (values: RolFormValues) => {
    mutate(
      { id: rol.rolId, dto: values },
      {
        onSuccess: () => {
          toast.success('Rol actualizado correctamente.');
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al editar el rol.');
        },
      },
    );
  };

  return (
    <Dialog open={!!rol} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
        </DialogHeader>
        <RolForm
          defaultValues={{ nombre: rol.nombre }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}