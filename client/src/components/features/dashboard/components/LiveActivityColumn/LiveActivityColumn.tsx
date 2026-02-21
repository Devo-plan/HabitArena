'use client';

import { theme } from '@/styles/theme';
import { useDashboardRooms } from '@/components/features/dashboard/hooks/useDashboardRooms';
import { useDashboardChallenge } from '@/components/features/dashboard/hooks/useDashboardChallenge';
import { useDashboardSquad } from '@/components/features/dashboard/hooks/useDashboardSquad';
import { SectionHeader, SkeletonBlock } from '../shared';
import { ActiveRoomsWidget } from './ActiveRoomsWidget';
import { ChallengeProgressCard } from './ChallengeProgressCard';
import { SquadFeed } from './SquadFeed';
import { ProofGallery } from './ProofGallery';

export const LiveActivityColumn = () => {
  const { rooms, isLoading: roomsLoading } = useDashboardRooms();
  const { challenge, isLoading: challengeLoading } = useDashboardChallenge();
  const { feed, proofs, isLoading: squadLoading } = useDashboardSquad();

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
        <SectionHeader
          title="Active Rooms"
          subtitle="Join others in focused sessions"
          actionLabel="View All"
        />
        {roomsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SkeletonBlock height="120px" />
            <SkeletonBlock height="120px" />
          </div>
        ) : (
          <ActiveRoomsWidget rooms={rooms} />
        )}
      </section>

      <section>
        {challengeLoading ? (
          <SkeletonBlock height="240px" />
        ) : (
          <ChallengeProgressCard challenge={challenge} />
        )}
      </section>

      <section>
        <div
          style={{
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: theme.borderRadius['2xl'],
            padding: '18px 20px',
          }}
        >
          <SectionHeader title="Squad Activity" />
          {squadLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBlock key={i} height="36px" />
              ))}
            </div>
          ) : (
            <SquadFeed feed={feed} />
          )}
        </div>
      </section>

      <section>
        <SectionHeader title="Recent Proofs" actionLabel="View All" />
        {squadLoading ? <SkeletonBlock height="208px" /> : <ProofGallery proofs={proofs} />}
      </section>
    </div>
  );
};
