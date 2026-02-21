// ── Public / Auth Routes ─────────────────────────────────────────────
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

// ── Protected Arena Routes ───────────────────────────────────────────
export const ARENA_ROUTES = {
  DASHBOARD: '/dashboard',
  RITUAL: '/ritual',
  CHALLENGES: '/challenges',
  SQUADS: '/squads',
  PROFILE: '/profile',
} as const;

// ── Public Landing Route ─────────────────────────────────────────────
export const PUBLIC_ROUTES = {
  HOME: '/',
} as const;

// ── Middleware Guard ─────────────────────────────────────────────────
// Used in middleware.ts to check if a route requires authentication
// Object.values gives: ['/dashboard', '/ritual', '/challenges', '/squads', '/profile']
export const PROTECTED_ROUTES: string[] = Object.values(ARENA_ROUTES);

// ── Default Redirects ────────────────────────────────────────────────
// After login  → send user here
// After logout → send user here
export const REDIRECT_AFTER_LOGIN = ARENA_ROUTES.DASHBOARD;
export const REDIRECT_AFTER_LOGOUT = AUTH_ROUTES.LOGIN;
