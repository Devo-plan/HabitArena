// services/auth.service.ts
// Auth API service — calls backend auth endpoints

import api from './api';
import type { AuthTokens, LoginRequest, RegisterRequest, JwtPayload, AuthUser } from '@/types/auth';

// ── API Calls ──────────────────────────────────────────────────

export const authService = {
  login: (data: LoginRequest) => api.post<AuthTokens>('/auth/login', data),

  register: (data: RegisterRequest) => api.post<AuthTokens>('/auth/register', data),
};

// ── Token Helpers ──────────────────────────────────────────────

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload) as JwtPayload;
  } catch {
    return null;
  }
}

export function extractUserFromToken(accessToken: string, displayName?: string): AuthUser | null {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email,
    displayName: displayName ?? payload.email.split('@')[0],
  };
}
