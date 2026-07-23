import { apiClient } from '@/api/client';
import type { LoginRequestDto, LoginResponseDto } from '@/types/auth.types';

const BASE_PATH = '/api/Auth';

export const authService = {
  login: async (dto: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await apiClient.post<LoginResponseDto>(`${BASE_PATH}/login`, dto);
    return response.data;
  },
};