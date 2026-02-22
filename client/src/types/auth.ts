// types/auth.ts
// Auth-related TypeScript types matching the backend API contracts

// ── API Response ───────────────────────────────────────────────
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

// ── JWT Payload (decoded from access_token) ────────────────────
export interface JwtPayload {
  sub: string; // userId
  email: string;
  iat: number;
  exp: number;
}

// ── User (client-side representation) ──────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
}

// ── Request DTOs ───────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}
