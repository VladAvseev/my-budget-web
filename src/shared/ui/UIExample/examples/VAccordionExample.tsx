import { useThemeStyles } from '@/shared/theme';
import { VAccordion } from '@/shared/ui/VAccordion';

export const VAccordionExample = () => {
  const styles = useThemeStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VAccordion
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.s }}>
        <VAccordion header={<span>Аккордеон с текстом</span>}>
          Содержимое аккордеона. Здесь может быть любой текст, например описание операции.
        </VAccordion>
        <VAccordion
          defaultOpen
          header={
            <span style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.m }}>
              Аккордеон с бейджем и суммой
              <span
                style={{
                  padding: `0 ${styles.spacing.s}`,
                  borderRadius: styles.radius.s,
                  fontSize: styles.typography.fontSize.s,
                  backgroundColor: styles.colors.accentLight,
                  color: styles.colors.accent,
                }}
              >
                3 операции
              </span>
            </span>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
            <div>Оплата продуктов — 1 250 ₽</div>
            <div>Транспорт — 400 ₽</div>
            <div>Кафе — 850 ₽</div>
          </div>
        </VAccordion>
        <VAccordion
          header={<span>Отключённый аккордеон</span>}
          disabled
        >
          Содержимое недоступно.
        </VAccordion>
      </div>
    </div>
  );
};