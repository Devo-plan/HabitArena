import Link from 'next/link';
import { Flame, Trophy } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';

const ACTIONS = [
  {
    label: 'Join Ritual Room',
    icon: Flame,
    href: ARENA_ROUTES.RITUAL,
    color: theme.colors.primary[400],
  },
  {
    label: 'Join Challenge',
    icon: Trophy,
    href: ARENA_ROUTES.CHALLENGES,
    color: theme.colors.accent.gold,
  },
] as const;

export const QuickActions = () => (
  <div>
    <p
      style={{
        margin: '0 0 10px',
        fontSize: '10px',
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text.muted,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      Quick Actions
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {ACTIONS.map(({ label, icon: Icon, href, color }) => (
        <Link
          key={href}
          href={href}
          className="hover:border-[rgba(249,115,22,0.25)] hover:bg-[rgba(249,115,22,0.04)] transition-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 14px',
            borderRadius: theme.borderRadius.xl,
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: theme.borderRadius.lg,
              background: `${color}15`,
              border: `1px solid ${color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={15} color={color} />
          </div>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
            }}
          >
            {label}
          </span>
        </Link>
      ))}
    </div>
  </div>
);
