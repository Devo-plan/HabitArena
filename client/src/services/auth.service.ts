// services/auth.service.ts
// Auth business logic — token decoding and user extraction

import type { JwtPayload, AuthUser } from '@/types/auth';

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
