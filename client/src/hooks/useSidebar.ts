import { useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  // Throws in both development and production — misconfigured provider tree
  // should never reach users, so a hard error is appropriate here
  if (!context) {
    throw new Error(
      'useSidebar must be used within a <SidebarProvider>. ' +
        'Ensure (arena)/layout.tsx wraps children with <SidebarProvider>.'
    );
  }

  return context;
};
