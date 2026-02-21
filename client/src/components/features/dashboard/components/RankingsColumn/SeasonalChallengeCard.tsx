import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardChallenge, SeasonTier } from '@/shared/types/dashboard.types';

const TIER_COLORS: Record<SeasonTier, string> = {
  bronze: '#cd7f32',
  silver: '#94a3b8',
  gold: theme.colors.accent.gold,
  diamond: theme.colors.accent.steel,
};

interface SeasonalChallengeCardProps {
  challenge: DashboardChallenge;
}

export const SeasonalChallengeCard = ({ challenge }: SeasonalChallengeCardProps) => {
  const tierColor = TIER_COLORS[challenge.tier];

  return (
    <div
      style={{
        background: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderLeft: `3px solid ${tierColor}`,
        borderRadius: theme.borderRadius.xl,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            {challenge.name}
          </p>
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: theme.typography.fontWeight.bold,
            color: tierColor,
            textTransform: 'capitalize',
          }}
        >
          {challenge.tier}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: theme.colors.text.muted }}>
            Rank #{challenge.currentRank}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            {challenge.progressPercent}%
          </span>
        </div>
        <div
          style={{
            height: '4px',
            background: theme.colors.background.tertiary,
            borderRadius: theme.borderRadius.full,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${challenge.progressPercent}%`,
              background: `linear-gradient(90deg, ${tierColor}, ${theme.colors.primary[500]})`,
              borderRadius: theme.borderRadius.full,
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/challenges"
        className="hover:opacity-80 transition-opacity"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          borderRadius: theme.borderRadius.lg,
          background: theme.colors.background.tertiary,
          border: `1px solid ${theme.colors.border.primary}`,
          fontSize: '11px',
          color: theme.colors.text.tertiary,
          textDecoration: 'none',
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        View challenge <ArrowRight size={11} />
      </Link>
    </div>
  );
};
