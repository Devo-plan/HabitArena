'use client';

import { useState } from 'react';
import { theme } from '@/styles/theme';
import type { DashboardTab } from '@/shared/types/dashboard.types';
import { HeroStatsBar } from '@/components/features/dashboard/components/HeroStatsBar';
import { HabitsColumn } from '@/components/features/dashboard/components/HabitsColumn';
import { LiveActivityColumn } from '@/components/features/dashboard/components/LiveActivityColumn';
import { RankingsColumn } from '@/components/features/dashboard/components/RankingsColumn';
import { DashboardTabs } from '@/components/features/dashboard/components/shared';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('habits');

  return (
    <div style={{ color: theme.colors.text.primary }}>
      {/* ── Sticky Hero Stats Bar ── */}
      <HeroStatsBar />

      {/* ── Mobile Tab Switcher ── */}
      <div className="md:hidden">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ─────────────────────────────────────────────────
          DESKTOP (lg+): 260px | 1fr | 300px
          No alignItems — default stretch makes all
          3 grid cells the same height as the tallest one
          ───────────────────────────────────────────────── */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: '260px 1fr 300px',
          gap: '20px',
          // alignItems: 'start' intentionally removed
        }}
      >
        <HabitsColumn />
        <LiveActivityColumn />
        <RankingsColumn />
      </div>

      {/* ─────────────────────────────────────────────────
          TABLET (md → lg): 1fr | 300px
          Same: no alignItems so both cells are equal height
          ───────────────────────────────────────────────── */}
      <div
        className="hidden md:grid lg:hidden"
        style={{
          gridTemplateColumns: '1fr 300px',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <HabitsColumn />
          <LiveActivityColumn />
        </div>
        <RankingsColumn />
      </div>

      {/* ─────────────────────────────────────────────────
          MOBILE: Single column via tabs
          ───────────────────────────────────────────────── */}
      <div className="md:hidden">
        {activeTab === 'habits' && <HabitsColumn />}
        {activeTab === 'live' && <LiveActivityColumn />}
        {activeTab === 'ranks' && <RankingsColumn />}
      </div>
    </div>
  );
}
