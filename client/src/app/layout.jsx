import '@/app/globals.css';

export const metadata = {
  title: 'HabitArena',
  description: 'Social habit-building platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
