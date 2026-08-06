import { useState } from 'react';
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
  const [input, setInput] = useState('');

  const canConfirm = !requireConfirmWord || input.trim().toLowerCase() === confirmWord.toLowerCase();

  const handleCancel = () => {
    setInput('');
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
          <VButton type="secondary" onClick={handleCancel} isDisabled={isLoading}>
            {cancelLabel}
          </VButton>
          <VButton
            type="danger"
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
        <div style={{ marginTop: 12 }}>
          <VTextInput
            label="Введите слово для подтверждения"
            placeholder={confirmWord}
            value={input}
            onChange={setInput}
          />
        </div>
      )}
    </VModal>
  );
};