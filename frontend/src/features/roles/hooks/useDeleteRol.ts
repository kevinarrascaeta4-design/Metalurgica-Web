import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rolService } from '@/services/rol.service';

export function useDeleteRol() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => rolService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}