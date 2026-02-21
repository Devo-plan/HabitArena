// components/shared/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { Home, Target, Trophy, Users, Settings, LogOut, ChevronLeft, Zap } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
  { label: 'My Habits', href: '/habits', icon: <Target size={20} /> },
  { label: 'Leaderboard', href: '/leaderboard', icon: <Trophy size={20} /> },
  { label: 'Ritual Rooms', href: '/rooms', icon: <Users size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const pathname = usePathname();

  const sidebarStyles: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: collapsed ? '5rem' : '16rem',
    backgroundColor: theme.colors.background.secondary,
    borderRight: `1px solid ${theme.colors.border.primary}`,
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.base,
    zIndex: theme.zIndex.fixed,
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
  };

  const navItemStyles = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    color: isActive ? theme.colors.text.primary : theme.colors.text.tertiary,
    backgroundColor: isActive ? theme.colors.background.hover : 'transparent',
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    transition: theme.transitions.fast,
    cursor: 'pointer',
    marginBottom: theme.spacing.xs,
  });

  return (
    <aside style={sidebarStyles}>
      {/* Logo */}
      <div style={logoStyles}>
        <Zap size={24} color={theme.colors.primary[500]} fill={theme.colors.primary[500]} />
        {!collapsed && <span>HabitArena</span>}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={navItemStyles(isActive)}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
        <button
          onClick={onToggle}
          style={{
            ...navItemStyles(false),
            border: 'none',
            background: 'transparent',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <ChevronLeft
            size={20}
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: theme.transitions.base,
            }}
          />
          {!collapsed && <span>Collapse</span>}
        </button>

        <button
          style={{
            ...navItemStyles(false),
            border: 'none',
            background: 'transparent',
            color: theme.colors.error,
          }}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
