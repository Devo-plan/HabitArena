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
        borderRadius: '16px',
        padding: '16px',
        height: '100%',
        boxSizing: 'border-box',
        // Critical for mobile — prevent this column from
        // expanding beyond the screen width
        width: '100%',
        minWidth: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Active Rooms */}
      <section style={{ minWidth: 0 }}>
        <SectionHeader
          title="Active Rooms"
          subtitle="Join others in focused sessions"
          actionLabel="View All"
        />
        {roomsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SkeletonBlock height="110px" />
            <SkeletonBlock height="110px" />
          </div>
        ) : (
          <ActiveRoomsWidget rooms={rooms} />
        )}
      </section>

      {/* Challenge hero card */}
      <section style={{ minWidth: 0 }}>
        {challengeLoading ? (
          <SkeletonBlock height="220px" />
        ) : (
          <ChallengeProgressCard challenge={challenge} />
        )}
      </section>

      {/* Squad Activity */}
      <section style={{ minWidth: 0 }}>
        <div
          style={{
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: '14px',
            padding: '14px 16px',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          <SectionHeader title="Squad Activity" />
          {squadLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBlock key={i} height="34px" />
              ))}
            </div>
          ) : (
            <SquadFeed feed={feed} />
          )}
        </div>
      </section>

      {/* Recent Proofs */}
      <section style={{ minWidth: 0 }}>
        <SectionHeader title="Recent Proofs" actionLabel="View All" />
        {squadLoading ? <SkeletonBlock height="200px" /> : <ProofGallery proofs={proofs} />}
      </section>
    </div>
  );
};
