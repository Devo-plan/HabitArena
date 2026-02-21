'use client';

// SidebarFooter.tsx — Profile link pinned at bottom of sidebar
// TODO: Replace PLACEHOLDER_USER with useAuth() once backend is connected

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';
import { useSidebar } from '@/hooks/useSidebar';

const PLACEHOLDER_USER = {
  name: 'Warrior',
  role: 'Arena Member',
} as const;

export const SidebarFooter = () => {
  const { isCollapsed, isMobile, closeMobile } = useSidebar();
  const pathname = usePathname();

  // FIX: startsWith handles nested profile routes like /profile/edit
  const isActive =
    pathname === ARENA_ROUTES.PROFILE || pathname.startsWith(`${ARENA_ROUTES.PROFILE}/`);
  const showLabels = isMobile || !isCollapsed;

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
              {PLACEHOLDER_USER.name}
            </p>
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.muted,
                margin: 0,
              }}
            >
              {PLACEHOLDER_USER.role}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};
