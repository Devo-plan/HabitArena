import { theme } from '@/styles/theme';
import type { DashboardHabit } from '@/shared/types/dashboard.types';

const CATEGORY_CONFIG: Record<string, { border: string; color: string }> = {
  Fitness: { border: theme.colors.accent.emerald, color: theme.colors.accent.emerald },
  Focus: { border: theme.colors.primary[500], color: theme.colors.primary[400] },
  Growth: { border: '#3b82f6', color: '#60a5fa' },
  Discipline: { border: theme.colors.primary[500], color: theme.colors.primary[400] },
  Mindset: { border: theme.colors.accent.steel, color: theme.colors.accent.steel },
};

const DEFAULT_CATEGORY = {
  border: theme.colors.border.primary,
  color: theme.colors.text.muted,
};

interface HabitCardProps {
  habit: DashboardHabit;
  onMarkComplete: (id: string) => void;
  onMarkIncomplete: (id: string) => void;
}

export const HabitCard = ({ habit, onMarkComplete, onMarkIncomplete }: HabitCardProps) => {
  const config = CATEGORY_CONFIG[habit.category] ?? DEFAULT_CATEGORY;
  const isDone = habit.completionStatus === 'completed';
  const isMissed = habit.completionStatus === 'missed';

  const handleToggle = () => {
    isDone ? onMarkIncomplete(habit.id) : onMarkComplete(habit.id);
  };

  return (
    <div
      className="hover:border-[rgba(249,115,22,0.2)] transition-colors"
      style={{
        background: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderLeft: `3px solid ${config.border}`,
        borderRadius: theme.borderRadius.xl,
        // Compact padding matching reference
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Category — 10px */}
        <p
          style={{
            margin: 0,
            fontSize: '10px',
            fontWeight: 700,
            color: config.color,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: '3px',
          }}
        >
          {habit.category}
        </p>

        {/* Habit name — 15px (was 18px) */}
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: theme.typography.fontFamily.display,
            color: isDone ? 'rgba(255,255,255,0.3)' : theme.colors.text.primary,
            textDecoration: isDone ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '3px',
            lineHeight: 1.3,
          }}
        >
          {habit.name}
        </p>

        {/* Streak + status — 11px */}
        <p
          style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.3 }}
        >
          🔥 {habit.streak}d streak
          {' · '}
          <span
            style={{
              color: isMissed
                ? theme.colors.secondary[400]
                : isDone
                  ? 'rgba(255,255,255,0.38)'
                  : 'inherit',
            }}
          >
            {isDone ? 'Done' : isMissed ? 'Missed' : `Due ${habit.nextDueTime}`}
          </span>
        </p>
      </div>

      {/* Toggle circle — 28px (was 40px) */}
      <button
        onClick={handleToggle}
        title={isDone ? 'Mark incomplete' : 'Mark complete'}
        className="transition-all hover:scale-110 active:scale-95 shrink-0"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: isDone
            ? `2px solid ${theme.colors.accent.emerald}`
            : isMissed
              ? `2px solid ${theme.colors.secondary[500]}`
              : '2px solid rgba(255,255,255,0.18)',
          background: isDone ? 'rgba(16,185,129,0.12)' : 'transparent',
        }}
      >
        {isDone && (
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.accent.emerald,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        )}
      </button>
    </div>
  );
};
