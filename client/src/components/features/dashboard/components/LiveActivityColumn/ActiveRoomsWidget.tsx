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
          style={{
            background: theme.colors.background.secondary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: '14px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            // Prevent card from exceeding parent width
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Row 1: name + status badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '10px',
              minWidth: 0,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 700,
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
                  margin: '2px 0 0',
                  fontSize: '12px',
                  color: theme.colors.text.muted,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {room.hostName} &bull; {room.topic}
              </p>
            </div>

            {/* Status badge — flex-shrink:0 so it never gets crushed */}
            <div style={{ flexShrink: 0 }}>
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
                    padding: '3px 9px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  Soon
                </span>
              )}
            </div>
          </div>

          {/* Row 2: avatars + count | join button */}
          {/* flex-wrap: wrap so on very narrow screens the button drops below */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              minWidth: 0,
            }}
          >
            {/* Avatar stack + count — grouped so they wrap together */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Overlapping avatars */}
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {room.participantAvatars.slice(0, OVERFLOW_THRESHOLD).map((initials, i) => (
                  <div
                    key={i}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: getAvatarColor(initials),
                      border: `2px solid ${theme.colors.background.secondary}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginLeft: i > 0 ? '-7px' : '0',
                      position: 'relative',
                      zIndex: OVERFLOW_THRESHOLD - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
                {overflow > 0 && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: theme.colors.background.tertiary,
                      border: `2px solid ${theme.colors.background.secondary}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: theme.colors.text.muted,
                      marginLeft: '-7px',
                      position: 'relative',
                      zIndex: 0,
                    }}
                  >
                    +{overflow}
                  </div>
                )}
              </div>

              {/* Participant count — truncates if needed */}
              <span
                style={{
                  fontSize: '12px',
                  color: theme.colors.text.muted,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {room.warriorCount}/{room.maxCapacity} participants
              </span>
            </div>

            {/* Join button — flexShrink:0 so it never gets squeezed */}
            <Link
              href="/ritual"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 14px',
                borderRadius: '8px',
                background:
                  room.status === 'live'
                    ? theme.colors.gradients.primary
                    : theme.colors.background.tertiary,
                border:
                  room.status !== 'live' ? `1px solid ${theme.colors.border.primary}` : 'none',
                color: room.status === 'live' ? '#ffffff' : theme.colors.text.tertiary,
                fontSize: '12px',
                fontWeight: 700,
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
