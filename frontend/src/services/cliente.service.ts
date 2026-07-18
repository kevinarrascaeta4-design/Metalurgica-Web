import { apiClient } from '@/api/client';
import type { ClienteRequestDto, ClienteResponseDto } from '@/types/cliente.types';

const BASE_PATH = '/api/Cliente';

export const clienteService = {
  getAll: async (incluirInactivos = false): Promise<ClienteResponseDto[]> => {
    const response = await apiClient.get<ClienteResponseDto[]>(BASE_PATH, {
      params: { incluirInactivos },
    });
    return response.data;
  },

  getById: async (id: number): Promise<ClienteResponseDto> => {
    const response = await apiClient.get<ClienteResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: ClienteRequestDto): Promise<ClienteResponseDto> => {
    const response = await apiClient.post<ClienteResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  update: async (id: number, dto: ClienteRequestDto): Promise<void> => {
    await apiClient.put(`${BASE_PATH}/${id}`, dto);
  },

  deactivate: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },

  reactivate: async (id: number): Promise<void> => {
    await apiClient.patch(`${BASE_PATH}/${id}/reactivar`);
  },
};