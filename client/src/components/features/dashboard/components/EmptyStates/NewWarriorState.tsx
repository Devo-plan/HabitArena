import Link from 'next/link';
import { Flame, Trophy, Users } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';

const CTA_ITEMS = [
  {
    label: 'Create First Habit',
    description: 'Start your warrior journey',
    icon: Flame,
    href: ARENA_ROUTES.DASHBOARD,
    color: theme.colors.primary[500],
  },
  {
    label: 'Join a Room',
    description: 'Train with live warriors',
    icon: Users,
    href: ARENA_ROUTES.RITUAL,
    color: theme.colors.accent.steel,
  },
  {
    label: 'Explore Challenges',
    description: 'Compete this season',
    icon: Trophy,
    href: ARENA_ROUTES.CHALLENGES,
    color: theme.colors.accent.gold,
  },
] as const;

export const NewWarriorState = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      gap: '28px',
      padding: '40px 20px',
    }}
  >
    {/* Headline */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h1
        style={{
          margin: 0,
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.black,
          fontFamily: theme.typography.fontFamily.display,
          background: theme.colors.gradients.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Welcome, Warrior
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text.tertiary,
          maxWidth: '380px',
        }}
      >
        The Arena is ready. Build your first habit, join a ritual room, or enter a challenge to
        begin your streak.
      </p>
    </div>

    {/* CTA cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
      {CTA_ITEMS.map(({ label, description, icon: Icon, href, color }) => (
        <Link
          key={href}
          href={href}
          className="hover:scale-[1.02] transition-transform"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '24px 16px',
            borderRadius: theme.borderRadius['2xl'],
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            textDecoration: 'none',
            boxShadow: theme.shadows.elevation.low,
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: theme.borderRadius.xl,
              background: `${color}18`,
              border: `1px solid ${color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} color={color} />
          </div>
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            {label}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.muted,
            }}
          >
            {description}
          </p>
        </Link>
      ))}
    </div>
  </div>
);
