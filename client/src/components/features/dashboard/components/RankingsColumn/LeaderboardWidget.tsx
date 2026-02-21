import { Flame } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardLeaderboardEntry } from '@/shared/types/dashboard.types';

interface LeaderboardWidgetProps {
  leaderboard: DashboardLeaderboardEntry[];
}

export const LeaderboardWidget = ({ leaderboard }: LeaderboardWidgetProps) => {
  const topEntries = leaderboard.filter((e) => !e.isCurrentUser);
  const currentUser = leaderboard.find((e) => e.isCurrentUser);

  return (
    <div
      style={{
        background: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
      }}
    >
      {topEntries.map((entry, index) => (
        <div
          key={entry.rank}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '9px 14px',
            borderBottom: `1px solid ${theme.colors.border.primary}`,
            gap: '10px',
          }}
        >
          {/* Rank number */}
          <span
            style={{
              width: '22px',
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.extrabold,
              fontFamily: theme.typography.fontFamily.display,
              color: index < 3 ? theme.colors.primary[400] : theme.colors.text.muted,
              flexShrink: 0,
              textAlign: 'center',
            }}
          >
            {entry.rank}
          </span>

          {/* Small avatar dot */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: index < 3 ? theme.colors.primary[500] : theme.colors.background.tertiary,
              border: `1px solid ${theme.colors.border.primary}`,
              flexShrink: 0,
            }}
          />

          {/* Name */}
          <span
            style={{
              flex: 1,
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {entry.warriorName}
          </span>

          {/* Streak */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '11px',
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.semibold,
              flexShrink: 0,
            }}
          >
            <Flame size={10} fill={theme.colors.primary[400]} />
            {entry.streakDays}d
          </span>
        </div>
      ))}

      {/* Separator */}
      <div
        style={{
          padding: '3px 14px',
          background: theme.colors.background.primary,
          textAlign: 'center',
          borderBottom: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        <span style={{ fontSize: '9px', color: theme.colors.text.muted, letterSpacing: '0.2em' }}>
          • • •
        </span>
      </div>

      {/* Current user row */}
      {currentUser && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '9px 14px',
            gap: '10px',
            background: 'rgba(249, 115, 22, 0.07)',
          }}
        >
          <span
            style={{
              width: '22px',
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.extrabold,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.primary[400],
              flexShrink: 0,
              textAlign: 'center',
            }}
          >
            {currentUser.rank}
          </span>

          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.colors.primary[500],
              flexShrink: 0,
            }}
          />

          <span
            style={{
              flex: 1,
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[400],
            }}
          >
            {currentUser.warriorName}
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '11px',
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.bold,
              flexShrink: 0,
            }}
          >
            <Flame size={10} fill={theme.colors.primary[400]} />
            {currentUser.streakDays}d
          </span>
        </div>
      )}
    </div>
  );
};
