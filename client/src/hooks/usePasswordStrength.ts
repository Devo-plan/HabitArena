// hooks/usePasswordStrength.ts
/**
 * Custom hook for calculating password strength
 * Returns strength level, color, and width for visual indicator
 * Can be used in any password creation form
 */

import { useMemo } from 'react';
import { theme } from '@/styles/theme';

// ==================== TYPES ====================

type PasswordStrengthLevel = 'Weak' | 'Medium' | 'Strong' | '';

interface PasswordStrength {
  strength: PasswordStrengthLevel;
  color: string;
  width: string;
  score: number;
}

// ==================== HOOK ====================

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo((): PasswordStrength => {
    if (!password || password.length === 0) {
      return {
        strength: '',
        color: '',
        width: '0%',
        score: 0,
      };
    }

    let score = 0;

    // Check password criteria
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Return strength based on score
    if (score <= 2) {
      return {
        strength: 'Weak',
        color: theme.colors.secondary[500],
        width: '33%',
        score,
      };
    }

    if (score <= 3) {
      return {
        strength: 'Medium',
        color: theme.colors.accent.gold,
        width: '66%',
        score,
      };
    }

    return {
      strength: 'Strong',
      color: theme.colors.accent.emerald,
      width: '100%',
      score,
    };
  }, [password]);
};
