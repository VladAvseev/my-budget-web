import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VBanner } from '@/shared/ui/VBanner';

export const VBannerExample = () => {
  const styles = useThemeStyles();
  const [errorVisible, setErrorVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VBanner
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m }}>
        <VButton
          variant="danger"
          onClick={() => setErrorVisible((prev) => !prev)}
        >
          {errorVisible ? 'Скрыть ошибку' : 'Показать ошибку'}
        </VButton>
        <VButton
          variant="secondary"
          onClick={() => setWarningVisible((prev) => !prev)}
        >
          {warningVisible ? 'Скрыть предупреждение' : 'Показать предупреждение'}
        </VButton>
        <VButton onClick={() => setSuccessVisible((prev) => !prev)}>
          {successVisible ? 'Скрыть успех' : 'Показать успех'}
        </VButton>
      </div>
      <VBanner
        type="error"
        visible={errorVisible}
        message="Произошла ошибка: не удалось сохранить операцию."
        onClose={() => setErrorVisible(false)}
      />
      <VBanner
        type="warning"
        visible={warningVisible}
        message="Внимание: остаток по категории близок к лимиту."
      />
      <VBanner
        type="success"
        visible={successVisible}
        message="Операция успешно сохранена."
      />
    </div>
  );
};