import '@/styles/globals.css';
import { Providers } from '@/app/providers'; // <--- The new wrapper
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HabitArena',
  description: 'Social habit-building platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
