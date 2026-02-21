'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Flame, Trophy, Users } from 'lucide-react';
import { theme } from '@/styles/theme';
import { ARENA_ROUTES } from '@/shared/constants/routes.constants';
import { useSidebar } from '@/hooks/useSidebar';

const NAV_ITEMS = [
  { label: 'Dashboard', href: ARENA_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Ritual Rooms', href: ARENA_ROUTES.RITUAL, icon: Flame },
  { label: 'Challenges', href: ARENA_ROUTES.CHALLENGES, icon: Trophy },
  { label: 'Squads', href: ARENA_ROUTES.SQUADS, icon: Users },
] as const;

export const SidebarNav = () => {
  const pathname = usePathname();
  const { isCollapsed, isMobile, closeMobile } = useSidebar();

  const showLabels = isMobile || !isCollapsed;

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '8px',
      }}
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        // FIX: startsWith handles nested routes e.g. /ritual/[roomId]
        // Trailing slash prevents partial segment matches like /rituals matching /ritual
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            onClick={isMobile ? closeMobile : undefined}
            title={!showLabels ? label : undefined}
            className={`flex items-center rounded-lg transition-all ${
              !isActive ? 'hover:bg-[rgba(249,115,22,0.05)]' : ''
            }`}
            style={{
              gap: showLabels ? '12px' : '0',
              padding: showLabels ? '10px 12px' : '10px 0',
              justifyContent: showLabels ? 'flex-start' : 'center',
              textDecoration: 'none',
              background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
              borderLeft: isActive
                ? `2px solid ${theme.colors.primary[500]}`
                : '2px solid transparent',
              color: isActive ? theme.colors.text.accent : theme.colors.text.tertiary,
            }}
          >
            <Icon
              size={18}
              style={{
                flexShrink: 0,
                color: isActive ? theme.colors.primary[500] : 'currentColor',
              }}
            />
            {showLabels && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: isActive
                    ? theme.typography.fontWeight.semibold
                    : theme.typography.fontWeight.medium,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
