// EmptyRoomsState.tsx — Shown inside ActiveRoomsWidget when rooms.length === 0

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';

export const EmptyRoomsState = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '28px 16px',
      background: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.primary}`,
      borderRadius: theme.borderRadius.xl,
      textAlign: 'center',
    }}
  >
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: theme.borderRadius.xl,
        background: 'rgba(249, 115, 22, 0.08)',
        border: `1px solid ${theme.colors.border.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Zap size={20} color={theme.colors.primary[500]} />
    </div>

    <div>
      <p
        style={{
          margin: '0 0 4px',
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
        }}
      >
        No Active Rooms
      </p>
      <p
        style={{
          margin: 0,
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.muted,
        }}
      >
        No warriors are training right now. Be the first.
      </p>
    </div>

    <div style={{ display: 'flex', gap: '8px' }}>
      <Link
        href={ARENA_ROUTES.RITUAL}
        style={{
          padding: '6px 14px',
          borderRadius: theme.borderRadius.lg,
          background: theme.colors.gradients.primary,
          color: '#ffffff',
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.bold,
          textDecoration: 'none',
        }}
      >
        Browse Rooms
      </Link>
      <Link
        href={ARENA_ROUTES.RITUAL}
        style={{
          padding: '6px 14px',
          borderRadius: theme.borderRadius.lg,
          background: theme.colors.background.tertiary,
          border: `1px solid ${theme.colors.border.primary}`,
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
          textDecoration: 'none',
        }}
      >
        Create Room
      </Link>
    </div>
  </div>
);
