import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clienteService } from '@/services/cliente.service';

export function useReactivateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => clienteService.reactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}