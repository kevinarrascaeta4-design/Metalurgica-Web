import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ClienteForm } from './ClienteForm';
import { useUpdateCliente } from '../hooks/useUpdateCliente';
import type { ClienteFormValues } from '../schemas/cliente.schema';
import type { ClienteResponseDto } from '@/types/cliente.types';

interface ClienteEditDialogProps {
  cliente: ClienteResponseDto | null;
  onOpenChange: (open: boolean) => void;
}

export function ClienteEditDialog({ cliente, onOpenChange }: ClienteEditDialogProps) {
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const { mutate, isPending } = useUpdateCliente();

  if (!cliente) return null;

  const handleSubmit = (values: ClienteFormValues) => {
    setErrorMensaje(null);
    mutate(
      { id: cliente.clienteId, dto: values },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error: any) => {
          setErrorMensaje(error.mensaje ?? 'Ocurrió un error al editar el cliente.');
        },
      },
    );
  };

  const defaultValues: ClienteFormValues = {
    cuit: cliente.cuit,
    razonSocial: cliente.razonSocial,
    email: cliente.email ?? '',
    telefono: cliente.telefono ?? '',
    direccion: cliente.direccion ?? '',
  };

  return (
    <Dialog
      open={!!cliente}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setErrorMensaje(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        {errorMensaje && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMensaje}
          </p>
        )}
        <ClienteForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}