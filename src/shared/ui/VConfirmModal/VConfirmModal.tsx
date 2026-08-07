import { VButton } from '@/shared/ui/VButton';
import { VModal } from '@/shared/ui/VModal';

export interface VConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  width?: string;
  isLoading?: boolean;
  error?: string;
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
  onCancel,
  onConfirm,
}: VConfirmModalProps) => {
  return (
    <VModal
      visible={visible}
      title={title}
      onClose={onCancel}
      error={error}
      width={width}
      footer={
        <>
          <VButton variant="secondary" onClick={onCancel} isDisabled={isLoading}>
            {cancelLabel}
          </VButton>
          <VButton variant="danger" isLoading={isLoading} onClick={onConfirm}>
            {confirmLabel}
          </VButton>
        </>
      }
    >
      <div>{message}</div>
    </VModal>
  );
};