import { useThemeStyles } from '@/shared/theme';
import { VLoader } from '@/shared/ui/VLoader';

export const VLoaderExample = () => {
  const styles = useThemeStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VLoader
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m, alignItems: 'center' }}>
        <VLoader />
        <VLoader size={32} />
        <VLoader size={24} color={styles.colors.accent} />
      </div>
    </div>
  );
};