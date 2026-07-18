import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productoService } from '@/services/producto.service';
import type { ProductoRequestDto } from '@/types/producto.types';

interface UpdateProductoParams {
  id: number;
  dto: ProductoRequestDto;
}

export function useUpdateProducto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateProductoParams) => productoService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}