import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { theme } from '@/styles/theme';
import { LiveBadge } from '../shared';
import type { DashboardRoom } from '@/shared/types/dashboard.types';

const AVATAR_COLORS = [
  theme.colors.primary[500],
  theme.colors.accent.steel,
  theme.colors.accent.gold,
  theme.colors.accent.emerald,
];

const getAvatarColor = (s: string) => AVATAR_COLORS[s.charCodeAt(0) % AVATAR_COLORS.length];

const OVERFLOW_THRESHOLD = 3;

interface ActiveRoomsWidgetProps {
  rooms: DashboardRoom[];
}

export const ActiveRoomsWidget = ({ rooms }: ActiveRoomsWidgetProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {rooms.slice(0, 2).map((room) => {
      const overflow = room.warriorCount - OVERFLOW_THRESHOLD;
      return (
        <div
          key={room.id}
          className="hover:border-[rgba(249,115,22,0.25)] transition-colors"
          style={{
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: theme.borderRadius['2xl'],
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Row 1: name + live badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                  lineHeight: 1.2,
                }}
              >
                {room.name}
              </p>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.muted,
                }}
              >
                {room.hostName} &bull; {room.topic}
              </p>
            </div>
            {room.status === 'live' ? (
              <LiveBadge />
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  color: theme.colors.accent.gold,
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: theme.borderRadius.full,
                  padding: '3px 10px',
                  fontWeight: theme.typography.fontWeight.bold,
                  whiteSpace: 'nowrap',
                }}
              >
                Starting Soon
              </span>
            )}
          </div>

          {/* Row 2: avatar stack + participant count + join button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Overlapping avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {room.participantAvatars.slice(0, OVERFLOW_THRESHOLD).map((initials, i) => (
                <div
                  key={i}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: getAvatarColor(initials),
                    border: `2px solid ${theme.colors.background.secondary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: theme.typography.fontWeight.bold,
                    color: '#ffffff',
                    marginLeft: i > 0 ? '-8px' : '0',
                    zIndex: OVERFLOW_THRESHOLD - i,
                    position: 'relative',
                  }}
                >
                  {initials}
                </div>
              ))}
              {overflow > 0 && (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: theme.colors.background.tertiary,
                    border: `2px solid ${theme.colors.background.secondary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.muted,
                    marginLeft: '-8px',
                    position: 'relative',
                    zIndex: 0,
                  }}
                >
                  +{overflow}
                </div>
              )}
            </div>

            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.muted,
                flex: 1,
              }}
            >
              {room.warriorCount} / {room.maxCapacity} participants
            </span>

            {/* Join button */}
            <Link
              href="/ritual"
              className="hover:opacity-85 transition-opacity"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 16px',
                borderRadius: theme.borderRadius.lg,
                background:
                  room.status === 'live'
                    ? theme.colors.gradients.primary
                    : theme.colors.background.tertiary,
                border:
                  room.status !== 'live' ? `1px solid ${theme.colors.border.primary}` : 'none',
                color: room.status === 'live' ? '#ffffff' : theme.colors.text.tertiary,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.bold,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {room.status === 'live' ? 'Join Room' : 'Notify Me'}
              <ArrowRight size={11} />
            </Link>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: '4px',
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
                  room.status === 'live' ? theme.colors.gradients.primary : 'rgba(245,158,11,0.5)',
                borderRadius: theme.borderRadius.full,
              }}
            />
          </div>
        </div>
      );
    })}
  </div>
);
