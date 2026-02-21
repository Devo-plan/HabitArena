// ComingSoon.tsx — Shared arena placeholder for sections not yet built
// Accepts sectionName + optional description for per-page customization
// No 'use client' needed — purely presentational, no hooks or interactivity

import { Clock } from 'lucide-react';
import { theme } from '@/styles/theme';

interface ComingSoonProps {
  sectionName: string;
  description?: string;
}

export const ComingSoon = ({ sectionName, description }: ComingSoonProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      {/* Glowing icon container */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: theme.borderRadius.xl,
          background: 'rgba(249, 115, 22, 0.08)',
          border: `1px solid ${theme.colors.border.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: theme.shadows.glow.orange,
        }}
      >
        <Clock size={30} color={theme.colors.primary[500]} />
      </div>

      {/* Section name with gradient text */}
      <h1
        style={{
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          fontFamily: theme.typography.fontFamily.display,
          background: theme.colors.gradients.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}
      >
        {sectionName}
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text.tertiary,
          maxWidth: '380px',
          lineHeight: theme.typography.lineHeight.relaxed,
          margin: 0,
        }}
      >
        {description ?? 'This section of the Arena is under construction. Check back soon.'}
      </p>

      {/* Coming soon badge */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 16px',
          borderRadius: theme.borderRadius.full,
          background: 'rgba(249, 115, 22, 0.06)',
          border: `1px solid ${theme.colors.border.primary}`,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Coming Soon
      </span>
    </div>
  );
};
