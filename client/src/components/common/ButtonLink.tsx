// components/shared/ButtonLink.tsx

import React from 'react';
import Link from 'next/link';
import { theme } from '@/styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient' | 'victory';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  openInNewTab?: boolean;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  style,
  openInNewTab = false,
}) => {
  // ==================== VARIANT STYLES ====================
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: theme.colors.primary[500],
      color: '#ffffff',
      boxShadow: `0 4px 14px ${theme.colors.primary[500]}40`,
      border: 'none',
      fontWeight: theme.typography.fontWeight.bold,
    },
    secondary: {
      backgroundColor: theme.colors.background.tertiary,
      color: theme.colors.text.primary,
      border: `2px solid ${theme.colors.border.secondary}`,
      boxShadow: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.primary[500],
      border: `2px solid ${theme.colors.primary[500]}`,
      boxShadow: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.tertiary,
      border: 'none',
      boxShadow: 'none',
    },
    danger: {
      background: theme.colors.gradients.danger,
      color: '#ffffff',
      border: 'none',
      boxShadow: `0 4px 14px ${theme.colors.secondary[500]}30`,
      fontWeight: theme.typography.fontWeight.bold,
    },
    gradient: {
      background: theme.colors.gradients.primary,
      color: '#ffffff',
      boxShadow: `0 4px 14px ${theme.colors.primary[500]}35`,
      border: 'none',
      fontWeight: theme.typography.fontWeight.bold,
    },
    victory: {
      background: theme.colors.gradients.victory,
      color: '#ffffff',
      boxShadow: `0 4px 14px ${theme.colors.accent.gold}35`,
      border: 'none',
      fontWeight: theme.typography.fontWeight.bold,
    },
  };

  // ==================== SIZE STYLES ====================
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
      height: '2rem',
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      height: '2.75rem',
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.lg,
      height: '3.25rem',
    },
    xl: {
      padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
      fontSize: theme.typography.fontSize.xl,
      height: '4rem',
    },
  };

  // ==================== BASE STYLES ====================
  const baseStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    width: fullWidth ? '100%' : 'auto',
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: theme.transitions.sharp,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <Link
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      style={baseStyles}
      className={`group ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.filter = 'brightness(1.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      {leftIcon && (
        <span className="inline-flex items-center transition-transform group-hover:scale-110">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="inline-flex items-center transition-transform group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s',
          pointerEvents: 'none',
        }}
        className="group-hover:translate-x-full"
      />
    </Link>
  );
};
