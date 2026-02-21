'use client';

// SidebarFooter.tsx — Profile link and logout button pinned at bottom of sidebar

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';
import { useSidebar } from '@/hooks/useSidebar';
import { useAuth } from '@/context/AuthContext';

export const SidebarFooter = () => {
  const { isCollapsed, isMobile, closeMobile } = useSidebar();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // FIX: startsWith handles nested profile routes like /profile/edit
  const isActive =
    pathname === ARENA_ROUTES.PROFILE || pathname.startsWith(`${ARENA_ROUTES.PROFILE}/`);
  const showLabels = isMobile || !isCollapsed;

  // Handle logout click
  const handleLogout = () => {
    if (isMobile) closeMobile();
    logout();
  };

  return (
    <div style={{ padding: '0 8px 12px' }}>
      <div
        style={{
          height: '1px',
          background: theme.colors.border.primary,
          marginBottom: '8px',
        }}
      />

      <Link
        href={ARENA_ROUTES.PROFILE}
        onClick={isMobile ? closeMobile : undefined}
        title={!showLabels ? 'Profile' : undefined}
        className={`flex items-center rounded-lg transition-all ${
          !isActive ? 'hover:bg-[rgba(249,115,22,0.05)]' : ''
        }`}
        style={{
          gap: showLabels ? '10px' : '0',
          padding: showLabels ? '8px 12px' : '9px 0',
          justifyContent: showLabels ? 'flex-start' : 'center',
          textDecoration: 'none',
          background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
          borderLeft: isActive ? `2px solid ${theme.colors.primary[500]}` : '2px solid transparent',
        }}
      >
        {/* Avatar — 28×28 matches logo container size in collapsed rail */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: theme.borderRadius.full,
            background: theme.colors.gradients.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <User size={14} color="#ffffff" />
        </div>

        {showLabels && (
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name || 'Warrior'}
            </p>
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.muted,
                margin: 0,
              }}
            >
              {user?.email || 'Arena Member'}
            </p>
          </div>
        )}
      </Link>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        title={!showLabels ? 'Logout' : undefined}
        className="flex items-center rounded-lg transition-all hover:bg-[rgba(239,68,68,0.08)]"
        style={{
          gap: showLabels ? '10px' : '0',
          padding: showLabels ? '8px 12px' : '9px 0',
          justifyContent: showLabels ? 'flex-start' : 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          marginTop: '4px',
        }}
      >
        {/* Logout icon — 28×28 circle */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: theme.borderRadius.full,
            background: 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LogOut size={14} color={theme.colors.secondary[500]} />
        </div>

        {showLabels && (
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.secondary[500],
            }}
          >
            Logout
          </span>
        )}
      </button>
    </div>
  );
};
