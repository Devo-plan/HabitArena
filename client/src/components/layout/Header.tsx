// components/shared/Header.tsx
import React from 'react';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Detect scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.xl}`,
    zIndex: theme.zIndex.fixed,
    backgroundColor: transparent && !scrolled
      ? 'transparent'
      : 'rgba(2, 6, 23, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: scrolled ? `1px solid ${theme.colors.border.primary}` : 'none',
    transition: theme.transitions.base,
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
    textDecoration: 'none',
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xl,
  };

  const mobileMenuStyles: React.CSSProperties = {
    position: 'fixed',
    top: '4rem',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.secondary,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  return (
    <>
      <header style={headerStyles}>
        {/* Logo */}
        <Link href="/" style={logoStyles}>
          <Zap size={24} color={theme.colors.primary[500]} fill={theme.colors.primary[500]} />
          <span>HabitArena</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ ...navStyles, display: 'none' }} className="desktop-nav">
          <Link
            href="/login"
            style={{
              color: theme.colors.text.tertiary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              textDecoration: 'none',
              transition: theme.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.colors.text.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.colors.text.tertiary;
            }}
          >
            Log In
          </Link>
          <Button variant="primary" size="sm">
            <Link href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
              Get Started
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: theme.colors.text.primary,
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
          className="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={mobileMenuStyles}>
          <Link
            href="/login"
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.medium,
              textDecoration: 'none',
              padding: theme.spacing.md,
            }}
          >
            Log In
          </Link>
          <Button variant="primary" fullWidth>
            <Link href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
              Get Started
            </Link>
          </Button>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: ${theme.breakpoints.md}) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
