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
        // Panel styling
        background: 'rgba(26, 26, 26, 0.5)',
        border: '1px solid rgba(249, 115, 22, 0.07)',
        borderRadius: theme.borderRadius['2xl'],
        padding: '16px',
        // Fill the full CSS Grid cell height
        height: '100%',
        boxSizing: 'border-box',
        // Internal layout
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* ── Active Rooms ── */}
      <section>
        <SectionHeader title="Active Rooms" actionLabel="View All" />
        {roomsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonBlock height="88px" />
            <SkeletonBlock height="88px" />
            <SkeletonBlock height="88px" />
          </div>
        ) : (
          <ActiveRoomsWidget rooms={rooms} />
        )}
      </section>

      {/* ── Your Challenge ── */}
      <section>
        <SectionHeader title="Your Challenge" />
        {challengeLoading ? (
          <SkeletonBlock height="148px" />
        ) : (
          <ChallengeProgressCard challenge={challenge} />
        )}
      </section>

      {/* ── Squad Activity ── */}
      <section>
        <div
          style={{
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: theme.borderRadius.xl,
            padding: '12px 14px',
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

      {/* ── Recent Proofs ── */}
      <section>
        <SectionHeader title="Recent Proofs" actionLabel="View All" />
        {squadLoading ? <SkeletonBlock height="208px" /> : <ProofGallery proofs={proofs} />}
      </section>
    </div>
  );
};
