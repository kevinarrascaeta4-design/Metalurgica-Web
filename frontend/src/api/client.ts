import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuesta: normaliza los errores que devuelve el backend
// para que el resto del código no tenga que lidiar con la forma cruda de Axios.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const mensaje =
      error.response?.data?.mensaje ?? 'Ocurrió un error inesperado. Intentá nuevamente.';

    return Promise.reject({
      status: error.response?.status,
      mensaje,
    });
  },
);