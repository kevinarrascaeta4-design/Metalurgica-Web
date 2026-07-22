import { toast } from 'sonner';
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
  const { mutate, isPending } = useUpdateCliente();

  if (!cliente) return null;

  const handleSubmit = (values: ClienteFormValues) => {
    mutate(
      { id: cliente.clienteId, dto: values },
      {
        onSuccess: () => {
          toast.success('Cliente actualizado correctamente.');
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.mensaje ?? 'Ocurrió un error al editar el cliente.');
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
    <Dialog open={!!cliente} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}