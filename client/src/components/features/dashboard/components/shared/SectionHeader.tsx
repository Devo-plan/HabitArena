import { theme } from '@/styles/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader = ({ title, actionLabel, onAction }: SectionHeaderProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
      paddingBottom: '10px',
      borderBottom: `1px solid ${theme.colors.border.primary}`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Orange accent mark */}
      <div
        style={{
          width: '3px',
          height: '14px',
          borderRadius: '2px',
          background: theme.colors.gradients.primary,
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: '11px',
          fontWeight: theme.typography.fontWeight.extrabold,
          fontFamily: theme.typography.fontFamily.display,
          color: theme.colors.text.tertiary,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {title}
      </h2>
    </div>

    {actionLabel && (
      <button
        onClick={onAction}
        style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.primary[500],
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: theme.typography.fontWeight.semibold,
          padding: 0,
          transition: theme.transitions.base,
        }}
      >
        {actionLabel} →
      </button>
    )}
  </div>
);
