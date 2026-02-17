import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>HabitArena</h1>
      <p>Social habit-building platform</p>
      <nav style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </main>
  );
}
