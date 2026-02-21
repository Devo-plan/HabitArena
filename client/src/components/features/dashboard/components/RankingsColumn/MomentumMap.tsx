'use client';

import { useState } from 'react';
import { theme } from '@/styles/theme';
import type { MomentumDay } from '@/shared/types/dashboard.types';

const HEAT_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'rgba(249, 115, 22, 0.07)',
  1: 'rgba(249, 115, 22, 0.22)',
  2: 'rgba(249, 115, 22, 0.42)',
  3: 'rgba(249, 115, 22, 0.68)',
  4: 'rgba(249, 115, 22, 0.92)',
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

interface MomentumMapProps {
  days: MomentumDay[];
}

export const MomentumMap = ({ days }: MomentumMapProps) => {
  const [hoveredDay, setHoveredDay] = useState<MomentumDay | null>(null);

  return (
    <div>
      {/* 10-col × 3-row grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '3px',
        }}
      >
        {days.map((day) => {
          const isHovered = hoveredDay?.date === day.date;
          return (
            <div
              key={day.date}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                aspectRatio: '1',
                borderRadius: '3px',
                background: HEAT_COLORS[day.level],
                border: `1px solid rgba(249, 115, 22, 0.1)`,
                cursor: 'pointer',
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                boxShadow:
                  isHovered && day.level > 0 ? `0 0 6px ${HEAT_COLORS[day.level]}` : 'none',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              }}
            />
          );
        })}
      </div>

      {/* Tooltip */}
      <div style={{ minHeight: '20px', marginTop: '8px' }}>
        {hoveredDay ? (
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              color: theme.colors.text.tertiary,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                color: theme.colors.primary[400],
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              {formatDate(hoveredDay.date)}
            </span>
            {' — '}
            {hoveredDay.count > 0 ? `${hoveredDay.count} habits completed` : 'No activity'}
          </p>
        ) : (
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: theme.colors.text.muted,
              textAlign: 'center',
            }}
          >
            Last 30 days · Hover to inspect
          </p>
        )}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '3px',
          marginTop: '4px',
        }}
      >
        <span style={{ fontSize: '10px', color: theme.colors.text.muted }}>Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '2px',
              background: HEAT_COLORS[level],
              border: `1px solid rgba(249, 115, 22, 0.12)`,
            }}
          />
        ))}
        <span style={{ fontSize: '10px', color: theme.colors.text.muted }}>More</span>
      </div>
    </div>
  );
};
