import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rolService } from '@/services/rol.service';
import type { RolRequestDto } from '@/types/rol.types';

export function useCreateRol() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RolRequestDto) => rolService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}