// theme.ts - HabitArena Competitive Design System
// Inspired by: Gaming tournaments, sports arenas, live competition
// Color psychology: Energy, intensity, focus, achievement

export const theme = {
  // ==================== COLOR PALETTE ====================
  // Arena Competition Theme: Orange/Red/Steel/Gold
  colors: {
    // Primary Brand Colors (Electric Orange - Energy & Action)
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main brand - Electric Orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },

    // Secondary Colors (Crimson Red - Competition & Intensity)
    secondary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Crimson Red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },

    // Accent Colors (Steel Blue - Focus & Live Presence)
    accent: {
      steel: '#06b6d4', // Steel blue for live indicators
      gold: '#f59e0b', // Victory gold for achievements
      emerald: '#10b981', // Success green
      crimson: '#dc2626', // Rival red
      orange: '#f97316', // Energy orange
      slate: '#64748b', // Neutral slate
    },

    // Background Colors (Dark Arena Aesthetic)
    background: {
      primary: '#0f0f0f', // Near black - serious tone
      secondary: '#1a1a1a', // Dark charcoal
      tertiary: '#262626', // Lighter charcoal
      card: 'rgba(247, 115, 22, 0.03)', // Subtle orange tint
      cardHover: 'rgba(247, 115, 22, 0.08)',
      glass: 'rgba(26, 26, 26, 0.7)',
      hover: 'rgba(247, 115, 22, 0.05)',
      danger: 'rgba(220, 38, 38, 0.1)', // Streak warning background
    },

    // Text Colors
    text: {
      primary: '#ffffff',
      secondary: '#e5e5e5',
      tertiary: '#a3a3a3',
      muted: '#737373',
      accent: '#f97316', // Orange for highlights
      danger: '#ef4444', // Red for warnings
    },

    // Border Colors
    border: {
      primary: 'rgba(247, 115, 22, 0.15)',
      secondary: 'rgba(247, 115, 22, 0.25)',
      accent: 'rgba(6, 182, 212, 0.4)',
      danger: 'rgba(220, 38, 38, 0.4)',
    },

    // Gradient Definitions
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)', // Orange to Red
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #f97316 100%)', // Steel to Orange
      hero: 'linear-gradient(180deg, #ffffff 0%, #a3a3a3 100%)',
      card: 'linear-gradient(135deg, rgba(247, 115, 22, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)',
      victory: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', // Gold gradient
      danger: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', // Red gradient
    },

    // Live Status Colors
    live: {
      active: '#10b981', // Green dot - user is live
      idle: '#f59e0b', // Yellow - idle/away
      offline: '#64748b', // Gray - offline
    },
    error: '#ef4444',
  },

  // ==================== TYPOGRAPHY ====================
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "'Plus Jakarta Sans', 'Inter', sans-serif", // More athletic feel
      mono: "'JetBrains Mono', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.7,
    },
  },

  // ==================== SPACING ====================
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
    '6xl': '12rem',
  },

  // ==================== BORDER RADIUS ====================
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },

  // ==================== SHADOWS ====================
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',

    // Themed glows for competition feel
    glow: {
      orange: '0 0 40px rgba(249, 115, 22, 0.5)',
      red: '0 0 40px rgba(220, 38, 38, 0.5)',
      steel: '0 0 40px rgba(6, 182, 212, 0.5)',
      gold: '0 0 40px rgba(245, 158, 11, 0.5)',
    },

    // Elevation with darker shadows
    elevation: {
      low: '0 2px 8px rgba(0, 0, 0, 0.3)',
      medium: '0 8px 24px rgba(0, 0, 0, 0.4)',
      high: '0 16px 48px rgba(0, 0, 0, 0.5)',
    },

    // Inner shadows for depth
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  },

  // ==================== TRANSITIONS ====================
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    base: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    sharp: '0.1s cubic-bezier(0.4, 0, 1, 1)', // For competitive snappy feel
  },

  // ==================== Z-INDEX SCALE ====================
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // ==================== BREAKPOINTS ====================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ==================== ANIMATIONS ====================
  animations: {
    fadeIn: 'fadeIn 0.6s ease-in-out',
    slideUp: 'slideUp 0.5s ease-out',
    scaleIn: 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    float: 'float 3s ease-in-out infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    glow: 'glow 2s ease-in-out infinite',
    shake: 'shake 0.5s ease-in-out', // For streak warnings
  },
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
