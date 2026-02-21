// dashboard.service.ts — Single integration point between dashboard UI and data
// All hooks call through here — never import mocks directly into hooks
// INTEGRATION GUIDE: replace each method body with the corresponding apiClient call
// Pattern: import { apiClient } from '@/api/client'; return apiClient.get<T>('/route')

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

// Simulates API latency — drives realistic skeleton → content transitions
// Remove entirely when real API is connected
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  async getStats(): Promise<HeroStats> {
    await delay(600);
    // TODO: return apiClient.get<HeroStats>('/dashboard/stats')
    return MOCK_HERO_STATS;
  },

  async getHabits(): Promise<DashboardHabit[]> {
    await delay(700);
    // TODO: return apiClient.get<DashboardHabit[]>('/habits/today')
    return MOCK_HABITS;
  },

  async markHabitComplete(habitId: string): Promise<void> {
    await delay(300);
    // TODO: await apiClient.post(`/habits/${habitId}/complete`)
    void habitId;
  },

  async getRooms(): Promise<DashboardRoom[]> {
    await delay(500);
    // TODO: return apiClient.get<DashboardRoom[]>('/rooms/active')
    // TODO: subscribe socket.on('room:warriors_updated', handler) for live counts
    return MOCK_ROOMS;
  },

  async getChallenge(): Promise<DashboardChallenge> {
    await delay(600);
    // TODO: return apiClient.get<DashboardChallenge>('/challenges/active')
    return MOCK_CHALLENGE;
  },

  async getSquadFeed(): Promise<DashboardSquadFeedItem[]> {
    await delay(700);
    // TODO: return apiClient.get<DashboardSquadFeedItem[]>('/squad/feed')
    // TODO: subscribe socket.on('squad:activity', handler) for real-time feed
    return MOCK_SQUAD_FEED;
  },

  async getLeaderboard(): Promise<DashboardLeaderboardEntry[]> {
    await delay(800);
    // TODO: return apiClient.get<DashboardLeaderboardEntry[]>('/leaderboard/global')
    return MOCK_LEADERBOARD;
  },

  async getMomentumMap(): Promise<MomentumDay[]> {
    await delay(500);
    // TODO: return apiClient.get<MomentumDay[]>('/habits/momentum?days=30')
    return MOCK_MOMENTUM_DAYS;
  },

  async getProofs(): Promise<DashboardProof[]> {
    await delay(600);
    // TODO: return apiClient.get<DashboardProof[]>('/proofs/recent')
    return MOCK_PROOFS;
  },
};
