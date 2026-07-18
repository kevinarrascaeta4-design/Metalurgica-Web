import { apiClient } from '@/api/client';
import type {
  UsuarioRequestDto,
  UsuarioResponseDto,
  UsuarioUpdateDto,
} from '@/types/usuario.types';

const BASE_PATH = '/api/Usuario';

export const usuarioService = {
  getAll: async (incluirInactivos = false): Promise<UsuarioResponseDto[]> => {
    const response = await apiClient.get<UsuarioResponseDto[]>(BASE_PATH, {
      params: { incluirInactivos },
    });
    return response.data;
  },

  getById: async (id: number): Promise<UsuarioResponseDto> => {
    const response = await apiClient.get<UsuarioResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: UsuarioRequestDto): Promise<UsuarioResponseDto> => {
    const response = await apiClient.post<UsuarioResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  update: async (id: number, dto: UsuarioUpdateDto): Promise<void> => {
    await apiClient.put(`${BASE_PATH}/${id}`, dto);
  },

  deactivate: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },

  reactivate: async (id: number): Promise<void> => {
    await apiClient.patch(`${BASE_PATH}/${id}/reactivar`);
  },
};