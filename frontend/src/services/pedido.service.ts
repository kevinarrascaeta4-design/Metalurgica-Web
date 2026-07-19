import { apiClient } from '@/api/client';
import type {
  CambiarEstadoDto,
  PedidoRequestDto,
  PedidoResponseDto,
} from '@/types/pedido.types';

const BASE_PATH = '/api/Pedido';

export const pedidoService = {
  getAll: async (): Promise<PedidoResponseDto[]> => {
    const response = await apiClient.get<PedidoResponseDto[]>(BASE_PATH);
    return response.data;
  },

  getById: async (id: number): Promise<PedidoResponseDto> => {
    const response = await apiClient.get<PedidoResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: PedidoRequestDto): Promise<PedidoResponseDto> => {
    const response = await apiClient.post<PedidoResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  cambiarEstado: async (id: number, dto: CambiarEstadoDto): Promise<void> => {
    await apiClient.patch(`${BASE_PATH}/${id}/estado`, dto);
  },
};