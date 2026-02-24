'use client';

import { theme } from '@/styles/theme';
import { useDashboardStats } from '@/components/features/dashboard/hooks/useDashboardStats';
import { StatPill } from './StatPill';

export const HeroStatsBar = () => {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {/* Current Streak — "21 Days" */}
      <StatPill
        label="Current Streak"
        value={stats.currentStreak}
        subLabel="Days"
        subLabelColor={theme.colors.primary[400]}
        isLoading={isLoading}
      />

      {/* Active Habits — "6 Tracked" */}
      <StatPill
        label="Active Habits"
        value={stats.activeHabits}
        subLabel="Tracked"
        subLabelColor={theme.colors.text.muted}
        isLoading={isLoading}
      />

      {/* Global Rank — "#347 Top 5%" */}
      <StatPill
        label="Global Rank"
        value={`#${stats.globalRank}`}
        subLabel={stats.rankPercentile || 'Top 5%'}
        subLabelColor={theme.colors.primary[400]}
        isLoading={isLoading}
      />

      {/* Total XP — "12.5K +240 today" */}
      <StatPill
        label="Total XP"
        value={`${(stats.totalXP / 1000).toFixed(1)}K`}
        subLabel={stats.xpToday > 0 ? `+${stats.xpToday} today` : '—'}
        subLabelColor={theme.colors.accent.emerald}
        isLoading={isLoading}
      />

      {/* Active Rooms — "3 Live now" — spans 2 cols on mobile */}
      <div className="col-span-2 md:col-span-1">
        <StatPill
          label="Active Rooms"
          value={stats.activeRooms}
          subLabel="Live now"
          subLabelColor={theme.colors.accent.emerald}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
