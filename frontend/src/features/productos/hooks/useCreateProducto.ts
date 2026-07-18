import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productoService } from '@/services/producto.service';
import type { ProductoRequestDto } from '@/types/producto.types';

export function useCreateProducto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ProductoRequestDto) => productoService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}