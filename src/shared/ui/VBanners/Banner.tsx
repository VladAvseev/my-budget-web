import { ClearIcon } from '@/shared/icons';
import { useThemeStyles } from '@/shared/theme';

export type BannerType = 'success' | 'warning' | 'error';

export interface BannerProps {
  visible: boolean;
  message: string;
  onClose?: () => void;
}

interface BannerBaseProps extends BannerProps {
  type: BannerType;
}

const BANNER_KEYFRAMES =
  '@keyframes vbanner-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }';

export const Banner = ({ type, visible, message, onClose }: BannerBaseProps) => {
  const styles = useThemeStyles();

  if (!visible) {
    return null;
  }

  const color = styles.colors[type];
  const backgroundColor = `${color}1A`;
  const borderColor = `${color}40`;

  return (
    <>
      <style>{BANNER_KEYFRAMES}</style>
      <div
        role="status"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: styles.spacing.m,
          padding: `${styles.spacing.m} ${styles.spacing.l}`,
          borderRadius: styles.radius.m,
          backgroundColor,
          border: `1px solid ${borderColor}`,
          color,
          fontSize: styles.typography.fontSize.m,
          fontWeight: styles.typography.fontWeight.medium,
          boxShadow: styles.shadow.s,
          animation: 'vbanner-in 0.25s ease',
        }}
      >
        <span>{message}</span>
        {onClose && (
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ClearIcon size={16} color={color} />
          </button>
        )}
      </div>
    </>
  );
};