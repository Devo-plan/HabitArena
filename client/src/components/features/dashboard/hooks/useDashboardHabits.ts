'use client';

// useDashboardHabits.ts — Toggle support added
// markComplete:   pending/missed → completed (optimistic)
// markIncomplete: completed → pending (optimistic)
// Both call through to dashboardService; real API swap is trivial

import { useState, useEffect, useCallback } from 'react';
import type { DashboardHabit, HabitCompletionStatus } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardHabitsReturn {
  habits: DashboardHabit[];
  isLoading: boolean;
  markComplete: (habitId: string) => Promise<void>;
  markIncomplete: (habitId: string) => Promise<void>;
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

  // Optimistically flip status — server call fires in background
  const setStatus = useCallback((habitId: string, status: HabitCompletionStatus) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, completionStatus: status } : h))
    );
  }, []);

  const markComplete = useCallback(
    async (habitId: string) => {
      setStatus(habitId, 'completed');
      await dashboardService.markHabitComplete(habitId);
      // TODO: on API error → revert: setStatus(habitId, previousStatus)
    },
    [setStatus]
  );

  const markIncomplete = useCallback(
    async (habitId: string) => {
      setStatus(habitId, 'pending');
      await dashboardService.markHabitIncomplete(habitId);
      // TODO: on API error → revert: setStatus(habitId, 'completed')
    },
    [setStatus]
  );

  return { habits, isLoading, markComplete, markIncomplete };
};
