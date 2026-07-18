import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuario.service';

export function useDeactivateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usuarioService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
}