import React, { ReactNode } from 'react';
import { Modal } from './Modal';
import { ModalState, ModalStateChildrenArg } from './ModalState';
import {
  ModalDialogMessage,
  ModalDialogActions,
  ModalDialogActionsCell,
  ModalDialogButton
} from './modalElements';

export interface ModalInfoDialogProps {
  message: string;
  buttonText?: string;
  onDismiss?: () => void;
  children?: (arg: ModalStateChildrenArg) => ReactNode;
}

export function ModalInfoDialog({
  children,
  message,
  buttonText = 'OK',
  onDismiss
}: ModalInfoDialogProps) {
  function handleClose() {
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  }

  return (
    <ModalState onClose={handleClose}>
      {({ open, close, isOpen }) => {
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
                <ModalDialogActionsCell alignCenter={true}>
                  <ModalDialogButton
                    type="button"
                    onClick={close}
                    secondary={true}
                  >
                    {buttonText}
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

export default ModalInfoDialog;
