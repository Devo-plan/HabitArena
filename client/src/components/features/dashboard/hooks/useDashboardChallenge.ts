'use client';

import { useState, useEffect } from 'react';
import type { DashboardChallenge } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

const DEFAULT_CHALLENGE: DashboardChallenge = {
  id: '',
  name: '',
  tier: 'bronze',
  currentRank: 0,
  totalParticipants: 0,
  progressPercent: 0,
  daysRemaining: 0,
  season: '',
};

export interface UseDashboardChallengeReturn {
  challenge: DashboardChallenge;
  isLoading: boolean;
}

export const useDashboardChallenge = (): UseDashboardChallengeReturn => {
  const [challenge, setChallenge] = useState<DashboardChallenge>(DEFAULT_CHALLENGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getChallenge();
      setChallenge(data);
      setIsLoading(false);
    };
    void load();
  }, []);

  return { challenge, isLoading };
};
