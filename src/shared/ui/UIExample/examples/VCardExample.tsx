import { useThemeStyles } from '@/shared/theme';
import { VCard } from '@/shared/ui/VCard';

export const VCardExample = () => {
  const styles = useThemeStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VCard
      </div>
      <VCard>
        <div style={{ fontSize: styles.typography.fontSize.m, fontWeight: styles.typography.fontWeight.medium }}>
          Заголовок карточки
        </div>
        <div style={{ marginTop: styles.spacing.s, color: styles.colors.textSecondary }}>
          Содержимое карточки, обёрнутое в компонент VCard.
        </div>
      </VCard>
    </div>
  );
};