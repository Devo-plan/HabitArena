// hooks/useAuthSubmit.ts
/**
 * Custom hook for handling authentication form submissions
 * Manages loading states, error handling, and success callbacks
 * Works for login, register, and other auth forms
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

// ==================== TYPES ====================

interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

interface UseAuthSubmitOptions<TData, TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: AuthError) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseAuthSubmitReturn<TData> {
  submit: (data: TData) => Promise<void>;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

// ==================== HOOK ====================

export const useAuthSubmit = <TData = Record<string, unknown>, TResult = unknown>(
  apiCall: (data: TData) => Promise<TResult>,
  options?: UseAuthSubmitOptions<TData, TResult>
): UseAuthSubmitReturn<TData> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const submit = async (data: TData): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const result = await apiCall(data);

      // Show success toast
      toast.success(options?.successMessage ?? 'Success! Welcome, warrior! ');

      // Call success callback if provided
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err) {
      // Type-safe error handling
      const apiError = err as ApiErrorResponse;

      const message =
        apiError.response?.data?.message ??
        apiError.response?.data?.error ??
        apiError.message ??
        options?.errorMessage ??
        'Something went wrong. Please try again.';

      setError(message);
      toast.error(message);

      // Call error callback if provided
      if (options?.onError) {
        options.onError({
          message,
          code: apiError.response?.status?.toString(),
        });
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError('');
  };

  return {
    submit,
    isLoading,
    error,
    clearError,
  };
};
