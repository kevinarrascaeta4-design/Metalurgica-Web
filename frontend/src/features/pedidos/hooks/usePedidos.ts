import { useQuery } from '@tanstack/react-query';
import { pedidoService } from '@/services/pedido.service';

export function usePedidos() {
  return useQuery({
    queryKey: ['pedidos'],
    queryFn: pedidoService.getAll,
  });
}