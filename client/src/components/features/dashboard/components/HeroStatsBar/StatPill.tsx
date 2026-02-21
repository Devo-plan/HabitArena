import { type ReactNode } from 'react';
import { theme } from '@/styles/theme';
import { SkeletonBlock } from '../shared';

interface StatPillProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  isHighlight?: boolean;
  isLoading?: boolean;
}

export const StatPill = ({
  icon,
  value,
  label,
  isHighlight = false,
  isLoading = false,
}: StatPillProps) => {
  if (isLoading) {
    return <SkeletonBlock height="44px" borderRadius={theme.borderRadius.xl} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        // Reduced from '10px 14px' — fits the 64px bar height cleanly
        padding: '7px 12px',
        borderRadius: theme.borderRadius.xl,
        background: isHighlight ? 'rgba(249, 115, 22, 0.1)' : theme.colors.background.tertiary,
        border: `1px solid ${
          isHighlight ? 'rgba(249, 115, 22, 0.3)' : theme.colors.border.primary
        }`,
        boxShadow: isHighlight ? '0 0 18px rgba(249, 115, 22, 0.12)' : 'none',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Icon box — 26×26 (reduced from 30×30) */}
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: theme.borderRadius.md,
          background: isHighlight
            ? theme.colors.gradients.primary
            : theme.colors.background.secondary,
          border: isHighlight ? 'none' : `1px solid ${theme.colors.border.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Value + label stack */}
      <div style={{ minWidth: 0, overflow: 'hidden' }}>
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.extrabold,
            fontFamily: theme.typography.fontFamily.display,
            color: isHighlight ? theme.colors.primary[400] : theme.colors.text.primary,
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '10px',
            color: theme.colors.text.muted,
            fontWeight: theme.typography.fontWeight.medium,
            whiteSpace: 'nowrap',
            lineHeight: 1.2,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
