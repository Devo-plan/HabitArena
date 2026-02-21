export type HabitCompletionStatus = 'completed' | 'pending' | 'missed';
export type RoomStatus = 'live' | 'starting_soon';
export type SeasonTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type ProofMediaType = 'image' | 'text';
export type DashboardTab = 'habits' | 'live' | 'ranks';

export interface HeroStats {
  currentStreak: number;
  activeHabits: number;
  globalRank: number;
  rankPercentile: string; // e.g. 'Top 5%'
  totalXP: number;
  xpToday: number; // e.g. +240 today
  activeRooms: number;
}

export interface DashboardHabit {
  id: string;
  name: string;
  streak: number;
  completionStatus: HabitCompletionStatus;
  nextDueTime: string;
  category: string;
}

export interface DashboardRoom {
  id: string;
  name: string;
  status: RoomStatus;
  warriorCount: number;
  maxCapacity: number;
  hostName: string;
  topic: string;
  participantAvatars: string[]; // initials of first 3 visible participants
}

export interface DashboardChallenge {
  id: string;
  name: string;
  tier: SeasonTier;
  currentRank: number;
  totalParticipants: number;
  progressPercent: number;
  daysRemaining: number;
  season: string;
}

export interface DashboardSquadFeedItem {
  id: string;
  memberName: string;
  memberInitials: string;
  action: string;
  habitName: string;
  streakCount: number;
  timestamp: string;
}

export interface DashboardLeaderboardEntry {
  rank: number;
  warriorName: string;
  streakDays: number;
  xp: number;
  isCurrentUser: boolean;
  initials: string; // for avatar circle
}

export interface MomentumDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface DashboardProof {
  id: string;
  warriorName: string;
  habitName: string;
  mediaType: ProofMediaType;
  submittedAt: string;
}
