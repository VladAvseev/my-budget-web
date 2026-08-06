import type { HTMLAttributes } from 'react';
import { useThemeStyles } from '@/shared/theme';

export type VCardProps = HTMLAttributes<HTMLDivElement>;

export const VCard = ({ children, style, ...rest }: VCardProps) => {
  const styles = useThemeStyles();

  return (
    <div
      style={{
        backgroundColor: styles.colors.bgSurface,
        borderRadius: styles.radius.l,
        boxShadow: styles.shadow.m,
        border: `1px solid ${styles.colors.border}`,
        overflow: 'hidden',
        padding: styles.spacing.m,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};