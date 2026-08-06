import { useThemeStyles } from '@/shared/theme';
import type { HTMLAttributes, ReactNode } from 'react';

export interface VCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const VCard = ({ children, style, ...rest }: VCardProps) => {
  const styles = useThemeStyles();

  return (
    <div
      style={{
        backgroundColor: styles.colors.bgSurface,
        borderRadius: styles.radius.l,
        boxShadow: styles.shadow.m,
        padding: styles.spacing.m,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
