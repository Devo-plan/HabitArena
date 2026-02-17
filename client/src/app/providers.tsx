'use client';

import { AuthProvider } from '@/context/AuthContext';
// import { AppProvider } from '@/shared/context/AppContext'; // Uncomment when ready

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* <AppProvider> */}
        {children}
      {/* </AppProvider> */}
    </AuthProvider>
  );
}
