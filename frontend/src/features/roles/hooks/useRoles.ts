import { useQuery } from '@tanstack/react-query';
import { rolService } from '@/services/rol.service';

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: rolService.getAll,
  });
}