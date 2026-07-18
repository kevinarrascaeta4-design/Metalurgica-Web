import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuario.service';

export function useReactivateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usuarioService.reactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
}