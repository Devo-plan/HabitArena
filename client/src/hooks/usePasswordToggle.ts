// hooks/usePasswordToggle.ts
/**
 * Custom hook for managing password visibility toggle
 * Can be used for any password input field
 * Supports multiple instances on same page
 */

import { useState, useCallback } from 'react';

interface UsePasswordToggleReturn {
  showPassword: boolean;
  toggle: () => void;
  hide: () => void;
  show: () => void;
  inputType: 'text' | 'password';
}

export const usePasswordToggle = (): UsePasswordToggleReturn => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const hide = useCallback(() => {
    setShowPassword(false);
  }, []);

  const show = useCallback(() => {
    setShowPassword(true);
  }, []);

  return {
    showPassword,
    toggle,
    hide,
    show,
    inputType: showPassword ? 'text' : 'password',
  };
};
