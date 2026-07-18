import { apiClient } from '@/api/client';
import type { ProductoRequestDto, ProductoResponseDto } from '@/types/producto.types';

const BASE_PATH = '/api/Producto';

export const productoService = {
  getAll: async (): Promise<ProductoResponseDto[]> => {
    const response = await apiClient.get<ProductoResponseDto[]>(BASE_PATH);
    return response.data;
  },

  getById: async (id: number): Promise<ProductoResponseDto> => {
    const response = await apiClient.get<ProductoResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: ProductoRequestDto): Promise<ProductoResponseDto> => {
    const response = await apiClient.post<ProductoResponseDto>(BASE_PATH, dto);
    return response.data;
  },

  update: async (id: number, dto: ProductoRequestDto): Promise<void> => {
    await apiClient.put(`${BASE_PATH}/${id}`, dto);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },
};