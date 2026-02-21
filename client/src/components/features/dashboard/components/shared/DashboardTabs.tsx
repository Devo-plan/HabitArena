import { Flame, Radio, Trophy } from 'lucide-react';
import type { DashboardTab } from '@/shared/types/dashboard.types';

const TABS: { id: DashboardTab; label: string; icon: typeof Flame }[] = [
  { id: 'habits', label: 'Habits', icon: Flame },
  { id: 'live', label: 'Live', icon: Radio },
  { id: 'ranks', label: 'Ranks', icon: Trophy },
];

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export const DashboardTabs = ({ activeTab, onTabChange }: DashboardTabsProps) => (
  <div
    style={{
      display: 'flex',
      background: '#1c1c1e',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '4px',
      gap: '2px',
    }}
  >
    {TABS.map(({ id, label, icon: Icon }) => {
      const isActive = activeTab === id;
      return (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px 12px',
            borderRadius: '9px',
            border: 'none',
            cursor: 'pointer',
            background: isActive ? '#c2410c' : 'transparent',
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
            fontSize: '13px',
            fontWeight: isActive ? 700 : 500,
            transition: 'all 0.15s ease',
            boxShadow: isActive ? '0 2px 12px rgba(194,65,12,0.35)' : 'none',
          }}
        >
          <Icon size={13} />
          {label}
        </button>
      );
    })}
  </div>
);
