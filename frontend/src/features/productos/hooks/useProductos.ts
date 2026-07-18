import { useQuery } from '@tanstack/react-query';
import { productoService } from '@/services/producto.service';

export function useProductos() {
  return useQuery({
    queryKey: ['productos'],
    queryFn: productoService.getAll,
  });
}