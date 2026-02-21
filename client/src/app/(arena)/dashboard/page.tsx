import { theme } from '@/styles/theme';

export default function DashboardPage() {
  return (
    <div>
      <h1
        style={{
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          fontFamily: theme.typography.fontFamily.display,
          color: theme.colors.text.primary,
          margin: '0 0 6px 0',
        }}
      >
        Welcome back, Warrior
      </h1>
      <p
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text.tertiary,
          margin: 0,
        }}
      >
        Your arena awaits. Let&apos;s build something today.
      </p>
    </div>
  );
}
