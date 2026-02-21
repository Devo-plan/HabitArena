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

export const MOCK_HERO_STATS: HeroStats = {
  currentStreak: 21,
  activeHabits: 6,
  globalRank: 347,
  rankPercentile: 'Top 5%',
  totalXP: 12480,
  xpToday: 240,
  activeRooms: 3,
};

export const MOCK_HABITS: DashboardHabit[] = [
  {
    id: 'h1',
    name: 'Morning Run',
    streak: 21,
    completionStatus: 'completed',
    nextDueTime: 'Tomorrow 6:00 AM',
    category: 'Fitness',
  },
  {
    id: 'h2',
    name: 'Deep Work — 2hrs',
    streak: 14,
    completionStatus: 'pending',
    nextDueTime: 'Today 2:00 PM',
    category: 'Focus',
  },
  {
    id: 'h3',
    name: 'Read 30 mins',
    streak: 30,
    completionStatus: 'pending',
    nextDueTime: 'Today 9:00 PM',
    category: 'Growth',
  },
  {
    id: 'h4',
    name: 'Cold Shower',
    streak: 7,
    completionStatus: 'pending',
    nextDueTime: 'Today 7:30 AM',
    category: 'Discipline',
  },
  {
    id: 'h5',
    name: 'Meditation',
    streak: 5,
    completionStatus: 'missed',
    nextDueTime: 'Today 8:00 AM',
    category: 'Mindset',
  },
];

export const MOCK_ROOMS: DashboardRoom[] = [
  {
    id: 'r1',
    name: 'Deep Work Dungeon',
    status: 'live',
    warriorCount: 12,
    maxCapacity: 20,
    hostName: 'Kush',
    topic: 'Focus & Study',
    participantAvatars: ['KU', 'AX', 'PR'],
  },
  {
    id: 'r2',
    name: 'Morning Warriors',
    status: 'live',
    warriorCount: 8,
    maxCapacity: 15,
    hostName: 'Yash',
    topic: 'Physical Fitness',
    participantAvatars: ['YA', 'RA', 'SN'],
  },
  {
    id: 'r3',
    name: 'Night Owls Study',
    status: 'starting_soon',
    warriorCount: 3,
    maxCapacity: 10,
    hostName: 'ArenaX',
    topic: 'Study',
    participantAvatars: ['AX', 'KU'],
  },
];

export const MOCK_CHALLENGE: DashboardChallenge = {
  id: 'c1',
  name: 'Winter Warrior',
  tier: 'gold',
  season: 'Season 3',
  currentRank: 42,
  totalParticipants: 2847,
  progressPercent: 68,
  daysRemaining: 14,
};

export const MOCK_SQUAD_FEED: DashboardSquadFeedItem[] = [
  {
    id: 'sf1',
    memberName: 'Kush',
    memberInitials: 'KU',
    action: 'completed',
    habitName: 'Morning Run',
    streakCount: 30,
    timestamp: '2m ago',
  },
  {
    id: 'sf2',
    memberName: 'ArenaX',
    memberInitials: 'AX',
    action: 'hit a milestone on',
    habitName: 'Cold Shower',
    streakCount: 50,
    timestamp: '7m ago',
  },
  {
    id: 'sf3',
    memberName: 'Priya',
    memberInitials: 'PR',
    action: 'submitted proof for',
    habitName: 'Deep Work — 2hrs',
    streakCount: 14,
    timestamp: '15m ago',
  },
  {
    id: 'sf4',
    memberName: 'Rahul',
    memberInitials: 'RA',
    action: 'completed',
    habitName: 'Meditation',
    streakCount: 7,
    timestamp: '22m ago',
  },
  {
    id: 'sf5',
    memberName: 'Sneha',
    memberInitials: 'SN',
    action: 'joined challenge',
    habitName: 'Winter Warrior',
    streakCount: 3,
    timestamp: '34m ago',
  },
];

export const MOCK_LEADERBOARD: DashboardLeaderboardEntry[] = [
  {
    rank: 1,
    warriorName: 'FireStreak99',
    streakDays: 180,
    xp: 48200,
    isCurrentUser: false,
    initials: 'FS',
  },
  {
    rank: 2,
    warriorName: 'Kush',
    streakDays: 156,
    xp: 41800,
    isCurrentUser: false,
    initials: 'KU',
  },
  {
    rank: 3,
    warriorName: 'ArenaKing',
    streakDays: 142,
    xp: 38900,
    isCurrentUser: false,
    initials: 'AK',
  },
  { rank: 347, warriorName: 'You', streakDays: 21, xp: 12480, isCurrentUser: true, initials: 'YO' },
];

const MOMENTUM_PATTERN: Array<0 | 1 | 2 | 3 | 4> = [
  4, 4, 3, 4, 4, 2, 0, 4, 4, 4, 3, 4, 0, 0, 4, 4, 3, 4, 4, 4, 2, 4, 4, 4, 3, 0, 4, 4, 4, 4,
];

const buildMomentumDays = (): MomentumDay[] => {
  const today = new Date();
  return MOMENTUM_PATTERN.map((level, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return { date: d.toISOString().split('T')[0], count: level * 2, level };
  });
};

export const MOCK_MOMENTUM_DAYS: MomentumDay[] = buildMomentumDays();

export const MOCK_PROOFS: DashboardProof[] = [
  {
    id: 'p1',
    warriorName: 'Kush',
    habitName: 'Morning Run',
    mediaType: 'image',
    submittedAt: '8m ago',
  },
  {
    id: 'p2',
    warriorName: 'Priya',
    habitName: 'Meditation',
    mediaType: 'image',
    submittedAt: '14m ago',
  },
  {
    id: 'p3',
    warriorName: 'ArenaX',
    habitName: 'Cold Shower',
    mediaType: 'image',
    submittedAt: '21m ago',
  },
  {
    id: 'p4',
    warriorName: 'Sneha',
    habitName: 'Deep Work — 2hrs',
    mediaType: 'image',
    submittedAt: '35m ago',
  },
];
