import { useState } from 'react';
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
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateRol();

  if (!rol) return null;

  const handleSubmit = (values: RolFormValues) => {
    setErrorMensaje(null);
    mutate(
      { id: rol.rolId, dto: values },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          setErrorMensaje(error.mensaje ?? 'Ocurrió un error al editar el rol.');
        },
      },
    );
  };

  return (
    <Dialog
      open={!!rol}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setErrorMensaje(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <RolForm
          defaultValues={{ nombre: rol.nombre }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}