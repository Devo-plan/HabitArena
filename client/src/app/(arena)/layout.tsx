// (arena)/layout.tsx — Root layout for all authenticated arena routes
// Server Component — no 'use client' needed here
// SidebarProvider wraps DashboardLayout so all nested pages share sidebar state
// TODO: Add ProtectedRoute / auth guard logic here once backend is integrated

import { ReactNode } from 'react';
import { SidebarProvider } from '@/context/SidebarContext';
import { DashboardLayout } from '@/components/layout/dashboard';

interface ArenaLayoutProps {
  children: ReactNode;
}

export default function ArenaLayout({ children }: ArenaLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}
