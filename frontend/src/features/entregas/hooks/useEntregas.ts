import { useQuery } from '@tanstack/react-query';
import { entregaService } from '@/services/entrega.service';

export function useEntregas() {
  return useQuery({
    queryKey: ['entregas'],
    queryFn: entregaService.getAll,
  });
}