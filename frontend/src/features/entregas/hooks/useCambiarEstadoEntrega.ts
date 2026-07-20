import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entregaService } from '@/services/entrega.service';
import type { EstadoEntrega } from '@/types/entrega.types';

interface CambiarEstadoParams {
  id: number;
  nuevoEstado: EstadoEntrega;
}

export function useCambiarEstadoEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, nuevoEstado }: CambiarEstadoParams) =>
      entregaService.cambiarEstado(id, { nuevoEstado }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entregas'] });
      // Al marcar "Entregada", el backend sincroniza el Pedido asociado a "Entregado"
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
    },
  });
}