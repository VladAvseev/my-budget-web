import type { CSSProperties, ReactNode } from 'react';
import { useThemeStyles } from '@/shared/theme';

export type VBadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface VBadgeProps {
  children?: ReactNode;
  variant?: VBadgeVariant;
  style?: CSSProperties;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized
        .split('')
        .map((char) => char + char)
        .join('')
    : normalized;
  const intValue = parseInt(full, 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export const VBadge = ({ children, variant = 'neutral', style }: VBadgeProps) => {
  const styles = useThemeStyles();

  const color = variant === 'neutral'
    ? styles.colors.textSecondary
    : variant === 'accent'
      ? styles.colors.accent
      : variant === 'success'
        ? styles.colors.success
        : variant === 'warning'
          ? styles.colors.warning
          : styles.colors.error;

  const backgroundColor = variant === 'neutral'
    ? styles.colors.bgSurface
    : variant === 'accent'
      ? styles.colors.accentLight
      : hexToRgba(color, 0.18);

  const borderColor = variant === 'neutral' ? styles.colors.border : 'transparent';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        padding: `0 ${styles.spacing.s}`,
        borderRadius: styles.radius.s,
        fontSize: styles.typography.fontSize.s,
        fontWeight: styles.typography.fontWeight.medium,
        lineHeight: styles.typography.lineHeight.tight,
        color,
        backgroundColor,
        border: `1px solid ${borderColor}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};