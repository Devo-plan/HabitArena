'use client';

import { theme } from '@/styles/theme';
import { useDashboardChallenge } from '@/components/features/dashboard/hooks/useDashboardChallenge';
import { useDashboardRankings } from '@/components/features/dashboard/hooks/useDashboardRankings';
import { useDashboardMomentum } from '@/components/features/dashboard/hooks/useDashboardMomentum';
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
        background: 'rgba(26,26,26,0.5)',
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius['2xl'],
        padding: '20px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      <section>
        <SectionHeader title="Seasonal Challenge" actionLabel="View All" />
        {challengeLoading ? (
          <SkeletonBlock height="130px" />
        ) : (
          <SeasonalChallengeCard challenge={challenge} />
        )}
      </section>

      <section>
        <SectionHeader title="Leaderboard" />
        {rankingsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} height="52px" />
            ))}
          </div>
        ) : (
          <LeaderboardWidget leaderboard={leaderboard} />
        )}
      </section>

      <section>
        <SectionHeader title="Momentum Map" />
        {momentumLoading ? <SkeletonBlock height="100px" /> : <MomentumMap days={momentumDays} />}
      </section>
    </div>
  );
};
