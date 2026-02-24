'use client';

import { useState, useEffect } from 'react';
import type { MomentumDay } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardMomentumReturn {
  momentumDays: MomentumDay[];
  isLoading: boolean;
}

export const useDashboardMomentum = (): UseDashboardMomentumReturn => {
  const [momentumDays, setMomentumDays] = useState<MomentumDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getMomentumMap();
      setMomentumDays(data);
      setIsLoading(false);
    };
    void load();
  }, []);

  return { momentumDays, isLoading };
};
