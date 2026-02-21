import Link from 'next/link';
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
        borderRadius: theme.borderRadius['2xl'],
        border: `1px solid rgba(249, 115, 22, 0.2)`,
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, rgba(30,18,8,0.98) 0%, rgba(45,25,10,0.95) 60%, rgba(249,115,22,0.06) 100%)',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Top row: season + tier badge | time left */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '11px',
              color: theme.colors.primary[400],
              fontWeight: theme.typography.fontWeight.bold,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {challenge.season}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: tierColor,
              background: `${tierColor}15`,
              border: `1px solid ${tierColor}40`,
              borderRadius: theme.borderRadius.full,
              padding: '2px 10px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {challenge.tier} Tier
          </span>
        </div>

        {/* Time left */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: theme.colors.text.muted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Time Left
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.black,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.text.primary,
            }}
          >
            {challenge.daysRemaining}d 06h
          </p>
        </div>
      </div>

      {/* Challenge name */}
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize['3xl'],
            fontWeight: theme.typography.fontWeight.black,
            fontFamily: theme.typography.fontFamily.display,
            color: theme.colors.text.primary,
            lineHeight: 1.1,
          }}
        >
          {challenge.name}
        </h3>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.tertiary,
          }}
        >
          You are ranked{' '}
          <strong style={{ color: theme.colors.primary[400] }}>#{challenge.currentRank}</strong> out
          of {challenge.totalParticipants.toLocaleString()} participants.
        </p>
      </div>

      {/* Progress */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}
          >
            Overall Progress
          </span>
          <span
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.black,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.primary[400],
            }}
          >
            {challenge.progressPercent}%
          </span>
        </div>
        <div
          style={{
            height: '8px',
            background: 'rgba(255,255,255,0.06)',
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
              boxShadow: '0 0 12px rgba(249,115,22,0.5)',
            }}
          />
        </div>
      </div>

      {/* CTA button */}
      <Link
        href="/challenges"
        className="hover:opacity-90 transition-opacity"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          borderRadius: theme.borderRadius.xl,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          textDecoration: 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        View Challenge Map
      </Link>
    </div>
  );
};
