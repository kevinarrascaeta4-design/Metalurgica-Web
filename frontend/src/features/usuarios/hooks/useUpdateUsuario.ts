import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuario.service';
import type { UsuarioUpdateDto } from '@/types/usuario.types';

interface UpdateUsuarioParams {
  id: number;
  dto: UsuarioUpdateDto;
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateUsuarioParams) => usuarioService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
}