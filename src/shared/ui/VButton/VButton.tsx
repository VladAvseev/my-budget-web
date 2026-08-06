import { useState, type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VLoader } from '@/shared/ui/VLoader';

export type VButtonType = 'primary' | 'secondary' | 'danger';

export interface VButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  children?: ReactNode;
  type?: VButtonType;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const VButton = ({
  children,
  type = 'primary',
  isDisabled,
  isLoading,
  onClick,
  style,
  ...rest
}: VButtonProps) => {
  const styles = useThemeStyles();
  const [isHovered, setIsHovered] = useState(false);
  const disabled = isDisabled || isLoading;

  const backgroundColor = type === 'primary'
    ? isHovered
      ? styles.colors.accentHover
      : styles.colors.accent
    : type === 'danger'
      ? styles.colors.error
      : isHovered
        ? styles.colors.accentLight
        : 'transparent';

  const color = type === 'secondary'
    ? isHovered
      ? styles.colors.accent
      : styles.colors.textPrimary
    : styles.colors.bgPrimary;

  const border = type === 'secondary' ? `1px solid ${styles.colors.border}` : 'none';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: `${styles.spacing.s} ${styles.spacing.l}`,
        borderRadius: styles.radius.m,
        fontSize: styles.typography.fontSize.m,
        fontWeight: styles.typography.fontWeight.medium,
        backgroundColor,
        color,
        border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        filter: type === 'danger' && isHovered ? 'brightness(0.92)' : 'none',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        {children}
      </span>
      {isLoading && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <VLoader />
        </span>
      )}
    </button>
  );
};