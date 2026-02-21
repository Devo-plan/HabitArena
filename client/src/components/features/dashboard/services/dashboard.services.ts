import type {
  HeroStats,
  DashboardHabit,
  DashboardRoom,
  DashboardChallenge,
  DashboardSquadFeedItem,
  DashboardLeaderboardEntry,
  MomentumDay,
  DashboardProof,
} from '@/shared/types/dashboard.types';

import {
  MOCK_HERO_STATS,
  MOCK_HABITS,
  MOCK_ROOMS,
  MOCK_CHALLENGE,
  MOCK_SQUAD_FEED,
  MOCK_LEADERBOARD,
  MOCK_MOMENTUM_DAYS,
  MOCK_PROOFS,
} from '@/shared/mocks/dashboard.mocks';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  async getStats(): Promise<HeroStats> {
    await delay(600);
    return MOCK_HERO_STATS;
  },
  async getHabits(): Promise<DashboardHabit[]> {
    await delay(700);
    return MOCK_HABITS;
  },
  async getRooms(): Promise<DashboardRoom[]> {
    await delay(500);
    return MOCK_ROOMS;
  },
  async getChallenge(): Promise<DashboardChallenge> {
    await delay(600);
    return MOCK_CHALLENGE;
  },
  async getSquadFeed(): Promise<DashboardSquadFeedItem[]> {
    await delay(700);
    return MOCK_SQUAD_FEED;
  },
  async getLeaderboard(): Promise<DashboardLeaderboardEntry[]> {
    await delay(800);
    return MOCK_LEADERBOARD;
  },
  async getMomentumMap(): Promise<MomentumDay[]> {
    await delay(500);
    return MOCK_MOMENTUM_DAYS;
  },
  async getProofs(): Promise<DashboardProof[]> {
    await delay(600);
    return MOCK_PROOFS;
  },

  async markHabitComplete(habitId: string): Promise<void> {
    await delay(300);
    void habitId;
    // TODO: await apiClient.post(`/habits/${habitId}/complete`)
  },

  async markHabitIncomplete(habitId: string): Promise<void> {
    await delay(300);
    void habitId;
    // TODO: await apiClient.delete(`/habits/${habitId}/complete`)
  },
};
