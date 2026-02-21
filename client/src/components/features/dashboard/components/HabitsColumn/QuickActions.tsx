import Link from 'next/link';
import { Flame, Trophy, Users } from 'lucide-react';
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
  {
    label: 'Create Squad',
    icon: Users,
    href: ARENA_ROUTES.SQUADS,
    color: theme.colors.accent.steel,
  },
] as const;

export const QuickActions = () => (
  <div
    style={{
      background: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.primary}`,
      borderRadius: theme.borderRadius.xl,
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text.muted,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '4px',
      }}
    >
      Quick Actions
    </p>

    {ACTIONS.map(({ label, icon: Icon, href, color }) => (
      <Link
        key={href}
        href={href}
        className="hover:bg-[rgba(249,115,22,0.05)] transition-all"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '9px 12px',
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.border.primary}`,
          textDecoration: 'none',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: theme.borderRadius.md,
            background: theme.colors.background.tertiary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={14} color={color} />
        </div>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.secondary,
          }}
        >
          {label}
        </span>
      </Link>
    ))}
  </div>
);
