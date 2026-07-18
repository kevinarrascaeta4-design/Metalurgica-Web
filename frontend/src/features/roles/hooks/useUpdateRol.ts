import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rolService } from '@/services/rol.service';
import type { RolRequestDto } from '@/types/rol.types';

interface UpdateRolParams {
  id: number;
  dto: RolRequestDto;
}

export function useUpdateRol() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateRolParams) => rolService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}