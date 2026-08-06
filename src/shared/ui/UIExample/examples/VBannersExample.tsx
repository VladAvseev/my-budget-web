import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VErrorBanner, VSuccessBanner, VWarningBanner } from '@/shared/ui/VBanners';

export const VBannersExample = () => {
  const styles = useThemeStyles();
  const [errorVisible, setErrorVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VBanners
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m }}>
        <VButton
          type="danger"
          onClick={() => setErrorVisible((prev) => !prev)}
        >
          {errorVisible ? 'Скрыть ошибку' : 'Показать ошибку'}
        </VButton>
        <VButton
          type="secondary"
          onClick={() => setWarningVisible((prev) => !prev)}
        >
          {warningVisible ? 'Скрыть предупреждение' : 'Показать предупреждение'}
        </VButton>
        <VButton onClick={() => setSuccessVisible((prev) => !prev)}>
          {successVisible ? 'Скрыть успех' : 'Показать успех'}
        </VButton>
      </div>
      <VErrorBanner
        visible={errorVisible}
        message="Произошла ошибка: не удалось сохранить операцию."
        onClose={() => setErrorVisible(false)}
      />
      <VWarningBanner
        visible={warningVisible}
        message="Внимание: остаток по категории близок к лимиту."
      />
      <VSuccessBanner
        visible={successVisible}
        message="Операция успешно сохранена."
      />
    </div>
  );
};