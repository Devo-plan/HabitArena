'use client';

import { useState, useEffect } from 'react';
import type { DashboardSquadFeedItem, DashboardProof } from '@/shared/types/dashboard.types';
import { dashboardService } from '@/components/features/dashboard/services/dashboard.services';

export interface UseDashboardSquadReturn {
  feed: DashboardSquadFeedItem[];
  proofs: DashboardProof[];
  isLoading: boolean;
}

export const useDashboardSquad = (): UseDashboardSquadReturn => {
  const [feed, setFeed] = useState<DashboardSquadFeedItem[]>([]);
  const [proofs, setProofs] = useState<DashboardProof[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [feedData, proofsData] = await Promise.all([
        dashboardService.getSquadFeed(),
        dashboardService.getProofs(),
      ]);
      setFeed(feedData);
      setProofs(proofsData);
      setIsLoading(false);
    };
    void load();
    // TODO: Socket.IO real-time squad activity
    // const socket = io(SOCKET_URL);
    // socket.on('squad:activity', (item: DashboardSquadFeedItem) => {
    //   setFeed((prev) => [item, ...prev].slice(0, 10));
    // });
    // return () => { socket.off('squad:activity'); socket.disconnect(); };
  }, []);

  return { feed, proofs, isLoading };
};
