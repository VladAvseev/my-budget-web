import { useThemeStyles } from '@/shared/theme';
import { VCard } from '@/shared/ui/VCard';

export const Page: React.FC = () => {
  const styles = useThemeStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: styles.spacing.l,
      }}
    >
      <div
        style={{
          fontSize: styles.typography.fontSize.xxl,
          fontWeight: styles.typography.fontWeight.bold,
          color: styles.colors.textPrimary,
        }}
      >
        Отчёты
      </div>
      <VCard>
        <div style={{ color: styles.colors.textSecondary }}>Здесь будут отчёты</div>
      </VCard>
    </div>
  );
};
