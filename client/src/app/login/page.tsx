// app/login/page.tsx
// Login page with proper TypeScript types - no any, undefined, or null

'use client';

import React, { type JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Added for redirect
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/styles/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { loginSchema, type LoginFormData } from '@/utils/validations/auth.schema';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { useAuth } from '@/context/AuthContext';
import { login as loginAPI, type AuthResponse } from '@/api/auth.api';
import {
  Mail,
  Lock,
  Flame,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Swords,
  Target,
  BicepsFlexed,
} from 'lucide-react';

// ==================== COMPONENT ====================

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth(); // Destructure login function

  // ==================== CUSTOM HOOKS ====================

  const {
    showPassword,
    toggle: togglePassword,
    inputType,
    hide: hidePassword,
  } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  // ── Form Submission ────────────────────────────────────────
  const { submit, isLoading } = useAuthSubmit<LoginFormData, AuthResponse>(
    async (data) => {
      // Call the real auth API
      return await loginAPI(data.email, data.password);
    },
    {
      successMessage: 'Welcome back, warrior! 🔥',
      onSuccess: (response) => {
        login(response.token, response.user);
        reset();
        hidePassword();
        router.push('/dashboard');
      },
      onError: () => {
        // Toast error handling managed internally by useAuthSubmit
      },
    }
  );

  // ==================== RENDER ====================

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      <BackgroundEffects />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <Flame size={28} className="sm:w-8 sm:h-8" style={{ color: theme.colors.primary[500] }} />
          <h1
            className="text-xl sm:text-2xl font-black uppercase"
            style={{ color: theme.colors.text.primary }}
          >
            HabitArena
          </h1>
        </div>

        <Card variant="elevated" padding="xl" className="sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2
              className="text-2xl sm:text-3xl font-black mb-2 uppercase tracking-tight"
              style={{ color: theme.colors.text.primary }}
            >
              Welcome{' '}
              <span
                style={{
                  background: theme.colors.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Back
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: theme.colors.text.tertiary }}>
              Continue your winning streak. The arena awaits.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)} className="space-y-5 sm:space-y-6">
            {/* Email Input */}
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="your@email.com"
              leftIcon={<Mail size={18} className="sm:w-5 sm:h-5" />}
              error={errors.email?.message}
              autoComplete="email"
              disabled={isLoading}
            />

            {/* Password Input */}
            <div>
              <Input
                {...register('password')}
                type={inputType}
                label="Password"
                placeholder="Enter your password"
                leftIcon={<Lock size={18} className="sm:w-5 sm:h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="cursor-pointer transition-colors hover:text-white"
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <Eye size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                autoComplete="current-password"
                disabled={isLoading}
              />

              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm font-semibold transition-colors inline-block"
                  style={{ color: theme.colors.primary[500] }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.color = theme.colors.primary[400];
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.color = theme.colors.primary[500];
                  }}
                  tabIndex={isLoading ? -1 : 0}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              disabled={isLoading}
              rightIcon={
                isLoading ? (
                  <Loader2 size={18} className="animate-spin sm:w-5 sm:h-5" />
                ) : (
                  <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                )
              }
            >
              {isLoading ? 'Entering Arena...' : 'Enter Arena'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div
              className="absolute inset-0 flex items-center"
              style={{ borderTop: `1px solid ${theme.colors.border.primary}` }}
            />
            <div className="relative flex justify-center">
              <span
                className="px-3 sm:px-4 text-xs sm:text-sm font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: theme.colors.background.secondary,
                  color: theme.colors.text.muted,
                }}
              >
                Or
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="secondary" size="md" fullWidth disabled={isLoading}>
              <span className="text-sm sm:text-base">Continue with Google</span>
            </Button>
            <Button variant="secondary" size="md" fullWidth disabled={isLoading}>
              <span className="text-sm sm:text-base">Continue with Discord</span>
            </Button>
          </div>

          {/* Register Link */}
          <p
            className="text-center mt-6 sm:mt-8 text-xs sm:text-sm"
            style={{ color: theme.colors.text.tertiary }}
          >
            New warrior?{' '}
            <Link
              href="/register"
              className="font-bold transition-colors inline-block"
              style={{ color: theme.colors.primary[500] }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = theme.colors.primary[400];
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = theme.colors.primary[500];
              }}
              tabIndex={isLoading ? -1 : 0}
            >
              Join the Arena
            </Link>
          </p>
        </Card>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="flex items-center gap-2">
            <Shield
              size={14}
              className="sm:w-4 sm:h-4"
              style={{ color: theme.colors.accent.steel }}
            />
            <span className="text-xs font-semibold" style={{ color: theme.colors.text.muted }}>
              Secure Login
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Flame
              size={14}
              className="sm:w-4 sm:h-4"
              style={{ color: theme.colors.primary[500] }}
            />
            <span className="text-xs font-semibold" style={{ color: theme.colors.text.muted }}>
              127K+ Active
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

// ==================== BACKGROUND EFFECTS ====================

const BackgroundEffects: React.FC = (): JSX.Element => {
  return (
    <>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${theme.colors.primary[600]}20 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${theme.colors.secondary[600]}15 0%, transparent 70%)`,
          filter: 'blur(120px)',
        }}
      />
    </>
  );
};
