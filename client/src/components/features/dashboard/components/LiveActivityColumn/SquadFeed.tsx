import { theme } from '@/styles/theme';
import type { DashboardSquadFeedItem } from '@/shared/types/dashboard.types';

const AVATAR_COLORS = [
  theme.colors.primary[500],
  theme.colors.accent.steel,
  theme.colors.accent.gold,
  theme.colors.accent.emerald,
  theme.colors.secondary[500],
];

const getAvatarColor = (initials: string): string =>
  AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];

interface SquadFeedProps {
  feed: DashboardSquadFeedItem[];
}

export const SquadFeed = ({ feed }: SquadFeedProps) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {feed.map((item) => (
      <div
        key={item.id}
        className="hover:bg-[rgba(249,115,22,0.03)] transition-colors"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: theme.borderRadius.lg,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: theme.borderRadius.full,
            background: getAvatarColor(item.memberInitials),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '10px',
            fontWeight: theme.typography.fontWeight.bold,
            color: '#ffffff',
          }}
        >
          {item.memberInitials}
        </div>

        {/* Activity text */}
        <p style={{ margin: 0, fontSize: '12px', flex: 1, minWidth: 0, lineHeight: 1.4 }}>
          <span
            style={{
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
            }}
          >
            {item.memberName}
          </span>{' '}
          <span style={{ color: theme.colors.text.muted }}>{item.action}</span>{' '}
          <span
            style={{
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            {item.habitName}
          </span>
          {item.streakCount > 0 && (
            <span style={{ color: theme.colors.text.muted }}>
              {' · '}🔥{item.streakCount}
            </span>
          )}
        </p>

        {/* Timestamp */}
        <span
          style={{
            fontSize: '10px',
            color: theme.colors.text.muted,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {item.timestamp}
        </span>
      </div>
    ))}
  </div>
);
