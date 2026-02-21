import { theme } from '@/styles/theme';

export const LiveBadge = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '2px 8px',
      borderRadius: theme.borderRadius.full,
      background: 'rgba(16, 185, 129, 0.12)',
      border: `1px solid rgba(16, 185, 129, 0.3)`,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.accent.emerald,
      letterSpacing: '0.06em',
    }}
  >
    {/* Pulsing dot */}
    <span className="relative flex h-2 w-2">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ background: theme.colors.accent.emerald }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ background: theme.colors.accent.emerald }}
      />
    </span>
    LIVE
  </span>
);
