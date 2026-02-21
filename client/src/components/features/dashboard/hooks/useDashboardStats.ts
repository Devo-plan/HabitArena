'use client';

import { useState, useEffect } from 'react';
import type { HeroStats } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

const DEFAULT_STATS: HeroStats = {
  currentStreak: 0,
  activeHabits: 0,
  globalRank: 0,
  totalXP: 0,
  activeRooms: 0,
};

export interface UseDashboardStatsReturn {
  stats: HeroStats;
  isLoading: boolean;
}

export const useDashboardStats = (): UseDashboardStatsReturn => {
  const [stats, setStats] = useState<HeroStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getStats();
      setStats(data);
      setIsLoading(false);
    };
    void load();
  }, []);

  return { stats, isLoading };
};
