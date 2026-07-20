import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entregaService } from '@/services/entrega.service';
import type { EntregaRequestDto } from '@/types/entrega.types';

export function useCreateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: EntregaRequestDto) => entregaService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entregas'] });
    },
  });
}