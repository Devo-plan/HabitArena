// app/layout.tsx
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { theme } from '@/styles/theme';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'HabitArena - Build Habits Like a Warrior',
  description:
    'Join live ritual rooms, compete in seasonal leagues, and stake money on your streaks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme.colors.background.secondary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border.secondary}`,
              borderRadius: theme.borderRadius.lg,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
            },
            success: {
              iconTheme: {
                primary: theme.colors.accent.emerald,
                secondary: theme.colors.text.primary,
              },
              style: {
                border: `1px solid ${theme.colors.accent.emerald}`,
              },
            },
            error: {
              iconTheme: {
                primary: theme.colors.secondary[500],
                secondary: theme.colors.text.primary,
              },
              style: {
                border: `1px solid ${theme.colors.secondary[500]}`,
              },
            },
            loading: {
              iconTheme: {
                primary: theme.colors.primary[500],
                secondary: theme.colors.text.primary,
              },
            },
          }}
        />
      </body>
    </html>
  );
}
