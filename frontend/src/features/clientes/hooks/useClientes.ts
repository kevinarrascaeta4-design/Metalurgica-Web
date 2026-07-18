import { useQuery } from '@tanstack/react-query';
import { clienteService } from '@/services/cliente.service';

export function useClientes(incluirInactivos: boolean) {
  return useQuery({
    queryKey: ['clientes', { incluirInactivos }],
    queryFn: () => clienteService.getAll(incluirInactivos),
  });
}