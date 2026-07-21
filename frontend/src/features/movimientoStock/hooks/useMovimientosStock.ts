import { useQuery } from '@tanstack/react-query';
import { movimientoStockService } from '@/services/movimientoStock.service';

export function useMovimientosStock() {
  return useQuery({
    queryKey: ['movimientosStock'],
    queryFn: () => movimientoStockService.getAll(),
  });
}