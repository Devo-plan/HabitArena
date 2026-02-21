'use client';

import { useState, useEffect } from 'react';
import type { DashboardLeaderboardEntry } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardRankingsReturn {
  leaderboard: DashboardLeaderboardEntry[];
  isLoading: boolean;
}

export const useDashboardRankings = (): UseDashboardRankingsReturn => {
  const [leaderboard, setLeaderboard] = useState<DashboardLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getLeaderboard();
      setLeaderboard(data);
      setIsLoading(false);
    };
    void load();
  }, []);

  return { leaderboard, isLoading };
};
