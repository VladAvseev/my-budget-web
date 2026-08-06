import type { CSSProperties, ReactNode } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { hexToRgba } from '@/shared/utils';

export type VBadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface VBadgeProps {
  children?: ReactNode;
  variant?: VBadgeVariant;
  style?: CSSProperties;
}

const FADED_ALPHA = 0.18;

export const VBadge = ({ children, variant = 'neutral', style }: VBadgeProps) => {
  const styles = useThemeStyles();

  const variantStyles: Record<
    VBadgeVariant,
    { color: string; backgroundColor: string; borderColor: string }
  > = {
    neutral: {
      color: styles.colors.textSecondary,
      backgroundColor: styles.colors.bgSurface,
      borderColor: styles.colors.border,
    },
    accent: {
      color: styles.colors.accent,
      backgroundColor: styles.colors.accentLight,
      borderColor: 'transparent',
    },
    success: {
      color: styles.colors.success,
      backgroundColor: hexToRgba(styles.colors.success, FADED_ALPHA),
      borderColor: 'transparent',
    },
    warning: {
      color: styles.colors.warning,
      backgroundColor: hexToRgba(styles.colors.warning, FADED_ALPHA),
      borderColor: 'transparent',
    },
    danger: {
      color: styles.colors.error,
      backgroundColor: hexToRgba(styles.colors.error, FADED_ALPHA),
      borderColor: 'transparent',
    },
  };

  const { color, backgroundColor, borderColor } = variantStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        padding: `${styles.spacing.xs} ${styles.spacing.s}`,
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