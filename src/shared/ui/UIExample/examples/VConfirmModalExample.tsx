import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VConfirmModal } from '@/shared/ui/VConfirmModal';

export const VConfirmModalExample = () => {
  const styles = useThemeStyles();
  const [kind, setKind] = useState<'word' | 'simple' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const openWord = () => {
    setError(undefined);
    setKind('word');
  };

  const openSimple = () => {
    setError(undefined);
    setKind('simple');
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setError(undefined);
    window.setTimeout(() => {
      setIsDeleting(false);
      setKind(null);
    }, 1000);
  };

  const handleFail = () => {
    setIsDeleting(true);
    setError(undefined);
    window.setTimeout(() => {
      setIsDeleting(false);
      setError('Не удалось удалить операцию: сервер вернул ошибку 500.');
    }, 700);
  };

  const isOpen = kind !== null;
  const requireConfirmWord = kind === 'word';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VConfirmModal
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m }}>
        <VButton onClick={openWord}>Удалить категорию (с подтверждением)</VButton>
        <VButton variant="danger" onClick={openSimple}>
          Удалить операцию (простое)
        </VButton>
      </div>

      <VConfirmModal
        visible={isOpen}
        title={requireConfirmWord ? 'Удаление категории' : 'Удаление операции'}
        message={
          requireConfirmWord
            ? 'Категория будет удалена безвозвратно вместе со всеми операциями в ней. Для подтверждения введите «подтвердить».'
            : 'Операция будет удалена безвозвратно. Вы уверены, что хотите продолжить?'
        }
        confirmLabel="Удалить"
        requireConfirmWord={requireConfirmWord}
        isLoading={isDeleting}
        error={error}
        onConfirm={requireConfirmWord ? handleDelete : handleFail}
        onCancel={() => setKind(null)}
      />
    </div>
  );
};