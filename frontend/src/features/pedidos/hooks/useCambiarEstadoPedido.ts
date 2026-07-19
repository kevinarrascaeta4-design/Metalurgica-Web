import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedido.service';
import type { EstadoPedido } from '@/types/pedido.types';

interface CambiarEstadoParams {
  id: number;
  nuevoEstado: EstadoPedido;
}

export function useCambiarEstadoPedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, nuevoEstado }: CambiarEstadoParams) =>
      pedidoService.cambiarEstado(id, { nuevoEstado }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      queryClient.invalidateQueries({ queryKey: ['entregas'] });
    },
  });
}