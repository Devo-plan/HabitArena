'use client';

import React from 'react';
import { theme } from '@/styles/theme';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Trophy,
  Target,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Sparkles,
  Flame,
  Swords,
  Eye,
  Timer,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundColor: theme.colors.background.primary,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.primary,
      }}
    >
      {/* Competitive Background Effects */}
      <ArenaBackgroundEffects />

      {/* Navigation */}
      <Header transparent />

      {/* Hero Section */}
      <HeroSection />

      {/* Live Activity Banner */}
      <LiveStatsSection />

      {/* Core Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== ARENA BACKGROUND EFFECTS ====================
const ArenaBackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Top Spotlight Effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: '1200px',
          height: '1000px',
          background: `radial-gradient(ellipse at top, ${theme.colors.primary[900]}25 0%, transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Left Energy Beam - Orange */}
      <div
        className="absolute top-1/4 -left-64 pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, ${theme.colors.primary[600]}15 0%, transparent 70%)`,
          filter: 'blur(120px)',
          animation: 'pulse 6s ease-in-out infinite',
        }}
      />

      {/* Right Energy Beam - Red */}
      <div
        className="absolute top-1/2 -right-64 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${theme.colors.secondary[600]}12 0%, transparent 70%)`,
          filter: 'blur(140px)',
          animation: 'pulse 7s ease-in-out infinite',
          animationDelay: '1.5s',
        }}
      />

      {/* Bottom Steel Accent */}
      <div
        className="absolute bottom-0 left-1/3 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${theme.colors.accent.steel}10 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Subtle Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Scanline Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-3"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.03);
          }
        }
      `}</style>
    </>
  );
};

// ==================== HERO SECTION ====================
const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 text-center max-w-6xl mx-auto">
      {/* Live Competition Badge */}
      <div
        className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8 animate-fade-in"
        style={{
          backgroundColor: 'rgba(249, 115, 22, 0.08)',
          border: `1.5px solid ${theme.colors.border.secondary}`,
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          fontWeight: theme.typography.fontWeight.bold,
          boxShadow: `0 0 20px ${theme.colors.primary[500]}15`,
        }}
      >
        {/* Pulsing Live Indicator */}
        <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
            style={{ backgroundColor: theme.colors.primary[500] }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3"
            style={{ backgroundColor: theme.colors.primary[500] }}
          />
        </span>
        <Flame size={14} className="sm:w-4 sm:h-4" style={{ color: theme.colors.primary[500] }} />
        <span style={{ color: theme.colors.primary[400] }}>2,847 WARRIORS COMPETING NOW</span>
      </div>

      {/* Main Headline */}
      <h1
        className="mb-4 sm:mb-6 px-2 sm:px-4"
        style={{
          fontSize: 'clamp(2rem, 8vw, 6rem)',
          fontWeight: theme.typography.fontWeight.black,
          lineHeight: theme.typography.lineHeight.tight,
          letterSpacing: '-0.02em',
        }}
      >
        <span style={{ color: theme.colors.text.primary }}>Your Habits.</span>
        <br />
        <span
          style={{
            background: theme.colors.gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Their Arena.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-4"
        style={{
          color: theme.colors.text.tertiary,
        }}
      >
        Join{' '}
        <span style={{ color: theme.colors.primary[500], fontWeight: 700 }}>live ritual rooms</span>
        , compete in{' '}
        <span style={{ color: theme.colors.secondary[500], fontWeight: 700 }}>
          seasonal leagues
        </span>
        , and stake money on your streaks. Build habits like a warrior—not a planner.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
        <Link href="/register" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
          <Button
            variant="gradient"
            size="xl"
            rightIcon={<Swords size={20} className="sm:w-6 sm:h-6" />}
            className="shadow-xl w-full"
          >
            Enter the Arena
          </Button>
        </Link>

        <Link href="/demo" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="xl"
            leftIcon={<Play size={20} className="sm:w-6 sm:h-6" />}
            className="w-full"
          >
            Watch Battle Replay
          </Button>
        </Link>
      </div>

      {/* Product Mockup */}
      <div
        className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden relative group"
        style={{
          aspectRatio: '16/9',
          backgroundColor: theme.colors.background.secondary,
          border: `1px solid ${theme.colors.border.secondary}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Coming Soon Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.background.secondary}f5, ${theme.colors.background.tertiary}f5)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="mb-4 sm:mb-6" style={{ position: 'relative', display: 'inline-block' }}>
            <Sparkles
              size={48}
              className="animate-pulse sm:w-16 sm:h-16"
              style={{ color: theme.colors.primary[500] }}
            />
            <div
              className="absolute inset-0 blur-xl"
              style={{
                background: `radial-gradient(circle, ${theme.colors.primary[500]}25, transparent)`,
              }}
            />
          </div>

          <h3
            className="text-xl sm:text-2xl md:text-3xl font-black mb-2 uppercase tracking-wider text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Arena Dashboard
          </h3>
          <p
            className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest"
            style={{ color: theme.colors.primary[500] }}
          >
            Coming Soon
          </p>

          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{
              background: theme.colors.gradients.primary,
              animation: 'shimmer 2s infinite',
              boxShadow: `0 0 10px ${theme.colors.primary[500]}30`,
            }}
          />
        </div>

        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${theme.colors.border.primary} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.colors.border.primary} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Corner Accents */}
        <div
          className="absolute top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 opacity-15"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[500]} 0%, transparent 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-20 sm:w-32 h-20 sm:h-32 opacity-15"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${theme.colors.secondary[500]} 100%)`,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          }}
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%);
            opacity: 0.3;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

// ==================== LIVE STATS SECTION ====================
const LiveStatsSection: React.FC = () => {
  const stats = [
    {
      value: '127K+',
      label: 'Warriors Active',
      icon: <Users size={18} className="sm:w-5 sm:h-5" />,
      color: theme.colors.primary[500],
    },
    {
      value: '8.9M+',
      label: 'Rituals Completed',
      icon: <Target size={18} className="sm:w-5 sm:h-5" />,
      color: theme.colors.accent.steel,
    },
    {
      value: '94%',
      label: 'Streak Success',
      icon: <TrendingUp size={18} className="sm:w-5 sm:h-5" />,
      color: theme.colors.accent.emerald,
    },
    {
      value: '$4.7M+',
      label: 'Stakes Won',
      icon: <Trophy size={18} className="sm:w-5 sm:h-5" />,
      color: theme.colors.accent.gold,
    },
  ];

  return (
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group cursor-default relative p-3 sm:p-4 md:p-6 transition-all"
            style={{
              backgroundColor: theme.colors.background.card,
              border: `1px solid ${theme.colors.border.primary}`,
              borderRadius: theme.borderRadius.lg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = stat.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 0 30px ${stat.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.colors.border.primary;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Icon */}
            <div
              className="flex justify-center mb-2 sm:mb-3 transition-all"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </div>

            {/* Value */}
            <div
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2"
              style={{
                color: theme.colors.text.primary,
                textShadow: `0 0 20px ${stat.color}30`,
              }}
            >
              {stat.value}
            </div>

            {/* Label */}
            <div
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
              style={{ color: theme.colors.text.tertiary }}
            >
              {stat.label}
            </div>

            {/* Hover Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl"
              style={{
                background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== FEATURES SECTION ====================
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Users size={28} className="sm:w-8 sm:h-8" />,
      title: 'Live Ritual Rooms',
      description:
        'Join co-working sessions with live presence. See rivals grinding in real-time. Stay focused together.',
      color: theme.colors.primary[500],
      badge: 'LIVE',
    },
    {
      icon: <Trophy size={28} className="sm:w-8 sm:h-8" />,
      title: 'Seasonal Leagues',
      description:
        '30-day competitions. Climb ranks, earn XP, unlock exclusive badges. Top warriors get glory.',
      color: theme.colors.accent.gold,
      badge: 'COMPETE',
    },
    {
      icon: <Flame size={28} className="sm:w-8 sm:h-8" />,
      title: 'Streak Stakes',
      description:
        'Bet money on your discipline. Complete your ritual or lose your stake to charity. High stakes, high commitment.',
      color: theme.colors.secondary[500],
      badge: 'RISKY',
    },
    {
      icon: <Eye size={28} className="sm:w-8 sm:h-8" />,
      title: 'Momentum Maps',
      description:
        'Visual streak timeline. Track your journey, share proof cards, and show rivals what consistency looks like.',
      color: theme.colors.accent.steel,
      badge: 'TRACK',
    },
    {
      icon: <Shield size={28} className="sm:w-8 sm:h-8" />,
      title: 'Anti-Cheat System',
      description:
        'GPS verification, photo proof, and community voting. Keep the arena fair. No fake warriors.',
      color: theme.colors.accent.emerald,
      badge: 'SECURE',
    },
    {
      icon: <Swords size={28} className="sm:w-8 sm:h-8" />,
      title: 'Rival Routines',
      description:
        'Follow top performers. Challenge friends. Compare streaks. Turn habits into head-to-head battles.',
      color: theme.colors.secondary[600],
      badge: 'BATTLE',
    },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div
          className="inline-block px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
          style={{
            backgroundColor: `${theme.colors.primary[500]}15`,
            border: `1px solid ${theme.colors.primary[500]}40`,
          }}
        >
          <span
            className="text-xs font-black uppercase tracking-widest"
            style={{ color: theme.colors.primary[500] }}
          >
            ARSENAL
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-tight px-2 sm:px-4"
          style={{ color: theme.colors.text.primary }}
        >
          Built for{' '}
          <span
            style={{
              background: theme.colors.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Warriors
          </span>
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-4"
          style={{ color: theme.colors.text.tertiary }}
        >
          The complete competitive habit system. No fluff, just battle-tested tools.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <Card key={index} variant="glass" hoverable className="group relative">
            {/* Badge */}
            <div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
              style={{
                backgroundColor: `${feature.color}20`,
                border: `1px solid ${feature.color}60`,
                color: feature.color,
              }}
            >
              {feature.badge}
            </div>

            {/* Icon */}
            <div
              className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit transition-transform group-hover:scale-110 group-hover:rotate-3"
              style={{
                backgroundColor: `${feature.color}15`,
                border: `2px solid ${feature.color}40`,
                boxShadow: `0 0 30px ${feature.color}20`,
              }}
            >
              <div style={{ color: feature.color }}>{feature.icon}</div>
            </div>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl font-black mb-2 sm:mb-3 uppercase tracking-tight"
              style={{ color: theme.colors.text.primary }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: theme.colors.text.tertiary }}>
              {feature.description}
            </p>

            {/* Bottom Accent Line */}
            <div
              className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
              style={{
                background: feature.color,
                boxShadow: `0 0 10px ${feature.color}`,
              }}
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

// ==================== HOW IT WORKS SECTION ====================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Battle',
      description:
        'Create your ritual, set your schedule, and optionally stake money. Join a ritual room or challenge.',
      icon: <Target size={40} className="sm:w-12 sm:h-12" />,
      color: theme.colors.primary[500],
    },
    {
      number: '02',
      title: 'Enter the Room',
      description:
        "Jump into live sessions. See who's active. Work alongside rivals. Real-time accountability.",
      icon: <Users size={40} className="sm:w-12 sm:h-12" />,
      color: theme.colors.accent.steel,
    },
    {
      number: '03',
      title: 'Submit Proof',
      description:
        'Complete your ritual and upload proof. GPS check, photo upload, or squad verification.',
      icon: <CheckCircle size={40} className="sm:w-12 sm:h-12" />,
      color: theme.colors.accent.emerald,
    },
    {
      number: '04',
      title: 'Dominate Rankings',
      description:
        'Extend streaks, climb leaderboards, earn badges. Seasonal winners get eternal glory.',
      icon: <Trophy size={40} className="sm:w-12 sm:h-12" />,
      color: theme.colors.accent.gold,
    },
  ];

  return (
    <section
      className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderTop: `2px solid ${theme.colors.border.primary}`,
        borderBottom: `2px solid ${theme.colors.border.primary}`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div
            className="inline-block px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
            style={{
              backgroundColor: `${theme.colors.accent.steel}15`,
              border: `1px solid ${theme.colors.accent.steel}40`,
            }}
          >
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: theme.colors.accent.steel }}
            >
              THE PATH
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-tight px-2 sm:px-4"
            style={{ color: theme.colors.text.primary }}
          >
            From Zero to{' '}
            <span
              style={{
                background: theme.colors.gradients.victory,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Champion
            </span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-4"
            style={{ color: theme.colors.text.tertiary }}
          >
            Four steps. No excuses. Just results.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Connection Line (Desktop Only) */}
          <div
            className="hidden lg:block absolute top-20 left-0 right-0 h-1 mx-24"
            style={{
              background: `linear-gradient(90deg, 
                ${theme.colors.primary[500]} 0%, 
                ${theme.colors.accent.steel} 33%, 
                ${theme.colors.accent.emerald} 66%, 
                ${theme.colors.accent.gold} 100%)`,
              opacity: 0.3,
            }}
          />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Step Icon Container */}
              <div
                className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 relative z-10 transition-all group-hover:scale-110"
                style={{
                  backgroundColor: theme.colors.background.tertiary,
                  border: `3px solid ${step.color}`,
                  boxShadow: `0 0 40px ${step.color}40`,
                }}
              >
                <div style={{ color: step.color }}>{step.icon}</div>

                {/* Rotating Border Effect */}
                <div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `conic-gradient(from 0deg, ${step.color}, transparent, ${step.color})`,
                    animation: 'rotate 3s linear infinite',
                    filter: 'blur(8px)',
                  }}
                />
              </div>

              {/* Step Number */}
              <div
                className="text-xs sm:text-sm font-black mb-2 sm:mb-3 uppercase tracking-widest"
                style={{
                  color: step.color,
                  textShadow: `0 0 10px ${step.color}60`,
                }}
              >
                STEP {step.number}
              </div>

              {/* Title */}
              <h3
                className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 uppercase tracking-tight px-2"
                style={{ color: theme.colors.text.primary }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm sm:text-base leading-relaxed px-2"
                style={{ color: theme.colors.text.tertiary }}
              >
                {step.description}
              </p>

              {/* Glow Effect on Hover */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-32 sm:h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${step.color}40, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rotation Animation */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

// ==================== TESTIMONIALS SECTION ====================
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Marcus Chen',
      role: 'Software Engineer',
      streak: '247 days',
      content:
        "Lost $100 to charity once because I skipped my morning workout. Never missed a session since. The stakes make it real. This isn't another todo app—it's warfare.",
      avatar: '⚔️',
      rating: 5,
      statValue: '247',
      statLabel: 'Day Streak',
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Fitness Coach',
      streak: '189 days',
      content:
        'The ritual rooms changed everything. Seeing 20 other people grinding at 5 AM creates insane accountability. My clients are obsessed with climbing the leaderboard.',
      avatar: '💪',
      rating: 5,
      statValue: '#3',
      statLabel: 'Global Rank',
    },
    {
      name: 'James Park',
      role: 'Startup Founder',
      streak: '312 days',
      content:
        'I compete against rivals who are also building companies. The public streak cards and seasonal rankings pushed me harder than any coach ever could.',
      avatar: '🚀',
      rating: 5,
      statValue: '$2.4K',
      statLabel: 'Stakes Won',
    },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div
          className="inline-block px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
          style={{
            backgroundColor: `${theme.colors.accent.gold}15`,
            border: `1px solid ${theme.colors.accent.gold}40`,
          }}
        >
          <span
            className="text-xs font-black uppercase tracking-widest"
            style={{ color: theme.colors.accent.gold }}
          >
            BATTLE STORIES
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-tight px-2 sm:px-4"
          style={{ color: theme.colors.text.primary }}
        >
          Proven in{' '}
          <span
            style={{
              background: theme.colors.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Combat
          </span>
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-4"
          style={{ color: theme.colors.text.tertiary }}
        >
          Real warriors. Real streaks. Real results.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} variant="elevated" hoverable className="flex flex-col">
            {/* Header with Avatar & Rating */}
            <div className="flex items-start justify-between mb-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl"
                style={{
                  backgroundColor: theme.colors.background.tertiary,
                  border: `2px solid ${theme.colors.primary[500]}`,
                  boxShadow: `0 0 20px ${theme.colors.primary[500]}30`,
                }}
              >
                {testimonial.avatar}
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-current sm:w-4 sm:h-4"
                    style={{ color: theme.colors.accent.gold }}
                    fill={theme.colors.accent.gold}
                  />
                ))}
              </div>
            </div>

            {/* Quote */}
            <p
              className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 grow"
              style={{ color: theme.colors.text.secondary }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Stats Badge */}
            <div
              className="flex items-center justify-between p-3 rounded-xl mb-3 sm:mb-4"
              style={{
                backgroundColor: `${theme.colors.primary[500]}10`,
                border: `1px solid ${theme.colors.primary[500]}30`,
              }}
            >
              <div>
                <div
                  className="text-xl sm:text-2xl font-black"
                  style={{ color: theme.colors.primary[500] }}
                >
                  {testimonial.statValue}
                </div>
                <div
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  {testimonial.statLabel}
                </div>
              </div>
              <Flame
                size={20}
                className="sm:w-6 sm:h-6"
                style={{ color: theme.colors.primary[500] }}
              />
            </div>

            {/* Author Info */}
            <div
              className="pt-3 sm:pt-4 border-t"
              style={{ borderColor: theme.colors.border.primary }}
            >
              <div
                className="text-sm sm:text-base font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {testimonial.name}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: theme.colors.text.tertiary }}>
                {testimonial.role}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

// ==================== FINAL CTA SECTION ====================
const CTASection: React.FC = () => {
  return (
    <section className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <Card variant="gradient" padding="2xl" className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, ${theme.colors.primary[500]} 35px, ${theme.colors.primary[500]} 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, ${theme.colors.secondary[500]} 35px, ${theme.colors.secondary[500]} 70px)
            `,
          }}
        />

        {/* Energy Beams */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${theme.colors.primary[500]}60, transparent 60%),
                        radial-gradient(ellipse at 70% 50%, ${theme.colors.secondary[500]}60, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Free Trial Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
            style={{
              backgroundColor: `${theme.colors.accent.emerald}25`,
              border: `2px solid ${theme.colors.accent.emerald}60`,
            }}
          >
            <CheckCircle
              size={16}
              className="sm:w-5 sm:h-5"
              style={{ color: theme.colors.accent.emerald }}
            />
            <span
              className="text-xs sm:text-sm font-black uppercase tracking-wider"
              style={{ color: theme.colors.accent.emerald }}
            >
              Free Arena Pass • 30 Days • No Card Required
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-tight px-2"
            style={{ color: theme.colors.text.primary }}
          >
            Stop Reading.
            <br />
            <span
              style={{
                background: theme.colors.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Start Fighting.
            </span>
          </h2>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
            style={{ color: theme.colors.text.secondary }}
          >
            Join <span style={{ color: theme.colors.primary[400], fontWeight: 700 }}>127,000+</span>{' '}
            warriors who transformed excuses into streaks. Your rivals are already inside.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link href="/register" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} className="sm:w-5 sm:h-5" />}
                className="w-full"
              >
                Claim Your Spot
              </Button>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                Talk to Champions
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 justify-center pt-6 sm:pt-8"
            style={{ borderTop: `1px solid ${theme.colors.border.primary}` }}
          >
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle
                size={18}
                className="sm:w-5 sm:h-5"
                style={{ color: theme.colors.accent.steel }}
              />
              <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: theme.colors.text.tertiary }}
              >
                Cancel Anytime
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Shield
                size={18}
                className="sm:w-5 sm:h-5"
                style={{ color: theme.colors.accent.steel }}
              />
              <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: theme.colors.text.tertiary }}
              >
                Encrypted & Secure
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Timer
                size={18}
                className="sm:w-5 sm:h-5"
                style={{ color: theme.colors.accent.steel }}
              />
              <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: theme.colors.text.tertiary }}
              >
                2 Min Setup
              </span>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div
          className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 opacity-40"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[500]} 0%, transparent 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-40"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${theme.colors.secondary[500]} 100%)`,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          }}
        />
      </Card>
    </section>
  );
};

// ==================== FOOTER ====================
const Footer: React.FC = () => {
  const footerSections = {
    arena: {
      title: 'Arena',
      links: ['Features', 'Ritual Rooms', 'Leagues', 'Pricing', 'Roadmap'],
    },
    warriors: {
      title: 'Warriors',
      links: ['Leaderboard', 'Top Streaks', 'Success Stories', 'Community', 'Challenges'],
    },
    resources: {
      title: 'Resources',
      links: ['Help Center', 'API Docs', 'Battle Guide', 'FAQ', 'Support'],
    },
    company: {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
    },
  };

  return (
    <footer
      className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 mt-16 sm:mt-24"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderTop: `2px solid ${theme.colors.border.primary}`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Footer Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame
                size={24}
                className="sm:w-7 sm:h-7"
                style={{ color: theme.colors.primary[500] }}
              />
              <span
                className="text-lg sm:text-xl font-black uppercase"
                style={{ color: theme.colors.text.primary }}
              >
                HabitArena
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4 sm:mb-6"
              style={{ color: theme.colors.text.tertiary }}
            >
              Turn habits into competitive rituals. Join the arena where discipline meets glory.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {['X', 'DC', 'YT', 'IG'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all"
                  style={{
                    backgroundColor: theme.colors.background.tertiary,
                    border: `1px solid ${theme.colors.border.primary}`,
                    color: theme.colors.text.tertiary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.primary[500];
                    e.currentTarget.style.backgroundColor = `${theme.colors.primary[500]}20`;
                    e.currentTarget.style.color = theme.colors.primary[500];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border.primary;
                    e.currentTarget.style.backgroundColor = theme.colors.background.tertiary;
                    e.currentTarget.style.color = theme.colors.text.tertiary;
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <FooterColumn key={key} title={section.title} links={section.links} />
          ))}
        </div>

        {/* Footer Bottom */}
        <div
          className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: `1px solid ${theme.colors.border.primary}` }}
        >
          <p
            className="text-xs sm:text-sm text-center md:text-left"
            style={{ color: theme.colors.text.muted }}
          >
            © 2026 HabitArena. Built for warriors, by warriors.
          </p>

          <div className="flex gap-4 sm:gap-6">
            <a
              href="#privacy"
              className="text-xs sm:text-sm transition-colors"
              style={{ color: theme.colors.text.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.text.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text.muted)}
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-xs sm:text-sm transition-colors"
              style={{ color: theme.colors.text.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.text.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text.muted)}
            >
              Terms
            </a>
            <a
              href="#security"
              className="text-xs sm:text-sm transition-colors"
              style={{ color: theme.colors.text.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.text.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text.muted)}
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== FOOTER COLUMN ====================
interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div>
      <h4
        className="text-xs sm:text-sm font-black mb-3 sm:mb-4 uppercase tracking-wider"
        style={{ color: theme.colors.text.primary }}
      >
        {title}
      </h4>
      <ul className="space-y-2 sm:space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs sm:text-sm transition-all block"
              style={{ color: theme.colors.text.tertiary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.primary[500];
                e.currentTarget.style.paddingLeft = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.text.tertiary;
                e.currentTarget.style.paddingLeft = '0';
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
