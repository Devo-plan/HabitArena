

import React from 'react';
import { theme } from '@/styles/theme';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient' | 'danger';

interface CardProps {
  variant?: CardVariant;
  padding?: keyof typeof theme.spacing;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  className = '',
  style,
  onClick,
  hoverable = false,
}) => {
  // ==================== VARIANT STYLES ====================
  const variantStyles: Record<CardVariant, React.CSSProperties> = {
    // Default: Dark with subtle orange accent
    default: {
      backgroundColor: theme.colors.background.card,
      border: `1px solid ${theme.colors.border.primary}`,
      boxShadow: theme.shadows.elevation.low,
    },
    
    // Elevated: Lifted appearance
    elevated: {
      backgroundColor: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.primary}`,
      boxShadow: theme.shadows.elevation.medium,
    },
    
    // Bordered: Strong orange border focus
    bordered: {
      backgroundColor: theme.colors.background.secondary,
      border: `2px solid ${theme.colors.primary[500]}`,
      boxShadow: theme.shadows.glow.orange,
    },
    
    // Glass: Glassmorphism with dark tint
    glass: {
      backgroundColor: theme.colors.background.glass,
      border: `1px solid ${theme.colors.border.primary}`,
      backdropFilter: 'blur(16px)',
      boxShadow: theme.shadows.elevation.low,
    },
    
    // Gradient: Orange to red background
    gradient: {
      background: theme.colors.gradients.card,
      border: `1px solid ${theme.colors.border.secondary}`,
      boxShadow: theme.shadows.elevation.low,
    },
    
    // Danger: Red accent for warnings
    danger: {
      backgroundColor: theme.colors.background.danger,
      border: `2px solid ${theme.colors.border.danger}`,
      boxShadow: theme.shadows.glow.red,
    },
  };

  // ==================== BASE STYLES ====================
  const baseStyles: React.CSSProperties = {
    padding: theme.spacing[padding],
    borderRadius: theme.borderRadius['2xl'],
    cursor: onClick ? 'pointer' : 'default',
    transition: theme.transitions.base,
    position: 'relative',
    overflow: 'hidden',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <div
      className={`transition-all duration-300 ${hoverable ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-orange-500' : ''} ${className}`}
      style={baseStyles}
      onClick={onClick}
    >
      {children}
      
      {/* Corner accent (competitive detail) */}
      {variant === 'bordered' && (
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${theme.colors.primary[500]} 50%)`,
          }}
        />
      )}
      
      {/* Hover gradient overlay */}
      {hoverable && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(249, 115, 22, 0.15), transparent 60%)',
          }}
        />
      )}
    </div>
  );
};

// ==================== CARD HEADER ====================
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  icon, 
  action,
  className = '' 
}) => {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Icon Container with glow */}
        {icon && (
          <div
            className="p-3 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${theme.colors.primary[500]}15`,
              border: `1px solid ${theme.colors.primary[500]}40`,
              boxShadow: `0 0 20px ${theme.colors.primary[500]}20`,
            }}
          >
            <div style={{ color: theme.colors.primary[500] }}>
              {icon}
            </div>
          </div>
        )}
        
        {/* Text Content */}
        <div>
          <h3
            className="text-lg font-bold mb-1"
            style={{ color: theme.colors.text.primary }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: theme.colors.text.tertiary }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Action Element */}
      {action}
    </div>
  );
};
