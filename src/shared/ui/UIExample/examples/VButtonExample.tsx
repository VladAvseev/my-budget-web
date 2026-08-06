import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';

export const VButtonExample = () => {
  const styles = useThemeStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VButton
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: styles.spacing.m }}>
          <VButton>Обычная кнопка</VButton>
          <VButton isLoading>Загрузка</VButton>
          <VButton isDisabled>Отключена</VButton>
        </div>
        <div style={{ display: 'flex', gap: styles.spacing.m }}>
          <VButton variant="primary">Primary</VButton>
          <VButton variant="secondary">Secondary</VButton>
          <VButton variant="danger">Danger</VButton>
        </div>
      </div>
    </div>
  );
};