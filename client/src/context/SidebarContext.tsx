'use client';

import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { SIDEBAR } from '@/shared/constants/app.constants';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  isMobile: boolean;
}

// null default — useSidebar will throw if consumed outside SidebarProvider
export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // FIX: Initial check runs immediately (no debounce needed on mount)
    const applyMobile = (mobile: boolean) => {
      setIsMobile(mobile);
      // Auto-dismiss mobile overlay when viewport grows to desktop
      if (!mobile) setIsMobileOpen(false);
    };

    applyMobile(window.innerWidth < SIDEBAR.MOBILE_BREAKPOINT);

    // FIX: Debounced resize handler — 150ms window prevents excessive updates
    let debounceTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyMobile(window.innerWidth < SIDEBAR.MOBILE_BREAKPOINT);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);

  const toggleCollapse = useCallback(() => setIsCollapsed((p) => !p), []);
  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleCollapse, isMobileOpen, openMobile, closeMobile, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
