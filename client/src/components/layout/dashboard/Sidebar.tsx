'use client';

import { Zap, PanelLeftClose, PanelLeft, X } from 'lucide-react';
import { theme } from '@/styles/theme';
import { SIDEBAR } from '@/shared/constants/app.constants';
import { useSidebar } from '@/hooks/useSidebar';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';

export const Sidebar = () => {
  const { isCollapsed, toggleCollapse, isMobileOpen, closeMobile, isMobile } = useSidebar();

  // Desktop: width transitions between COLLAPSED ↔ EXPANDED (pushes content)
  // Mobile:  always EXPANDED width, shown/hidden via transform (overlays content)
  const sidebarWidth = isMobile
    ? SIDEBAR.EXPANDED_WIDTH
    : isCollapsed
      ? SIDEBAR.COLLAPSED_WIDTH
      : SIDEBAR.EXPANDED_WIDTH;

  // Desktop: always in view — no transform needed
  // Mobile:  slides in from left only when isMobileOpen
  const sidebarTransform = isMobile
    ? isMobileOpen
      ? 'translateX(0)'
      : `translateX(-${SIDEBAR.EXPANDED_WIDTH}px)`
    : 'translateX(0)';

  // Labels + brand name shown when: desktop expanded OR mobile (always full-width)
  const showLabels = isMobile || !isCollapsed;

  return (
    <>
      {/* ── Mobile backdrop ── click outside to dismiss ── */}
      <div
        onClick={closeMobile}
        aria-hidden="true"
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(2px)',
          zIndex: theme.zIndex.modal - 1,
          opacity: isMobileOpen ? 1 : 0,
          pointerEvents: isMobileOpen ? 'auto' : 'none',
          transition: `opacity ${theme.transitions.base}`,
        }}
      />

      {/* ── Sidebar panel ── */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${sidebarWidth}px`,
          background: theme.colors.background.secondary,
          borderRight: `1px solid ${theme.colors.border.primary}`,
          display: 'flex',
          flexDirection: 'column',
          transition: `width ${theme.transitions.base}, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)`,
          transform: sidebarTransform,
          zIndex: isMobile ? theme.zIndex.modal : theme.zIndex.sticky,
          overflow: 'hidden',
          boxShadow: isMobile && isMobileOpen ? '8px 0 40px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: showLabels ? 'space-between' : 'center',
            padding: showLabels ? '0 14px' : '0',
            height: '64px',
            borderBottom: `1px solid ${theme.colors.border.primary}`,
            flexShrink: 0,
            gap: '8px',
          }}
        >
          {showLabels ? (
            // ── EXPANDED (desktop) or MOBILE: brand + action button ──
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.gradients.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 12px rgba(249, 115, 22, 0.35)',
                  }}
                >
                  <Zap size={14} color="#ffffff" fill="#ffffff" />
                </div>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.bold,
                    fontFamily: theme.typography.fontFamily.display,
                    background: theme.colors.gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    whiteSpace: 'nowrap',
                  }}
                >
                  HabitArena
                </span>
              </div>

              {/* Collapse (desktop) or Close (mobile) — both 32×32, icon size={16} */}
              <button
                onClick={isMobile ? closeMobile : toggleCollapse}
                title={isMobile ? 'Close menu' : 'Collapse sidebar'}
                className="hover:bg-[rgba(249,115,22,0.08)] transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: theme.borderRadius.md,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: theme.colors.text.muted,
                  flexShrink: 0,
                }}
              >
                {isMobile ? <X size={16} /> : <PanelLeftClose size={16} />}
              </button>
            </>
          ) : (
            // ── COLLAPSED (desktop only): logo mark → PanelLeft on hover ──
            // Pure CSS group-hover — no JS useState, no render-cycle icon flash
            <button
              onClick={toggleCollapse}
              title="Expand sidebar"
              className="group"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: theme.borderRadius.md,
                transition: theme.transitions.base,
                padding: 0,
              }}
            >
              {/* Logo mark — visible at rest, hidden on hover */}
              <div
                className="flex group-hover:hidden items-center justify-center"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.gradients.primary,
                  boxShadow: '0 0 10px rgba(249, 115, 22, 0.3)',
                }}
              >
                <Zap size={14} color="#ffffff" fill="#ffffff" />
              </div>

              {/* PanelLeft — hidden at rest, shown on hover */}
              <PanelLeft
                size={16}
                className="hidden group-hover:block"
                color={theme.colors.text.secondary}
              />
            </button>
          )}
        </div>

        {/* ── Navigation ── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.colors.border.primary} transparent`,
          }}
        >
          <SidebarNav />
        </div>

        {/* ── Profile Footer ── */}
        <SidebarFooter />
      </aside>
    </>
  );
};
