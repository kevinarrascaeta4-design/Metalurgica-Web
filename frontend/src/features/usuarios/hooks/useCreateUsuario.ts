import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuario.service';
import type { UsuarioRequestDto } from '@/types/usuario.types';

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UsuarioRequestDto) => usuarioService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
}