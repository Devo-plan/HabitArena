// app/register/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// HabitArena — Register Page (Premium Redesign)
// ─────────────────────────────────────────────────────────────────────────────
//
// Layout:
//   Desktop (lg+) → Split: Left branding panel (44%) + Right form panel (56%)
//   Mobile        → Full-screen centered form (left panel hidden)
//
// All original logic, hooks, and validation are 100% preserved.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import React, { useRef, type JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/styles/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { registerSchema, type RegisterFormData } from '@/utils/validations/auth.schema';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/api/auth.api';
import { extractUserFromToken } from '@/services/auth.service';
import type { AuthTokens } from '@/types/auth';
import {
  Mail,
  Lock,
  User,
  Flame,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Zap,
  TrendingUp,
  Trophy,
} from 'lucide-react';

// ==================== PAGE ====================

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();

  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const password = watch('password') ?? '';
  const passwordStrength = usePasswordStrength(password);

  // ── API Call ───────────────────────────────────────────────
  const submittedNameRef = useRef('');

  const registerAPI = async (data: RegisterFormData): Promise<AuthTokens> => {
    submittedNameRef.current = data.name;
    const response = await authAPI.register({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });
    return response.data;
  };

  const { submit, isLoading } = useAuthSubmit<RegisterFormData, AuthTokens>(registerAPI, {
    successMessage: 'Welcome to the arena, warrior!',
    onSuccess: (tokens) => {
      const user = extractUserFromToken(tokens.access_token, submittedNameRef.current);
      if (user) {
        login(
          tokens.access_token,
          { id: user.id, name: user.displayName, email: user.email },
          tokens.refresh_token
        );
      }
      reset();
      passwordToggle.hide();
      confirmPasswordToggle.hide();
      router.push('/dashboard');
    },
    onError: () => {},
  });

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      {/* Left panel — desktop only */}
      <LeftBrandingPanel />

      {/* Right form panel */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-10 relative"
        style={{ minHeight: '100vh' }}
      >
        <RightPanelGlow />

        <div className="w-full max-w-sm relative z-10">
          {/* Logo — mobile only */}
          <MobileLogo />

          {/* Form header */}
          <div className="mb-6">
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight mb-1.5"
              style={{ color: theme.colors.text.primary }}
            >
              Create your{' '}
              <span
                style={{
                  background: theme.colors.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                account
              </span>
            </h2>
            <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
              Join 127K+ warriors already building elite habits.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="space-y-4">
              {/* Name */}
              <Input
                {...register('name')}
                type="text"
                label="Warrior Name"
                placeholder="Your display name"
                leftIcon={<User size={16} />}
                error={errors.name?.message}
                autoComplete="name"
                disabled={isLoading}
              />

              {/* Email */}
              <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="you@email.com"
                leftIcon={<Mail size={16} />}
                error={errors.email?.message}
                autoComplete="email"
                disabled={isLoading}
              />

              {/* Password + strength */}
              <div>
                <Input
                  {...register('password')}
                  type={passwordToggle.inputType}
                  label="Password"
                  placeholder="Create a strong password"
                  leftIcon={<Lock size={16} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={passwordToggle.toggle}
                      disabled={isLoading}
                      className="transition-colors hover:text-white cursor-pointer"
                      aria-label={passwordToggle.showPassword ? 'Hide' : 'Show'}
                    >
                      {passwordToggle.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                  error={errors.password?.message}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                {password.length > 0 && !errors.password && (
                  <PasswordStrengthBar
                    strength={passwordStrength.strength}
                    color={passwordStrength.color}
                    label={passwordStrength.strength}
                  />
                )}
              </div>

              {/* Confirm password */}
              <Input
                {...register('confirmPassword')}
                type={confirmPasswordToggle.inputType}
                label="Confirm Password"
                placeholder="Re-enter your password"
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={confirmPasswordToggle.toggle}
                    disabled={isLoading}
                    className="transition-colors hover:text-white cursor-pointer"
                    aria-label={confirmPasswordToggle.showPassword ? 'Hide' : 'Show'}
                  >
                    {confirmPasswordToggle.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
                disabled={isLoading}
              />

              {/* CTA */}
              <div style={{ paddingTop: '4px' }}>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  rightIcon={
                    isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ArrowRight size={18} />
                    )
                  }
                >
                  {isLoading ? 'Creating Account...' : 'Enter the Arena'}
                </Button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border.primary }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: theme.colors.text.muted }}
            >
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border.primary }} />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <SocialButton icon={<GoogleIcon />} label="Google" disabled={isLoading} />
            <SocialButton icon={<DiscordIcon />} label="Discord" disabled={isLoading} />
          </div>

          {/* Login link */}
          <p className="text-center mt-6 text-sm" style={{ color: theme.colors.text.tertiary }}>
            Already a warrior?{' '}
            <Link
              href="/login"
              className="font-bold transition-colors"
              style={{ color: theme.colors.primary[500] }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = theme.colors.primary[400];
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = theme.colors.primary[500];
              }}
              tabIndex={isLoading ? -1 : 0}
            >
              Sign In
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mt-5">
            <TrustBadge
              icon={<Shield size={13} style={{ color: theme.colors.accent.steel }} />}
              label="256-bit Encrypted"
            />
            <TrustBadge
              icon={<Flame size={13} style={{ color: theme.colors.primary[500] }} />}
              label="127K+ Warriors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== LEFT BRANDING PANEL ====================
//
// Desktop-only split panel.
// Contains: logo, headline, 3 feature rows, stats bar at bottom.

const LeftBrandingPanel: React.FC = (): JSX.Element => {
  const features: Array<{ icon: JSX.Element; title: string; desc: string }> = [
    {
      icon: <Zap size={15} />,
      title: 'Live Ritual Rooms',
      desc: 'Co-work with warriors in real-time sessions',
    },
    {
      icon: <TrendingUp size={15} />,
      title: 'Momentum Tracking',
      desc: 'Visual streaks that build your identity',
    },
    {
      icon: <Trophy size={15} />,
      title: 'Seasonal Challenges',
      desc: 'Compete in ranked public competitions',
    },
  ];

  const stats: Array<{ value: string; label: string }> = [
    { value: '127K+', label: 'Warriors' },
    { value: '2.4M', label: 'Streaks' },
    { value: '94%', label: 'Retention' },
  ];

  return (
    <div
      className="hidden lg:flex flex-col justify-between px-12 py-10 relative overflow-hidden shrink-0"
      style={{
        width: '44%',
        minWidth: '420px',
        // Deep dark with warm purple undertone — distinct from right panel
        background: 'linear-gradient(150deg, #09090f 0%, #0d0a1a 50%, #09101b 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Ambient glow: top-left purple */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px',
          left: '-80px',
          width: '450px',
          height: '450px',
          background: `radial-gradient(circle, ${theme.colors.primary[600]}18 0%, transparent 65%)`,
          filter: 'blur(70px)',
        }}
      />

      {/* Ambient glow: bottom-right blue */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-80px',
          right: '-60px',
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${theme.colors.secondary[600]}12 0%, transparent 65%)`,
          filter: 'blur(70px)',
        }}
      />

      {/* Dot grid texture — adds premium depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── TOP SECTION ── */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-14">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              background: theme.colors.gradients.primary,
              boxShadow: `0 4px 20px ${theme.colors.primary[600]}50`,
            }}
          >
            <Flame size={22} color="white" />
          </div>
          <span
            className="text-xl font-black uppercase tracking-widest"
            style={{ color: theme.colors.text.primary }}
          >
            HabitArena
          </span>
        </div>

        {/* Headline */}
        <div className="mb-12">
          <h1
            className="font-black leading-tight mb-4"
            style={{
              color: theme.colors.text.primary,
              fontSize: 'clamp(1.75rem, 2.5vw, 2.4rem)',
            }}
          >
            Turn discipline
            <br />
            into your{' '}
            <span
              style={{
                background: theme.colors.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              superpower.
            </span>
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: theme.colors.text.muted, maxWidth: '300px' }}
          >
            The competitive arena where habits become rivalries, streaks become status, and
            consistency becomes identity.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-5">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              {/* Icon pill */}
              <div
                className="shrink-0 p-2 rounded-lg mt-0.5"
                style={{
                  background: `${theme.colors.primary[600]}18`,
                  border: `1px solid ${theme.colors.primary[600]}30`,
                  color: theme.colors.primary[400],
                }}
              >
                {feature.icon}
              </div>
              {/* Text */}
              <div>
                <p
                  className="text-sm font-semibold mb-0.5"
                  style={{ color: theme.colors.text.primary }}
                >
                  {feature.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: theme.colors.text.muted }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Stats bar ── */}
      <div
        className="relative z-10 grid grid-cols-3 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-4"
            style={{
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <span
              className="text-xl font-black mb-0.5"
              style={{
                background: theme.colors.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </span>
            <span className="text-xs font-medium" style={{ color: theme.colors.text.muted }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== MOBILE LOGO ====================
// Shown only on mobile (< lg) since left panel is hidden

const MobileLogo: React.FC = (): JSX.Element => (
  <div className="flex lg:hidden items-center justify-center gap-2.5 mb-8">
    <div
      className="p-2 rounded-xl"
      style={{
        background: theme.colors.gradients.primary,
        boxShadow: `0 4px 18px ${theme.colors.primary[600]}45`,
      }}
    >
      <Flame size={20} color="white" />
    </div>
    <span
      className="text-lg font-black uppercase tracking-widest"
      style={{ color: theme.colors.text.primary }}
    >
      HabitArena
    </span>
  </div>
);

// ==================== RIGHT PANEL AMBIENT GLOW ====================
// Subtle ambient glows behind the form — non-distracting, adds depth

const RightPanelGlow: React.FC = (): JSX.Element => (
  <>
    {/* Top-center faint glow */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        width: '500px',
        height: '400px',
        background: `radial-gradient(circle, ${theme.colors.primary[600]}0e 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
    />
    {/* Bottom-right faint glow */}
    <div
      className="absolute bottom-0 right-0 pointer-events-none"
      style={{
        width: '350px',
        height: '350px',
        background: `radial-gradient(circle, ${theme.colors.secondary[600]}0a 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
    />
  </>
);

// ==================== PASSWORD STRENGTH BAR ====================
//
// 3-segment segmented bar (not a single fill bar)
// Each segment lights up based on strength level

interface PasswordStrengthBarProps {
  strength: string;
  color: string;
  label: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  strength,
  color,
  label,
}): JSX.Element => {
  // How many segments to fill based on strength
  const filledSegments = strength === 'strong' ? 3 : strength === 'medium' ? 2 : 1;

  return (
    <div className="mt-2.5">
      {/* 3-segment bar */}
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3].map((seg) => (
          <div
            key={seg}
            className="flex-1 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: seg <= filledSegments ? color : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: theme.colors.text.muted }}>
          Password strength
        </span>
        <span className="text-xs font-bold capitalize" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// ==================== SOCIAL BUTTON ====================
//
// Reusable social login button used for Google + Discord

interface SocialButtonProps {
  icon: JSX.Element;
  label: string;
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  disabled = false,
}): JSX.Element => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '10px 16px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 200ms ease',
        // Border changes on hover for subtle interactivity
        border: `1.5px solid ${isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
        background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        color: theme.colors.text.secondary,
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// ==================== TRUST BADGE ====================

interface TrustBadgeProps {
  icon: JSX.Element;
  label: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, label }): JSX.Element => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-xs font-medium" style={{ color: theme.colors.text.muted }}>
      {label}
    </span>
  </div>
);

// ==================== BRAND ICONS ====================
// Inline SVG icons for Google and Discord
// Using real brand colors for recognition

const GoogleIcon: React.FC = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const DiscordIcon: React.FC = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.02.014.04.028.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);
