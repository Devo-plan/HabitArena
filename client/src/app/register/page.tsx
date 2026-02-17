// app/register/page.tsx
// Register page with proper TypeScript types - no any, undefined, or null

'use client';

import React, { type JSX } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/styles/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { registerSchema, type RegisterFormData } from '@/utils/validations/auth.schema';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { useAuthSubmit } from '@/hooks/useAuthSubmit';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { Mail, Lock, User, Flame, Shield, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

// ==================== TYPES ====================

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// ==================== COMPONENT ====================

export default function RegisterPage(): JSX.Element {
  // ==================== CUSTOM HOOKS ====================

  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password') ?? '';
  const passwordStrength = usePasswordStrength(password);

  // ==================== API CALL ====================

  const registerAPI = async (data: RegisterFormData): Promise<RegisterResponse> => {
    // Simulate API delay
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Registration failed');
    // return response.json();

    console.log('Register data:', data);

    return {
      token: 'mock-jwt-token',
      user: {
        id: '123',
        email: data.email,
        name: data.name,
      },
    };
  };

  // ==================== FORM SUBMISSION ====================

  const { submit, isLoading } = useAuthSubmit<RegisterFormData, RegisterResponse>(registerAPI, {
    successMessage: 'Registration successful! Welcome to the arena, warrior! 🔥',
    onSuccess: () => {
      reset();
      passwordToggle.hide();
      confirmPasswordToggle.hide();
      // TODO: Redirect to dashboard
      // router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

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
              Join the{' '}
              <span
                style={{
                  background: theme.colors.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Arena
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: theme.colors.text.tertiary }}>
              Build habits like a warrior. Compete with the best.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)} className="space-y-5 sm:space-y-6">
            {/* Name Input */}
            <Input
              {...register('name')}
              type="text"
              label="Warrior Name"
              placeholder="Enter your name"
              leftIcon={<User size={18} className="sm:w-5 sm:h-5" />}
              error={errors.name?.message}
              autoComplete="name"
              disabled={isLoading}
            />

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

            {/* Password Input with Strength Indicator */}
            <div>
              <Input
                {...register('password')}
                type={passwordToggle.inputType}
                label="Password"
                placeholder="Create a strong password"
                leftIcon={<Lock size={18} className="sm:w-5 sm:h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={passwordToggle.toggle}
                    className="cursor-pointer transition-colors hover:text-white"
                    disabled={isLoading}
                    aria-label={passwordToggle.showPassword ? 'Hide password' : 'Show password'}
                  >
                    {passwordToggle.showPassword ? (
                      <EyeOff size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <Eye size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                }
                error={errors.password?.message}
                autoComplete="new-password"
                disabled={isLoading}
              />

              {/* Password Strength Indicator */}
              {password.length > 0 && !errors.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: theme.colors.text.muted }}
                    >
                      Password Strength
                    </span>
                    <span className="text-xs font-bold" style={{ color: passwordStrength.color }}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.colors.background.tertiary }}
                  >
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <Input
              {...register('confirmPassword')}
              type={confirmPasswordToggle.inputType}
              label="Confirm Password"
              placeholder="Re-enter your password"
              leftIcon={<Lock size={18} className="sm:w-5 sm:h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={confirmPasswordToggle.toggle}
                  className="cursor-pointer transition-colors hover:text-white"
                  disabled={isLoading}
                  aria-label={
                    confirmPasswordToggle.showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {confirmPasswordToggle.showPassword ? (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              }
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isLoading}
            />

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
              {isLoading ? 'Creating Account...' : 'Enter the Arena'}
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

          {/* Login Link */}
          <p
            className="text-center mt-6 sm:mt-8 text-xs sm:text-sm"
            style={{ color: theme.colors.text.tertiary }}
          >
            Already a warrior?{' '}
            <Link
              href="/login"
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
              Log In
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
              Encrypted
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Flame
              size={14}
              className="sm:w-4 sm:h-4"
              style={{ color: theme.colors.primary[500] }}
            />
            <span className="text-xs font-semibold" style={{ color: theme.colors.text.muted }}>
              127K+ Warriors
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
