import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movimientoStockService } from '@/services/movimientoStock.service';
import type { MovimientoStockRequestDto } from '@/types/movimientoStock.types';

export function useCreateMovimientoStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: MovimientoStockRequestDto) => movimientoStockService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movimientosStock'] });
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}