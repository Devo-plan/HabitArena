

import React, { forwardRef } from 'react';
import { theme } from '@/styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    className = '', 
    id,
    ...props 
  }, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    // ==================== INPUT STYLES ====================
    const inputStyles: React.CSSProperties = {
      width: '100%',
      padding: leftIcon 
        ? `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing['3xl']}`
        : `${theme.spacing.md} ${rightIcon ? theme.spacing['3xl'] : theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}`,
      backgroundColor: theme.colors.background.tertiary,
      border: error 
        ? `2px solid ${theme.colors.secondary[500]}`
        : `1px solid ${theme.colors.border.primary}`,
      borderRadius: theme.borderRadius.lg,
      color: theme.colors.text.primary,
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fontFamily.primary,
      outline: 'none',
      transition: theme.transitions.base,
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold mb-2 uppercase tracking-wider"
            style={{ color: theme.colors.text.secondary }}
          >
            {label}
            {props.required && (
              <span style={{ color: theme.colors.secondary[500] }} className="ml-1">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: error ? theme.colors.secondary[500] : theme.colors.text.muted }}
            >
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            style={inputStyles}
            className={`transition-all ${className}`}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = theme.colors.primary[500];
                e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary[500]}20`;
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error 
                ? theme.colors.secondary[500]
                : theme.colors.border.primary;
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: theme.colors.text.muted }}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm mt-2 font-medium flex items-center gap-2"
            style={{ color: theme.colors.secondary[500] }}
            role="alert"
          >
            <span className="inline-block"></span>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm mt-2"
            style={{ color: theme.colors.text.muted }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
