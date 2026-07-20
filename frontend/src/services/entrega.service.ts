import { apiClient } from '@/api/client';
import type {
  CambiarEstadoEntregaDto,
  EntregaRequestDto,
  EntregaResponseDto,
} from '@/types/entrega.types';

const BASE_PATH = '/api/Entrega';

export const entregaService = {
  getAll: async (): Promise<EntregaResponseDto[]> => {
    const response = await apiClient.get<EntregaResponseDto[]>(BASE_PATH);
    return response.data;
  },

  getById: async (id: number): Promise<EntregaResponseDto> => {
    const response = await apiClient.get<EntregaResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: EntregaRequestDto): Promise<EntregaResponseDto> => {
    const response = await apiClient.post<EntregaResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  cambiarEstado: async (id: number, dto: CambiarEstadoEntregaDto): Promise<void> => {
    await apiClient.patch(`${BASE_PATH}/${id}/estado`, dto);
  },
};