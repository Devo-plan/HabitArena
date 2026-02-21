import { Trophy } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardChallenge, SeasonTier } from '@/shared/types/dashboard.types';

const TIER_COLORS: Record<SeasonTier, string> = {
  bronze: '#cd7f32',
  silver: '#94a3b8',
  gold: theme.colors.accent.gold,
  diamond: theme.colors.accent.steel,
};

interface ChallengeProgressCardProps {
  challenge: DashboardChallenge;
}

export const ChallengeProgressCard = ({ challenge }: ChallengeProgressCardProps) => {
  const tierColor = TIER_COLORS[challenge.tier];

  return (
    <div
      style={{
        background: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius.xl,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Header: season tag + tier badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: theme.colors.text.muted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {challenge.season}
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.bold,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.text.primary,
            }}
          >
            {challenge.name}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: theme.borderRadius.full,
            background: `${tierColor}18`,
            border: `1px solid ${tierColor}40`,
          }}
        >
          <Trophy size={11} color={tierColor} />
          <span
            style={{
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: tierColor,
              textTransform: 'capitalize',
            }}
          >
            {challenge.tier}
          </span>
        </div>
      </div>

      {/* Rank + participant count inline */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          style={{
            fontSize: '2rem',
            fontWeight: theme.typography.fontWeight.black,
            fontFamily: theme.typography.fontFamily.display,
            background: theme.colors.gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          #{challenge.currentRank}
        </span>
        <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.muted }}>
          of {challenge.totalParticipants.toLocaleString()} warriors
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.muted,
          }}
        >
          ⏳ {challenge.daysRemaining}d left
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '11px', color: theme.colors.text.muted }}>Progress</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[400],
            }}
          >
            {challenge.progressPercent}%
          </span>
        </div>
        <div
          style={{
            height: '6px',
            background: theme.colors.background.tertiary,
            borderRadius: theme.borderRadius.full,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${challenge.progressPercent}%`,
              background: theme.colors.gradients.primary,
              borderRadius: theme.borderRadius.full,
              boxShadow: '0 0 8px rgba(249, 115, 22, 0.45)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
