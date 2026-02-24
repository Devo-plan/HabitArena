'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardTab } from '@/shared/types/dashboard.types';
import { useDashboardStats } from '@/components/features/dashboard/hooks/useDashboardStats';
import { HeroStatsBar } from '@/components/features/dashboard/components/HeroStatsBar';
import { HabitsColumn } from '@/components/features/dashboard/components/HabitsColumn';
import { LiveActivityColumn } from '@/components/features/dashboard/components/LiveActivityColumn';
import { RankingsColumn } from '@/components/features/dashboard/components/RankingsColumn';
import { DashboardTabs } from '@/components/features/dashboard/components/shared';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('habits');
  const { stats } = useDashboardStats();

  // Shared bell + streak pill — rendered in both mobile and desktop headers
  const BellButton = () => (
    <button
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '9px',
        background: '#1c1c1e',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.45)',
        flexShrink: 0,
      }}
    >
      <Bell size={15} />
    </button>
  );

  const StreakPill = ({ compact = false }: { compact?: boolean }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '5px' : '7px',
        padding: compact ? '7px 11px' : '8px 14px',
        borderRadius: '9px',
        background: '#c2410c',
        boxShadow: '0 0 20px rgba(194,65,12,0.4)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: compact ? '6px' : '7px',
          height: compact ? '6px' : '7px',
          borderRadius: '50%',
          background: '#ffffff',
          opacity: 0.9,
        }}
      />
      <span
        style={{
          fontSize: compact ? '12px' : '13px',
          fontWeight: 700,
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}
      >
        {stats.currentStreak > 0 ? `${stats.currentStreak} Day Streak` : 'Start Streak'}
      </span>
    </div>
  );

  return (
    <div style={{ color: theme.colors.text.primary }}>
      {/* ─────────────────────────────────────────────────
          MOBILE header layout:
          Row 1: "Dashboard"  ← flex-1  |  bell  streak-pill
          Row 2: subtitle full width

          This prevents the subtitle from being squeezed
          into 2 lines next to the streak pill.
          ───────────────────────────────────────────────── */}
      <div className="md:hidden mb-5">
        {/* Row 1 — title + actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '4px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 800,
              fontFamily: theme.typography.fontFamily.display,
              color: '#ffffff',
              lineHeight: 1.15,
            }}
          >
            Dashboard
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <BellButton />
            <StreakPill compact />
          </div>
        </div>

        {/* Row 2 — subtitle full width, no competition for space */}
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.4,
          }}
        >
          Welcome back! Here&apos;s your progress for today.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────
          DESKTOP header layout:
          title+subtitle left | bell+pill right (unchanged)
          ───────────────────────────────────────────────── */}
      <div className="hidden md:flex items-start justify-between mb-5" style={{ gap: '12px' }}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 800,
              fontFamily: theme.typography.fontFamily.display,
              color: '#ffffff',
              lineHeight: 1.15,
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              margin: '3px 0 0',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            Welcome back! Here&apos;s your progress for today.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <BellButton />
          <StreakPill />
        </div>
      </div>

      {/* ── Stats Row ── */}
      <HeroStatsBar />

      {/* ── Mobile Tab Switcher ── */}
      <div className="md:hidden mt-4">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Desktop 3-col ── */}
      <div
        className="hidden lg:grid mt-5"
        style={{ gridTemplateColumns: '280px 1fr 280px', gap: '16px' }}
      >
        <HabitsColumn />
        <LiveActivityColumn />
        <RankingsColumn />
      </div>

      {/* ── Tablet 2-col ── */}
      <div
        className="hidden md:grid lg:hidden mt-5"
        style={{ gridTemplateColumns: '1fr 280px', gap: '16px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <HabitsColumn />
          <LiveActivityColumn />
        </div>
        <RankingsColumn />
      </div>

      {/* ── Mobile single col ── */}
      <div className="md:hidden mt-3">
        {activeTab === 'habits' && <HabitsColumn />}
        {activeTab === 'live' && <LiveActivityColumn />}
        {activeTab === 'ranks' && <RankingsColumn />}
      </div>
    </div>
  );
}
