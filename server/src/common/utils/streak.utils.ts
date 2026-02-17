// Streak and momentum calculation utilities

export interface CheckIn {
  date: Date;
  completed: boolean;
}

/**
 * Calculate current streak from check-ins
 * @param checkIns Array of check-in dates (sorted, most recent first)
 * @returns Current streak count
 */
export function calculateStreak(checkIns: Date[]): number {
  if (checkIns.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  const currentDate = new Date(today);

  for (const checkIn of checkIns) {
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}

/**
 * Calculate momentum score (0-100) based on recent activity
 * @param checkIns Array of check-ins from last 30 days
 * @returns Momentum score (0-100)
 */
export function calculateMomentum(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;

  const last30Days = checkIns.filter((checkIn) => {
    const daysAgo = Math.floor((Date.now() - checkIn.date.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo <= 30;
  });

  const completedCount = last30Days.filter((c) => c.completed).length;
  const totalDays = Math.min(30, last30Days.length);

  return Math.round((completedCount / totalDays) * 100);
}

/**
 * Check if streak is broken (gap > 1 day)
 * @param checkIns Array of check-in dates (sorted, most recent first)
 * @returns true if streak is broken
 */
export function isStreakBroken(checkIns: Date[]): boolean {
  if (checkIns.length < 2) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = new Date(checkIns[0]);
  mostRecent.setHours(0, 0, 0, 0);

  const daysSinceLastCheckIn = Math.floor(
    (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceLastCheckIn > 1;
}
