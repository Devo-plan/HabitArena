'use client';

import { Flame, Activity, Trophy, Zap, Users } from 'lucide-react';
import { theme } from '@/styles/theme';
import { useDashboardStats } from '@/components/features/dashboard/hooks/useDashboardStats';
import { StatPill } from './StatPill';

export const HeroStatsBar = () => {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.sticky - 1,
        background: 'rgba(15, 15, 15, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.colors.border.primary}`,
        padding: '10px 0 12px',
        marginBottom: '20px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* 5-pill row on desktop / 2+2+1 grid on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        <StatPill
          icon={<Flame size={15} color="#ffffff" fill="#ffffff" />}
          value={`${stats.currentStreak} days`}
          label="Current Streak"
          isHighlight
          isLoading={isLoading}
        />
        <StatPill
          icon={<Activity size={14} color={theme.colors.accent.emerald} />}
          value={stats.activeHabits}
          label="Active Habits"
          isLoading={isLoading}
        />
        <StatPill
          icon={<Trophy size={14} color={theme.colors.accent.gold} />}
          value={`#${stats.globalRank}`}
          label="Global Rank"
          isLoading={isLoading}
        />
        <StatPill
          icon={<Zap size={14} color={theme.colors.primary[400]} />}
          value={`${(stats.totalXP / 1000).toFixed(1)}K`}
          label="Total XP"
          isLoading={isLoading}
        />
        <div className="col-span-2 md:col-span-1">
          <StatPill
            icon={<Users size={14} color={theme.colors.accent.steel} />}
            value={stats.activeRooms}
            label="Active Rooms"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
