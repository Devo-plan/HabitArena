'use client';

import { useDashboardChallenge } from '@/components/features/dashboard/hooks/useDashboardChallenge';
import { useDashboardRankings } from '@/components/features/dashboard/hooks/useDashboardRankings';
import { useDashboardMomentum } from '@/components/features/dashboard/hooks/useDashboardMomentum';
import { theme } from '@/styles/theme';
import { SectionHeader, SkeletonBlock } from '../shared';
import { SeasonalChallengeCard } from './SeasonalChallengeCard';
import { LeaderboardWidget } from './LeaderboardWidget';
import { MomentumMap } from './MomentumMap';

export const RankingsColumn = () => {
  const { challenge, isLoading: challengeLoading } = useDashboardChallenge();
  const { leaderboard, isLoading: rankingsLoading } = useDashboardRankings();
  const { momentumDays, isLoading: momentumLoading } = useDashboardMomentum();

  return (
    <div
      style={{
        // Panel styling
        background: 'rgba(26, 26, 26, 0.5)',
        border: '1px solid rgba(249, 115, 22, 0.07)',
        borderRadius: theme.borderRadius['2xl'],
        padding: '16px',
        // Fill the full CSS Grid cell height — matches LiveActivityColumn bottom
        height: '100%',
        boxSizing: 'border-box',
        // Internal layout
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* ── Seasonal Challenge ── */}
      <section>
        <SectionHeader title="Seasonal Challenge" actionLabel="View All" />
        {challengeLoading ? (
          <SkeletonBlock height="140px" />
        ) : (
          <SeasonalChallengeCard challenge={challenge} />
        )}
      </section>

      {/* ── Global Leaderboard ── */}
      <section>
        <SectionHeader title="Leaderboard" />
        {rankingsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} height="38px" borderRadius="8px" />
            ))}
          </div>
        ) : (
          <LeaderboardWidget leaderboard={leaderboard} />
        )}
      </section>

      {/* ── Momentum Map ── */}
      <section>
        <SectionHeader title="Momentum Map" />
        {momentumLoading ? <SkeletonBlock height="100px" /> : <MomentumMap days={momentumDays} />}
      </section>
    </div>
  );
};
