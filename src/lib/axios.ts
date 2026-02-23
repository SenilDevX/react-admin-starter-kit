import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './constants';
import { API_ENDPOINTS } from './api-endpoints';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: InternalAxiosRequestConfig;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      resolve(api(config));
    }
  });
  failedQueue = [];
};

// Response interceptor: unwrap { success, data } and handle 401 refresh
api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Extract error body
    const errorData = error.response?.data as
      | { success: false; error: { statusCode: number; message: string | string[] } }
      | undefined;

    // If 401 and not a refresh request itself, attempt silent refresh
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        await api.post(API_ENDPOINTS.AUTH.REFRESH);
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        const { useAuthStore } = await import('@/stores/auth-store');
        useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalize error message
    const message = errorData?.error?.message ?? 'An unexpected error occurred';
    return Promise.reject({
      statusCode: error.response?.status ?? 500,
      message: Array.isArray(message) ? message[0] : message,
      messages: Array.isArray(message) ? message : [message],
    });
  },
);
