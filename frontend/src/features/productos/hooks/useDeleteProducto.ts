import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productoService } from '@/services/producto.service';

export function useDeleteProducto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
}