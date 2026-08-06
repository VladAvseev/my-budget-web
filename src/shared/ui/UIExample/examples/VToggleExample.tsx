import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VToggle } from '@/shared/ui/VToggle';

export const VToggleExample = () => {
  const styles = useThemeStyles();
  const [controlled, setControlled] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VToggle
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
        <VToggle defaultChecked label="Включено по умолчанию" />
        <VToggle label="Выключено" />
        <VToggle disabled defaultChecked label="Отключено (вкл)" />
        <VToggle disabled label="Отключено (выкл)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.m }}>
          <VToggle checked={controlled} onChange={setControlled} label="Управляемое состояние" />
          <VButton variant="secondary" onClick={() => setControlled((prev) => !prev)}>
            Переключить
          </VButton>
        </div>
      </div>
    </div>
  );
};