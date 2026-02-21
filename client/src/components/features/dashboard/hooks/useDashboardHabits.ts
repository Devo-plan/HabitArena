'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DashboardHabit, HabitCompletionStatus } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardHabitsReturn {
  habits: DashboardHabit[];
  isLoading: boolean;
  markComplete: (habitId: string) => Promise<void>;
}

export const useDashboardHabits = (): UseDashboardHabitsReturn => {
  const [habits, setHabits] = useState<DashboardHabit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getHabits();
      setHabits(data);
      setIsLoading(false);
    };
    void load();
  }, []);

  const markComplete = useCallback(async (habitId: string) => {
    // Optimistic update — instant UI feedback before server confirms
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, completionStatus: 'completed' as HabitCompletionStatus } : h
      )
    );
    await dashboardService.markHabitComplete(habitId);
  }, []);

  return { habits, isLoading, markComplete };
};
