import { theme } from '@/styles/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader = ({ title, subtitle, actionLabel, onAction }: SectionHeaderProps) => (
  <div style={{ marginBottom: '14px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '8px',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: theme.typography.fontFamily.display,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            fontSize: '12px',
            color: theme.colors.primary[500],
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            padding: 0,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {actionLabel} →
        </button>
      )}
    </div>
  </div>
);
