// app/register/page.tsx
// Add reset() after successful submission

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { theme } from '@/styles/theme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { registerSchema, type RegisterFormData } from '@/utils/validations/auth.schema';
import { Mail, Lock, User, Flame, Shield, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ==================== FORM SETUP ====================
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset, // ✅ ADD THIS
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Watch password for strength indicator
  const password = watch('password');

  // ==================== PASSWORD STRENGTH ====================
  const getPasswordStrength = (pass: string): { strength: string; color: string; width: string } => {
    if (!pass) return { strength: '', color: '', width: '0%' };
    
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    if (strength <= 2) return { strength: 'Weak', color: theme.colors.secondary[500], width: '33%' };
    if (strength <= 3) return { strength: 'Medium', color: theme.colors.accent.gold, width: '66%' };
    return { strength: 'Strong', color: theme.colors.accent.emerald, width: '100%' };
  };

  const passwordStrength = getPasswordStrength(password);

  // ==================== FORM SUBMISSION ====================
  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      // const response = await authAPI.register(data);
      // localStorage.setItem('token', response.token);
      // router.push('/dashboard');
      
      toast.success('Registration successful! Welcome to the arena, warrior! 🔥');
      console.log('Register data:', data);
      
      // ✅ RESET FORM AFTER SUCCESS
      reset();
      setShowPassword(false); // Also hide passwords
      setShowConfirmPassword(false);
      
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast.error(message);
      console.error('Register error:', error);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden"
      style={{
        backgroundColor: theme.colors.background.primary,
      }}
    >
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Registration Card */}
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

        {/* Card */}
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
            <p
              className="text-sm sm:text-base"
              style={{ color: theme.colors.text.tertiary }}
            >
              Build habits like a warrior. Compete with the best.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Name Input */}
            <Input
              {...register('name')}
              type="text"
              label="Warrior Name"
              placeholder="Enter your name"
              leftIcon={<User size={18} className="sm:w-5 sm:h-5" />}
              error={errors.name?.message}
              autoComplete="name"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />

            {/* Password Input */}
            <div>
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Create a strong password"
                leftIcon={<Lock size={18} className="sm:w-5 sm:h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer transition-colors hover:text-white"
                    disabled={isSubmitting}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                  </button>
                }
                error={errors.password?.message}
                autoComplete="new-password"
                disabled={isSubmitting}
              />

              {/* Password Strength Indicator */}
              {password && !errors.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold" style={{ color: theme.colors.text.muted }}>
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
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Re-enter your password"
              leftIcon={<Lock size={18} className="sm:w-5 sm:h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer transition-colors hover:text-white"
                  disabled={isSubmitting}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              }
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isSubmitting}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              rightIcon={isSubmitting ? <Loader2 size={18} className="animate-spin sm:w-5 sm:h-5" /> : <ArrowRight size={18} className="sm:w-5 sm:h-5" />}
            >
              {isSubmitting ? 'Creating Account...' : 'Enter the Arena'}
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
            <Button variant="secondary" size="md" fullWidth disabled={isSubmitting}>
              <span className="text-sm sm:text-base">Continue with Google</span>
            </Button>
            <Button variant="secondary" size="md" fullWidth disabled={isSubmitting}>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.primary[400];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.primary[500];
              }}
              tabIndex={isSubmitting ? -1 : 0}
            >
              Log In
            </Link>
          </p>
        </Card>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="flex items-center gap-2">
            <Shield size={14} className="sm:w-4 sm:h-4" style={{ color: theme.colors.accent.steel }} />
            <span
              className="text-xs font-semibold"
              style={{ color: theme.colors.text.muted }}
            >
              Encrypted
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={14} className="sm:w-4 sm:h-4" style={{ color: theme.colors.primary[500] }} />
            <span
              className="text-xs font-semibold"
              style={{ color: theme.colors.text.muted }}
            >
              127K+ Warriors
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

// ==================== BACKGROUND EFFECTS ====================
const BackgroundEffects: React.FC = () => {
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
