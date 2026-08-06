import type { CSSProperties, ReactNode } from 'react';
import { ClearIcon } from '@/shared/icons';
import { useThemeStyles } from '@/shared/theme';
import { VErrorBanner } from '@/shared/ui/VBanners';

export interface VModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  error?: string;
  width?: string;
}

export const VModal = ({
  visible,
  title,
  onClose,
  children,
  footer,
  error,
  width = '480px',
}: VModalProps) => {
  const styles = useThemeStyles();

  if (!visible) {
    return null;
  }

  const modalStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: width,
    maxHeight: 'calc(100vh - 48px)',
    backgroundColor: styles.colors.bgSurface,
    borderRadius: styles.radius.l,
    boxShadow: styles.shadow.l,
    animation: 'vmodal-in 0.2s ease',
  };

  return (
    <>
      <style>{V_MODAL_KEYFRAMES}</style>
      <div
        role="presentation"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: styles.spacing.xl,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          animation: 'vmodal-overlay-in 0.2s ease',
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(event) => event.stopPropagation()}
          style={modalStyle}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: styles.spacing.m,
              padding: `${styles.spacing.l} ${styles.spacing.xl}`,
              borderBottom: `1px solid ${styles.colors.border}`,
            }}
          >
            <div
              style={{
                fontSize: styles.typography.fontSize.xl,
                fontWeight: styles.typography.fontWeight.bold,
                color: styles.colors.textPrimary,
              }}
            >
              {title}
            </div>
            <button
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: styles.spacing.xs,
                border: 'none',
                borderRadius: styles.radius.s,
                background: 'transparent',
                color: styles.colors.textSecondary,
                cursor: 'pointer',
              }}
            >
              <ClearIcon size={18} color="currentColor" />
            </button>
          </div>

          <div style={{ padding: `0 ${styles.spacing.xl}` }}>
            {Boolean(error) && (
              <div style={{ paddingTop: styles.spacing.l }}>
                <VErrorBanner visible message={error as string} />
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              padding: `${styles.spacing.l} ${styles.spacing.xl}`,
              color: styles.colors.textPrimary,
              fontSize: styles.typography.fontSize.m,
            }}
          >
            {children}
          </div>

          {footer && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: styles.spacing.m,
                padding: `${styles.spacing.l} ${styles.spacing.xl}`,
                borderTop: `1px solid ${styles.colors.border}`,
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const V_MODAL_KEYFRAMES = `
@keyframes vmodal-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes vmodal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
`;