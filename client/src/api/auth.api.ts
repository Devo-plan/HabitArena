// api/auth.api.ts
// Auth API — HTTP calls only

import api from '@/services/api';
import type { AuthTokens, LoginRequest, RegisterRequest } from '@/types/auth';

export const authAPI = {
  login: (data: LoginRequest) => api.post<AuthTokens>('/auth/login', data),

  register: (data: RegisterRequest) => api.post<AuthTokens>('/auth/register', data),
};
