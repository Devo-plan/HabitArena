// app.constants.ts — HabitArena Application-Wide Constants
// SIDEBAR constants live here so Sidebar.tsx and DashboardLayout.tsx
// always stay in sync — changing width in one place updates both

export const APP_NAME = 'HabitArena';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// Sidebar layout dimensions
// FIX: Centralised here to eliminate the hardcoded value mismatch bug
// between Sidebar.tsx (visual width) and DashboardLayout.tsx (content margin)
export const SIDEBAR = {
  EXPANDED_WIDTH: 260, // px — full sidebar with labels
  COLLAPSED_WIDTH: 64, // px — icon-rail mode
  MOBILE_BREAKPOINT: 768, // px — matches Tailwind's md breakpoint
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
