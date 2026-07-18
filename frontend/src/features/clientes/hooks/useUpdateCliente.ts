import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clienteService } from '@/services/cliente.service';
import type { ClienteRequestDto } from '@/types/cliente.types';

interface UpdateClienteParams {
  id: number;
  dto: ClienteRequestDto;
}

export function useUpdateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateClienteParams) => clienteService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}