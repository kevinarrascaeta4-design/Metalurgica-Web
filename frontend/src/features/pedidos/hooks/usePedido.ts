import { useQuery } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedido.service';

export function usePedido(id: number) {
  return useQuery({
    queryKey: ['pedidos', id],
    queryFn: () => pedidoService.getById(id),
    enabled: !!id,
  });
}