import { theme } from '@/styles/theme';
import { SkeletonBlock } from '../shared';

interface StatPillProps {
  label: string;
  value: string | number;
  subLabel: string;
  subLabelColor?: string;
  isLoading?: boolean;
}

export const StatPill = ({
  label,
  value,
  subLabel,
  subLabelColor = theme.colors.text.muted,
  isLoading = false,
}: StatPillProps) => {
  if (isLoading) {
    return <SkeletonBlock height="78px" borderRadius="12px" />;
  }

  return (
    <div
      style={{
        padding: '16px 18px',
        borderRadius: '12px',
        background: '#1c1c1e',
        border: '1px solid rgba(255,255,255,0.06)',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Uppercase label */}
      <p
        style={{
          margin: 0,
          fontSize: '10px',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '7px',
        }}
      >
        {label}
      </p>

      {/* Value + inline sub-label */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span
          style={{
            fontSize: '22px',
            fontWeight: 800,
            fontFamily: theme.typography.fontFamily.display,
            color: '#ffffff',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: subLabelColor,
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {subLabel}
        </span>
      </div>
    </div>
  );
};
