'use client';

import { Flame, Activity, Trophy, Zap, Users } from 'lucide-react';
import { theme } from '@/styles/theme';
import { useSidebar } from '@/hooks/useSidebar';
import { useDashboardStats } from '@/components/features/dashboard/hooks/useDashboardStats';
import { StatPill } from './StatPill';

export const HeroStatsBar = () => {
  const { stats, isLoading } = useDashboardStats();
  const { isMobile } = useSidebar();

  return (
    <div
      style={{
        // ── Desktop: sticky + exact 64px to match sidebar header ──
        // ── Mobile:  relative + auto height, no overlap with top bar ──
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : 0,
        zIndex: theme.zIndex.sticky - 1,
        height: isMobile ? 'auto' : '64px',
        padding: isMobile ? '12px 0' : '0',
        display: 'flex',
        alignItems: 'center',

        background: 'rgba(15, 15, 15, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.colors.border.primary}`,
        marginBottom: isMobile ? '16px' : '20px',
        boxShadow: isMobile ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3" style={{ width: '100%' }}>
        <StatPill
          icon={<Flame size={14} color="#ffffff" fill="#ffffff" />}
          value={`${stats.currentStreak} days`}
          label="Current Streak"
          isHighlight
          isLoading={isLoading}
        />
        <StatPill
          icon={<Activity size={13} color={theme.colors.accent.emerald} />}
          value={stats.activeHabits}
          label="Active Habits"
          isLoading={isLoading}
        />
        <StatPill
          icon={<Trophy size={13} color={theme.colors.accent.gold} />}
          value={`#${stats.globalRank}`}
          label="Global Rank"
          isLoading={isLoading}
        />
        <StatPill
          icon={<Zap size={13} color={theme.colors.primary[400]} />}
          value={`${(stats.totalXP / 1000).toFixed(1)}K`}
          label="Total XP"
          isLoading={isLoading}
        />

        {/* 5th pill: spans 2 cols on mobile to center it */}
        <div className="col-span-2 md:col-span-1">
          <StatPill
            icon={<Users size={13} color={theme.colors.accent.steel} />}
            value={stats.activeRooms}
            label="Active Rooms"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
