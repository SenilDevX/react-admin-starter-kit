import axios, { type AxiosError } from 'axios';
import { API_BASE_URL } from './constants';
import { API_ENDPOINTS } from './api-endpoints';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const errorData = error.response?.data as
      | { success: false; error: { statusCode: number; message: string | string[] } }
      | undefined;

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH)
    ) {
      const { useAuthStore } = await import('@/stores/auth-store');
      const isAuthenticated = useAuthStore.getState().isAuthenticated;

      if (isAuthenticated) {
        try {
          await api.post(API_ENDPOINTS.AUTH.REFRESH);
        } catch {
          useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
    }

    const message = errorData?.error?.message ?? 'An unexpected error occurred';
    return Promise.reject({
      statusCode: error.response?.status ?? 500,
      message: Array.isArray(message) ? message[0] : message,
      messages: Array.isArray(message) ? message : [message],
    });
  },
);
