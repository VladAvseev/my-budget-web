import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VModal } from '@/shared/ui/VModal';
import { VTextInput } from '@/shared/ui/VTextInput';

export const VModalExample = () => {
  const styles = useThemeStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSave = () => {
    if (!name.trim()) {
      setError('Название не может быть пустым.');
      return;
    }
    setIsSaving(true);
    setError(undefined);
    window.setTimeout(() => {
      setIsSaving(false);
      setIsOpen(false);
      setName('');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.m }}>
      <div style={{ fontSize: styles.typography.fontSize.m, color: styles.colors.textSecondary }}>
        VModal
      </div>
      <div style={{ display: 'flex', gap: styles.spacing.m }}>
        <VButton onClick={() => setIsOpen(true)}>Открыть модальное окно</VButton>
      </div>

      <VModal
        visible={isOpen}
        title="Новая категория"
        onClose={() => setIsOpen(false)}
        error={error}
        footer={
          <>
            <VButton variant="secondary" onClick={() => setIsOpen(false)}>
              Отмена
            </VButton>
            <VButton variant="primary" isLoading={isSaving} onClick={handleSave}>
              Сохранить
            </VButton>
          </>
        }
      >
        <VTextInput
          label="Название категории"
          placeholder="Например, Продукты"
          value={name}
          onChange={(value) => {
            setName(value);
            setError(undefined);
          }}
        />
      </VModal>
    </div>
  );
};