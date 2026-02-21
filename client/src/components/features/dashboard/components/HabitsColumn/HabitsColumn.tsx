'use client';

import { theme } from '@/styles/theme';
import { useDashboardHabits } from '@/components/features/dashboard/hooks/useDashboardHabits';
import { SectionHeader, SkeletonBlock } from '../shared';
import { HabitCard } from './HabitCard';
import { QuickActions } from './QuickActions';

export const HabitsColumn = () => {
  const { habits, isLoading, markComplete } = useDashboardHabits();

  return (
    <div
      style={{
        // Panel styling — makes equal height look intentional
        background: 'rgba(26, 26, 26, 0.5)',
        border: '1px solid rgba(249, 115, 22, 0.07)',
        borderRadius: theme.borderRadius['2xl'],
        padding: '16px',
        // Fill the full CSS Grid cell height
        height: '100%',
        boxSizing: 'border-box',
        // Internal layout
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* ── My Habits ── */}
      <section>
        <SectionHeader title="My Habits Today" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} height="64px" />)
            : habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} onMarkComplete={markComplete} />
              ))}
        </div>
      </section>

      {/* ── Quick Actions ── */}
      <section>{isLoading ? <SkeletonBlock height="140px" /> : <QuickActions />}</section>
    </div>
  );
};
