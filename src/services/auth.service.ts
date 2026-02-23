import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ChangeEmailRequest,
  UpdateProfileRequest,
  VerifyOtpRequest,
  DisableTwoFactorRequest,
  TwoFactorSetupResponse,
  MessageResponse,
  UserProfile,
} from '@/types';

export const authService = {
  login: (data: LoginRequest) => api.post<unknown, LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

  register: (data: RegisterRequest) =>
    api.post<unknown, { id: string; email: string }>(API_ENDPOINTS.AUTH.REGISTER, data),

  refresh: () => api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.REFRESH),

  logout: () => api.post<unknown, void>(API_ENDPOINTS.AUTH.LOGOUT),

  logoutAll: () => api.post<unknown, void>(API_ENDPOINTS.AUTH.LOGOUT_ALL),

  getProfile: () => api.get<unknown, UserProfile>(API_ENDPOINTS.AUTH.ME),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),

  changePassword: (data: ChangePasswordRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),

  changeEmail: (data: ChangeEmailRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.CHANGE_EMAIL, data),

  updateProfile: (data: UpdateProfileRequest) =>
    api.patch<unknown, MessageResponse>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data),

  setupTwoFactor: () => api.post<unknown, TwoFactorSetupResponse>(API_ENDPOINTS.AUTH.TWO_FACTOR_SETUP),

  confirmTwoFactor: (data: VerifyOtpRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.TWO_FACTOR_CONFIRM, data),

  authenticateTwoFactor: (data: VerifyOtpRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.TWO_FACTOR_AUTHENTICATE, data),

  disableTwoFactor: (data: DisableTwoFactorRequest) =>
    api.post<unknown, MessageResponse>(API_ENDPOINTS.AUTH.TWO_FACTOR_DISABLE, data),
};
