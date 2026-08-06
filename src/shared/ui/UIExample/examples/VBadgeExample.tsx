import { useThemeStyles } from '@/shared/theme';
import { VBadge } from '@/shared/ui/VBadge';
import { VButton } from '@/shared/ui/VButton';

export const VBadgeExample = () => {
  const styles = useThemeStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VBadge
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.s, flexWrap: 'wrap' }}>
        <VBadge>Нейтральный</VBadge>
        <VBadge variant="accent">Акцент</VBadge>
        <VBadge variant="success">Успех</VBadge>
        <VBadge variant="warning">Предупреждение</VBadge>
        <VBadge variant="danger">Ошибка</VBadge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.m, flexWrap: 'wrap' }}>
        <span style={{ fontSize: styles.typography.fontSize.l }}>Бейдж рядом с кнопкой и заголовком</span>
        <VBadge variant="accent">3 операции</VBadge>
        <VButton type="secondary">Действие</VButton>
      </div>
    </div>
  );
};