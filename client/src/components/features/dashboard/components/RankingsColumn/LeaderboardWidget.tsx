import { Flame } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardLeaderboardEntry } from '@/shared/types/dashboard.types';

const RANK_BG: Record<number, string> = {
  1: theme.colors.gradients.primary,
  2: 'rgba(148,163,184,0.2)',
  3: 'rgba(205,127,50,0.2)',
};

const AVATAR_COLORS = [
  theme.colors.primary[500],
  theme.colors.accent.steel,
  theme.colors.accent.gold,
  theme.colors.accent.emerald,
];
const getAvatarColor = (s: string) => AVATAR_COLORS[s.charCodeAt(0) % AVATAR_COLORS.length];

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
        borderRadius: theme.borderRadius['2xl'],
        overflow: 'hidden',
      }}
    >
      {topEntries.map((entry) => (
        <div
          key={entry.rank}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '12px',
            borderBottom: `1px solid ${theme.colors.border.primary}`,
          }}
        >
          {/* Rank badge */}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: RANK_BG[entry.rank] ?? theme.colors.background.tertiary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.extrabold,
              color: entry.rank <= 3 ? '#ffffff' : theme.colors.text.muted,
              flexShrink: 0,
            }}
          >
            {entry.rank}
          </div>

          {/* Avatar circle */}
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: getAvatarColor(entry.initials),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: '#ffffff',
              flexShrink: 0,
            }}
          >
            {entry.initials}
          </div>

          {/* Name */}
          <span
            style={{
              flex: 1,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
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
              fontSize: '12px',
              color: theme.colors.text.tertiary,
              fontWeight: theme.typography.fontWeight.semibold,
              flexShrink: 0,
            }}
          >
            <Flame size={11} color={theme.colors.primary[400]} fill={theme.colors.primary[400]} />
            {entry.streakDays}d
          </span>
        </div>
      ))}

      {/* Separator */}
      <div
        style={{
          padding: '6px 16px',
          background: theme.colors.background.primary,
          textAlign: 'center',
          borderBottom: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        <span style={{ fontSize: '10px', color: theme.colors.text.muted, letterSpacing: '0.25em' }}>
          • • •
        </span>
      </div>

      {/* Current user row */}
      {currentUser && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '12px',
            background: 'rgba(249,115,22,0.07)',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.colors.gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.extrabold,
              color: '#ffffff',
              flexShrink: 0,
            }}
          >
            {currentUser.rank}
          </div>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: theme.colors.gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: '#ffffff',
              flexShrink: 0,
            }}
          >
            {currentUser.initials}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: theme.typography.fontSize.sm,
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
              fontSize: '12px',
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.bold,
              flexShrink: 0,
            }}
          >
            <Flame size={11} color={theme.colors.primary[400]} fill={theme.colors.primary[400]} />
            {currentUser.streakDays}d
          </span>
        </div>
      )}
    </div>
  );
};
