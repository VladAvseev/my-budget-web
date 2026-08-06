import { useThemeStyles } from '@/shared/theme';

export interface VLoaderProps {
  size?: string;
}

export const VLoader = ({ size = '20px' }: VLoaderProps) => {
  const styles = useThemeStyles();

  return (
    <span
      role="status"
      aria-label="Загрузка"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: styles.radius.round,
        background: `conic-gradient(from 0deg, ${styles.colors.textSecondary} 0deg 315deg, transparent 315deg 360deg)`,
        WebkitMask: 'radial-gradient(circle closest-side, transparent 0 70%, #000 70% 100%)',
        mask: 'radial-gradient(circle closest-side, transparent 0 70%, #000 70% 100%)',
        animation: 'vloader-spin 1s linear infinite',
      }}
    />
  );
};