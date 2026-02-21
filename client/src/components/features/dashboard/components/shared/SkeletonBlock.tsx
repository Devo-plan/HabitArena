import { theme } from '@/styles/theme';

interface SkeletonBlockProps {
  height: string;
  width?: string;
  className?: string;
  borderRadius?: string;
}

export const SkeletonBlock = ({
  height,
  width = '100%',
  className = '',
  borderRadius = theme.borderRadius.lg,
}: SkeletonBlockProps) => (
  <div
    className={`animate-pulse ${className}`}
    style={{
      height,
      width,
      borderRadius,
      background: theme.colors.background.tertiary,
      flexShrink: 0,
    }}
  />
);
