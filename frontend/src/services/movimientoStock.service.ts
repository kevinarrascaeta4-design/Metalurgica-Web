import { apiClient } from '@/api/client';
import type {
  MovimientoStockRequestDto,
  MovimientoStockResponseDto,
} from '@/types/movimientoStock.types';

const BASE_PATH = '/api/MovimientoStock';

export const movimientoStockService = {
  getAll: async (productoId?: number): Promise<MovimientoStockResponseDto[]> => {
    const response = await apiClient.get<MovimientoStockResponseDto[]>(BASE_PATH, {
      params: productoId ? { productoId } : undefined,
    });
    return response.data;
  },

  getById: async (id: number): Promise<MovimientoStockResponseDto> => {
    const response = await apiClient.get<MovimientoStockResponseDto>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  create: async (dto: MovimientoStockRequestDto): Promise<MovimientoStockResponseDto> => {
    const response = await apiClient.post<MovimientoStockResponseDto>(BASE_PATH, dto);
    return response.data;
  },
};