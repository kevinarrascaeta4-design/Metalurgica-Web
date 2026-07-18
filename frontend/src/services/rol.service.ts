import { apiClient } from '@/api/client';
import type { RolRequestDto, RolResponseDto } from '@/types/rol.types';

const BASE_PATH = '/api/Rol';

export const rolService = {
  getAll: async (): Promise<RolResponseDto[]> => {
    const response = await apiClient.get<RolResponseDto[]>(BASE_PATH);
    return response.data;
  },

  getById: async (id: number): Promise<RolResponseDto> => {
    const response = await apiClient.get<RolResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: RolRequestDto): Promise<RolResponseDto> => {
    const response = await apiClient.post<RolResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  update: async (id: number, dto: RolRequestDto): Promise<void> => {
    await apiClient.put(`${BASE_PATH}/${id}`, dto);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },
};