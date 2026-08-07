import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VConfirmModal } from '@/shared/ui/VConfirmModal';

type ModalKind = 'delete' | 'fail' | null;

export const VConfirmModalExample = () => {
  const styles = useThemeStyles();
  const [kind, setKind] = useState<ModalKind>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const open = (next: Exclude<ModalKind, null>) => {
    setError(undefined);
    setKind(next);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VConfirmModal
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m }}>
        <VButton onClick={() => open('delete')}>Удалить операцию</VButton>
        <VButton variant="danger" onClick={() => open('fail')}>
          Удалить операцию (с ошибкой)
        </VButton>
      </div>

      <VConfirmModal
        visible={kind !== null}
        title="Удаление операции"
        message="Операция будет удалена безвозвратно. Вы уверены, что хотите продолжить?"
        confirmLabel="Удалить"
        isLoading={isDeleting}
        error={error}
        onConfirm={kind === 'fail' ? handleFail : handleDelete}
        onCancel={() => setKind(null)}
      />
    </div>
  );
};