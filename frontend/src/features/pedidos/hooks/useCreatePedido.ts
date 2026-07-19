import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedido.service';
import type { PedidoRequestDto } from '@/types/pedido.types';

export function useCreatePedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: PedidoRequestDto) => pedidoService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}