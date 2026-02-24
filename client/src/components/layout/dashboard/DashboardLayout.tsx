'use client';

import { ReactNode } from 'react';
import { Menu, Zap } from 'lucide-react';
import { theme } from '@/styles/theme';
import { SIDEBAR } from '@/shared/constants/app.constants';
import { Sidebar } from './Sidebar';
import { useSidebar } from '@/hooks/useSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isCollapsed, isMobile, openMobile } = useSidebar();

  const contentMargin = isMobile
    ? '0px'
    : isCollapsed
      ? `${SIDEBAR.COLLAPSED_WIDTH}px`
      : `${SIDEBAR.EXPANDED_WIDTH}px`;

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', background: theme.colors.background.primary }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: contentMargin,
          transition: `margin-left ${theme.transitions.base}`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile top bar */}
        <div
          className="flex md:hidden items-center"
          style={{
            height: '60px',
            padding: '0 20px',
            gap: '14px',
            borderBottom: `1px solid ${theme.colors.border.primary}`,
            background: theme.colors.background.secondary,
            flexShrink: 0,
          }}
        >
          <button
            onClick={openMobile}
            className="hover:bg-[rgba(249,115,22,0.08)] transition-all"
            style={{
              background: 'transparent',
              border: `1px solid ${theme.colors.border.primary}`,
              borderRadius: theme.borderRadius.md,
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: theme.colors.text.tertiary,
              flexShrink: 0,
            }}
          >
            <Menu size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={13} color="#ffffff" fill="#ffffff" />
            </div>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                fontFamily: theme.typography.fontFamily.display,
                background: theme.colors.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              HabitArena
            </span>
          </div>
        </div>

        {/* Page content — restored top padding */}
        <main
          className="flex-1 px-4 pt-4 pb-6 md:px-8 md:pt-6 md:pb-10"
          style={{ color: theme.colors.text.primary }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
