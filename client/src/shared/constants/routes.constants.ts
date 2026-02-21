// routes.constants.ts — HabitArena Centralized Route Definitions
// All route strings live here — never hardcode paths in components

export const PUBLIC_ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

// All authenticated arena section routes
export const ARENA_ROUTES = {
  DASHBOARD: '/dashboard',
  RITUAL: '/ritual',
  CHALLENGES: '/challenges',
  SQUADS: '/squads',
  PROFILE: '/profile',
} as const;

// Used by ProtectedRoute and middleware to guard authenticated sections
export const PROTECTED_ROUTES = Object.values(ARENA_ROUTES);
