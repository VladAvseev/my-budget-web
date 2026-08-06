import { useState, type CSSProperties, type ReactNode } from 'react';
import { useThemeStyles } from '@/shared/theme';

export interface VToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
}

export const VToggle = ({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  style,
}: VToggleProps) => {
  const styles = useThemeStyles();
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const trackBackground = isChecked
    ? isHovered
      ? styles.colors.accentHover
      : styles.colors.accent
    : isHovered
      ? styles.colors.textSecondary
      : styles.colors.border;

  const handleColor = isChecked ? styles.colors.bgPrimary : styles.colors.bgSurface;

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.m, ...style }}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          flexShrink: 0,
          padding: 0,
          border: 'none',
          borderRadius: styles.radius.m,
          backgroundColor: trackBackground,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background-color 0.15s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '4px',
            left: isChecked ? '24px' : '4px',
            width: '16px',
            height: '16px',
            borderRadius: styles.radius.s,
            backgroundColor: handleColor,
            boxShadow: styles.shadow.s,
            transition: 'left 0.15s ease, background-color 0.15s ease',
          }}
        />
      </button>
      {label && <span style={{ fontSize: styles.typography.fontSize.m }}>{label}</span>}
    </div>
  );
};