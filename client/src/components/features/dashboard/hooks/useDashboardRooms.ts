'use client';

import { useState, useEffect } from 'react';
import type { DashboardRoom } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardRoomsReturn {
  rooms: DashboardRoom[];
  isLoading: boolean;
}

export const useDashboardRooms = (): UseDashboardRoomsReturn => {
  const [rooms, setRooms] = useState<DashboardRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await dashboardService.getRooms();
      setRooms(data);
      setIsLoading(false);
    };
    void load();
    // TODO: Socket.IO real-time room warrior count updates
    // const socket = io(SOCKET_URL);
    // socket.on('room:warriors_updated', ({ roomId, warriorCount }) => {
    //   setRooms((prev) => prev.map((r) => r.id === roomId ? { ...r, warriorCount } : r));
    // });
    // return () => { socket.off('room:warriors_updated'); socket.disconnect(); };
  }, []);

  return { rooms, isLoading };
};
