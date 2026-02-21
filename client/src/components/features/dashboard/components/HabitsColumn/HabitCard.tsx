import { Flame, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardHabit } from '@/shared/types/dashboard.types';

const STATUS_CONFIG = {
  completed: {
    border: theme.colors.accent.emerald,
    icon: CheckCircle2,
    iconColor: theme.colors.accent.emerald,
  },
  pending: {
    border: theme.colors.primary[500],
    icon: Clock,
    iconColor: theme.colors.primary[400],
  },
  missed: {
    border: theme.colors.secondary[500],
    icon: AlertCircle,
    iconColor: theme.colors.secondary[400],
  },
} as const;

interface HabitCardProps {
  habit: DashboardHabit;
  onMarkComplete: (id: string) => void;
}

export const HabitCard = ({ habit, onMarkComplete }: HabitCardProps) => {
  const config = STATUS_CONFIG[habit.completionStatus];
  const StatusIcon = config.icon;

  return (
    <div
      className="hover:border-[rgba(249,115,22,0.2)] transition-all"
      style={{
        background: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderLeft: `3px solid ${config.border}`,
        borderRadius: theme.borderRadius.lg,
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {/* Row 1: status icon + name + category */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <StatusIcon size={13} color={config.iconColor} style={{ flexShrink: 0 }} />

        <p
          style={{
            margin: 0,
            flex: 1,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color:
              habit.completionStatus === 'completed'
                ? theme.colors.text.muted
                : theme.colors.text.primary,
            textDecoration: habit.completionStatus === 'completed' ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: 1.3,
          }}
        >
          {habit.name}
        </p>

        <span
          style={{
            fontSize: '10px',
            color: theme.colors.text.muted,
            background: theme.colors.background.tertiary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: theme.borderRadius.full,
            padding: '1px 7px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            lineHeight: '18px',
          }}
        >
          {habit.category}
        </span>
      </div>

      {/* Row 2: streak + due time + mark complete inline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            color: habit.streak > 0 ? theme.colors.primary[400] : theme.colors.text.muted,
            fontWeight: theme.typography.fontWeight.semibold,
          }}
        >
          <Flame size={10} fill={habit.streak > 0 ? theme.colors.primary[400] : 'none'} />
          {habit.streak}d
        </span>

        <span style={{ fontSize: '11px', color: theme.colors.text.muted, flex: 1 }}>
          {habit.nextDueTime}
        </span>

        {/* Inline mark complete — only for non-completed */}
        {habit.completionStatus !== 'completed' && (
          <button
            onClick={() => onMarkComplete(habit.id)}
            className="hover:opacity-80 transition-opacity"
            style={{
              padding: '3px 10px',
              borderRadius: theme.borderRadius.md,
              border: 'none',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: theme.typography.fontWeight.bold,
              background:
                habit.completionStatus === 'pending'
                  ? theme.colors.gradients.primary
                  : 'rgba(220, 38, 38, 0.2)',
              color: habit.completionStatus === 'pending' ? '#ffffff' : theme.colors.secondary[400],
              whiteSpace: 'nowrap',
              flexShrink: 0,
              lineHeight: '20px',
            }}
          >
            {habit.completionStatus === 'missed' ? '⚠ Complete' : '✓ Done'}
          </button>
        )}

        {habit.completionStatus === 'completed' && (
          <span
            style={{
              fontSize: '11px',
              color: theme.colors.accent.emerald,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            ✓ Done
          </span>
        )}
      </div>
    </div>
  );
};
