import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { theme } from '@/styles/theme';
import { LiveBadge } from '../shared';
import type { DashboardRoom } from '@/shared/types/dashboard.types';

interface ActiveRoomsWidgetProps {
  rooms: DashboardRoom[];
}

export const ActiveRoomsWidget = ({ rooms }: ActiveRoomsWidgetProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {rooms.slice(0, 3).map((room) => (
      <div
        key={room.id}
        className="hover:border-[rgba(249,115,22,0.25)] transition-all"
        style={{
          background: theme.colors.background.secondary,
          border: `1px solid ${theme.colors.border.primary}`,
          borderRadius: theme.borderRadius.xl,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Row 1: name + status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: 1.3,
              }}
            >
              {room.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '11px',
                color: theme.colors.text.muted,
                marginTop: '1px',
              }}
            >
              {room.hostName} · {room.topic}
            </p>
          </div>

          {room.status === 'live' ? (
            <LiveBadge />
          ) : (
            <span
              style={{
                fontSize: '10px',
                color: theme.colors.accent.gold,
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: theme.borderRadius.full,
                padding: '2px 8px',
                fontWeight: theme.typography.fontWeight.bold,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Soon
            </span>
          )}
        </div>

        {/* Row 2: capacity bar + warrior count + join button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Capacity bar + count */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Users size={10} color={theme.colors.text.muted} />
              <span style={{ fontSize: '10px', color: theme.colors.text.muted }}>
                {room.warriorCount}/{room.maxCapacity}
              </span>
            </div>
            <div
              style={{
                height: '3px',
                background: theme.colors.background.tertiary,
                borderRadius: theme.borderRadius.full,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(room.warriorCount / room.maxCapacity) * 100}%`,
                  background:
                    room.status === 'live'
                      ? theme.colors.gradients.primary
                      : 'rgba(245, 158, 11, 0.5)',
                  borderRadius: theme.borderRadius.full,
                }}
              />
            </div>
          </div>

          {/* Join button — compact inline */}
          <Link
            href="/ritual"
            className="hover:opacity-85 transition-opacity"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 12px',
              borderRadius: theme.borderRadius.lg,
              background:
                room.status === 'live'
                  ? theme.colors.gradients.primary
                  : theme.colors.background.tertiary,
              border: room.status !== 'live' ? `1px solid ${theme.colors.border.primary}` : 'none',
              color: room.status === 'live' ? '#ffffff' : theme.colors.text.tertiary,
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {room.status === 'live' ? 'Join' : 'Notify'}
            <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    ))}
  </div>
);
