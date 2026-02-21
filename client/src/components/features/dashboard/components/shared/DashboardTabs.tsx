import { Flame, Zap, Trophy, type LucideIcon } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardTab } from '@/shared/types/dashboard.types';

interface TabItem {
  id: DashboardTab;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { id: 'habits', label: 'Habits', icon: Flame },
  { id: 'live', label: 'Live', icon: Zap },
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
      borderRadius: theme.borderRadius.xl,
      background: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.primary}`,
      padding: '4px',
      marginBottom: '16px',
      gap: '4px',
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
            padding: '8px 0',
            borderRadius: theme.borderRadius.lg,
            border: 'none',
            cursor: 'pointer',
            fontSize: theme.typography.fontSize.sm,
            fontWeight: isActive
              ? theme.typography.fontWeight.semibold
              : theme.typography.fontWeight.medium,
            background: isActive ? theme.colors.gradients.primary : 'transparent',
            color: isActive ? '#ffffff' : theme.colors.text.tertiary,
            transition: theme.transitions.base,
          }}
        >
          <Icon size={15} />
          {label}
        </button>
      );
    })}
  </div>
);
