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
        borderRadius: '14px',
        border: '1px solid rgba(249,115,22,0.2)',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, rgba(30,18,8,0.98) 0%, rgba(45,25,10,0.95) 60%, rgba(249,115,22,0.06) 100%)',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        // Prevent overflow on narrow screens
        minWidth: 0,
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Top row: season+tier | time left — wraps on mobile */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '10px',
          flexWrap: 'wrap', // wraps on very narrow screens
        }}
      >
        {/* Left: season + tier badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: theme.colors.primary[400],
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}
          >
            {challenge.season}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: tierColor,
              background: `${tierColor}15`,
              border: `1px solid ${tierColor}40`,
              borderRadius: theme.borderRadius.full,
              padding: '2px 9px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {challenge.tier} Tier
          </span>
        </div>

        {/* Right: time left */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: theme.colors.text.muted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              textAlign: 'right',
            }}
          >
            Time Left
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '18px',
              fontWeight: 800,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.text.primary,
              lineHeight: 1,
              textAlign: 'right',
            }}
          >
            {challenge.daysRemaining}d 06h
          </p>
        </div>
      </div>

      {/* Challenge name + rank */}
      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            margin: 0,
            // Slightly smaller on mobile via clamp
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 800,
            fontFamily: theme.typography.fontFamily.display,
            color: theme.colors.text.primary,
            lineHeight: 1.1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {challenge.name}
        </h3>
        <p
          style={{
            margin: '5px 0 0',
            fontSize: '13px',
            color: theme.colors.text.tertiary,
            lineHeight: 1.4,
            // Allow wrapping here — it's a sentence
          }}
        >
          You are ranked{' '}
          <strong style={{ color: theme.colors.primary[400] }}>#{challenge.currentRank}</strong> out
          of {challenge.totalParticipants.toLocaleString()} participants.
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '7px',
          }}
        >
          <span style={{ fontSize: '12px', color: theme.colors.text.tertiary }}>
            Overall Progress
          </span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 800,
              fontFamily: theme.typography.fontFamily.display,
              color: theme.colors.primary[400],
            }}
          >
            {challenge.progressPercent}%
          </span>
        </div>
        <div
          style={{
            height: '6px',
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
              boxShadow: '0 0 10px rgba(249,115,22,0.45)',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/challenges"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '11px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.11)',
          color: theme.colors.text.primary,
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          // Full width always
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        View Challenge Map
      </Link>
    </div>
  );
};
