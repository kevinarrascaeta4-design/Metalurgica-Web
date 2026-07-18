import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clienteService } from '@/services/cliente.service';
import type { ClienteRequestDto } from '@/types/cliente.types';

export function useCreateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ClienteRequestDto) => clienteService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}