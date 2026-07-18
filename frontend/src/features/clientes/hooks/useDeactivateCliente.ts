import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clienteService } from '@/services/cliente.service';

export function useDeactivateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => clienteService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}