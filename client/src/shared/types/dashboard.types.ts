// ── Status Unions ────────────────────────────────────────────────────

export type HabitCompletionStatus = 'completed' | 'pending' | 'missed';
export type RoomStatus = 'live' | 'starting_soon';
export type SeasonTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type ProofMediaType = 'image' | 'text';
export type DashboardTab = 'habits' | 'live' | 'ranks';

// ── Data Shapes ──────────────────────────────────────────────────────

export interface HeroStats {
  currentStreak: number;
  activeHabits: number;
  globalRank: number;
  totalXP: number;
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
}

// level 0–4 drives heatmap color intensity in MomentumMap
// 0 = no activity, 4 = peak streak strength
export interface MomentumDay {
  date: string; // ISO format: 'YYYY-MM-DD'
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
