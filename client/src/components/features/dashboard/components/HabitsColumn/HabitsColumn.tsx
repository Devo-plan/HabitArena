'use client';

import { theme } from '@/styles/theme';
import { useDashboardHabits } from '@/components/features/dashboard/hooks/useDashboardHabits';
import { SectionHeader, SkeletonBlock } from '../shared';
import { HabitCard } from './HabitCard';
import { QuickActions } from './QuickActions';

export const HabitsColumn = () => {
  const { habits, isLoading, markComplete, markIncomplete } = useDashboardHabits();

  return (
    <div
      style={{
        background: 'rgba(26,26,26,0.5)',
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: '16px',
        padding: '16px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <section>
        <SectionHeader title="My Habits Today" actionLabel="View All" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} height="72px" />)
            : habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onMarkComplete={markComplete}
                  onMarkIncomplete={markIncomplete}
                />
              ))}
        </div>
      </section>

      <section>{isLoading ? <SkeletonBlock height="120px" /> : <QuickActions />}</section>
    </div>
  );
};
