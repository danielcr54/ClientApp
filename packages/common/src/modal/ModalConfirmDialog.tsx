import React, { ReactNode } from 'react';
import { Modal } from './Modal';
import { ModalState, ModalStateChildrenArg } from './ModalState';
import {
  ModalDialogMessage,
  ModalDialogActions,
  ModalDialogActionsCell,
  ModalDialogButton
} from './modalElements';

// TODO: Make it avoid the repetition with ModalInfoDialog/ModalAlert

export interface ModalConfirmDialogProps {
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
  children?: (arg: ModalStateChildrenArg) => ReactNode;
}

export function ModalConfirmDialog({
  children,
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  onDismiss
}: ModalConfirmDialogProps) {
  function handleClose() {
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  }

  return (
    <ModalState onClose={handleClose}>
      {({ open, close, isOpen }) => {
        function handleConfirmClick() {
          close();
          if (typeof onConfirm === 'function') {
            onConfirm();
          }
        }

        return (
          <>
            {typeof children === 'function' &&
              children({ open, close, isOpen })}

            <Modal
              dialogStyle={true}
              inverseStyle={true}
              isOpen={isOpen}
              onRequestClose={close}
            >
              <ModalDialogMessage>{message}</ModalDialogMessage>
              <ModalDialogActions>
                <ModalDialogActionsCell>
                  <ModalDialogButton type="button" onClick={handleConfirmClick}>
                    {confirmButtonText}
                  </ModalDialogButton>
                </ModalDialogActionsCell>

                <ModalDialogActionsCell alignEnd={true}>
                  <ModalDialogButton
                    type="button"
                    inverse={true}
                    onClick={close}
                  >
                    {cancelButtonText}
                  </ModalDialogButton>
                </ModalDialogActionsCell>
              </ModalDialogActions>
            </Modal>
          </>
        );
      }}
    </ModalState>
  );
}

export default ModalConfirmDialog;
