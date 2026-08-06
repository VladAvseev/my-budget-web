import { useState, type CSSProperties, type ReactNode } from 'react';
import { ChevronDownIcon } from '@/shared/icons';
import { useThemeStyles } from '@/shared/theme';

export interface VAccordionProps {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export const VAccordion = ({
  header,
  children,
  defaultOpen,
  open,
  onToggle,
  disabled,
  style,
}: VAccordionProps) => {
  const styles = useThemeStyles();
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    const next = !isOpen;
    if (!isControlled) {
      setInternalOpen(next);
    }
    onToggle?.(next);
  };

  return (
    <div
      style={{
        width: '100%',
        borderRadius: styles.radius.m,
        backgroundColor: styles.colors.bgSurface,
        boxShadow: styles.shadow.m,
        overflow: 'hidden',
        ...style,
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: styles.spacing.m,
          width: '100%',
          padding: `${styles.spacing.s} ${styles.spacing.m}`,
          border: 'none',
          borderRadius: styles.radius.m,
          backgroundColor: 'transparent',
          color: styles.colors.textPrimary,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.m }}>
          {header}
        </span>
        <ChevronDownIcon
          size={16}
          color={isHovered && !disabled ? styles.colors.accent : styles.colors.textSecondary}
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s ease, color 0.15s ease',
          }}
        />
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.2s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              padding: isOpen ? `${styles.spacing.s} ${styles.spacing.m} ${styles.spacing.m} ${styles.spacing.xl}` : '0',
              fontSize: styles.typography.fontSize.m,
              color: styles.colors.textSecondary,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};