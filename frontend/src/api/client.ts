import axios from 'axios';
import { authStorage } from '@/utils/authStorage';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request: agrega el token de autenticación a cada peticion,
// si existe uno guardado.
apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response: normaliza los errores que devuelve el backend
// para que el resto del codigo no tenga que lidiar con la forma cruda de Axios.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 401 sin cuerpo "mensaje" = token invalido/expirado (lo genera el
    // middleware de autenticacion de ASP.NET Core, no nuestro codigo).
    // Lo distinguimos del 401 de login fallido, que SI trae { mensaje }.
    const esSesionExpirada = status === 401 && !error.response?.data?.mensaje;

    if (esSesionExpirada) {
      authStorage.clear();
      window.location.href = '/login';
      return Promise.reject({
        status,
        mensaje: 'Tu sesión expiró. Iniciá sesión nuevamente.',
      });
    }

    const mensaje =
      error.response?.data?.mensaje ?? 'Ocurrió un error inesperado. Intentá nuevamente.';

    return Promise.reject({ status, mensaje });
  },
);