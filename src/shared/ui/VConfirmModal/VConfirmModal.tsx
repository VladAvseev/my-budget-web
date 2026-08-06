import { useState } from 'react';
import { useThemeStyles } from '@/shared/theme';
import { VButton } from '@/shared/ui/VButton';
import { VModal } from '@/shared/ui/VModal';
import { VTextInput } from '@/shared/ui/VTextInput';

export interface VConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  width?: string;
  isLoading?: boolean;
  error?: string;
  requireConfirmWord?: boolean;
  confirmWord?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const VConfirmModal = ({
  visible,
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  width,
  isLoading,
  error,
  requireConfirmWord = false,
  confirmWord = 'подтвердить',
  onCancel,
  onConfirm,
}: VConfirmModalProps) => {
  const styles = useThemeStyles();
  const [input, setInput] = useState('');
  const [prevVisible, setPrevVisible] = useState(visible);

  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) {
      setInput('');
    }
  }

  const canConfirm = !requireConfirmWord || input.trim().toLowerCase() === confirmWord.toLowerCase();

  const handleCancel = () => {
    onCancel();
  };

  return (
    <VModal
      visible={visible}
      title={title}
      onClose={handleCancel}
      error={error}
      width={width}
      footer={
        <>
          <VButton variant="secondary" onClick={handleCancel} isDisabled={isLoading}>
            {cancelLabel}
          </VButton>
          <VButton
            variant="danger"
            isLoading={isLoading}
            isDisabled={!canConfirm}
            onClick={onConfirm}
          >
            {confirmLabel}
          </VButton>
        </>
      }
    >
      <div>{message}</div>
      {requireConfirmWord && (
        <div style={{ marginTop: styles.spacing.l }}>
          <VTextInput
            label="Введите слово для подтверждения"
            placeholder={confirmWord}
            value={input}
            onChange={setInput}
            autoFocus
          />
        </div>
      )}
    </VModal>
  );
};