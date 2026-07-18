import { useQuery } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuario.service';

export function useUsuarios(incluirInactivos: boolean) {
  return useQuery({
    queryKey: ['usuarios', { incluirInactivos }],
    queryFn: () => usuarioService.getAll(incluirInactivos),
  });
}