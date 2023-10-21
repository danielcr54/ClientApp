import React, { Component, ReactNode } from 'react';
import { Modal } from './Modal';
import { ModalStateChildrenArg } from './ModalState';
import {
  ModalDialogMessage,
  ModalDialogActions,
  ModalDialogActionsCell,
  ModalDialogButton
} from './modalElements';

// TODO: Make it avoid the repetition with ModalInfoDialog
// and not repeat the ModalState implementation too (might
// not worth doing that now at all as Hooks API will get
// rolled out soon which will simplify the API on its own).

export interface ModalAlertDialogChildrenArg extends ModalStateChildrenArg {
  open: (message?: string) => void;
}

export interface ModalAlertDialogProps {
  message?: string;
  buttonText?: string;
  onDismiss?: () => void;
  children?: (arg: ModalAlertDialogChildrenArg) => ReactNode;
}

export interface ModalAlertDialogState {
  isOpen?: boolean;
  message?: string;
  buttonText?: string;
}

export class ModalAlertDialog extends Component<
  ModalAlertDialogProps,
  ModalAlertDialogState
> {
  state = {
    isOpen: false,
    message: void 0,
    buttonText: void 0
  };

  open = (message?: string, buttonText?: string) => {
    this.setState({
      isOpen: true,
      message,
      buttonText
    });
  };

  close = () => {
    const { onDismiss } = this.props;

    this.setState(
      {
        isOpen: false,
        message: void 0,
        buttonText: void 0
      },
      () => {
        if (typeof onDismiss === 'function') onDismiss();
      }
    );
  };

  render() {
    const {
      children,
      message: defaultMessage,
      buttonText: defaultButtonText = 'OK'
    } = this.props;
    const { message, buttonText, isOpen } = this.state;
    const { open, close } = this;

    return (
      <>
        {typeof children === 'function' && children({ open, close, isOpen })}

        <Modal
          dialogStyle={true}
          inverseStyle={true}
          dangerStyle={true}
          isOpen={isOpen}
          onRequestClose={close}
        >
          <ModalDialogMessage>{message || defaultMessage}</ModalDialogMessage>

          <ModalDialogActions>
            <ModalDialogActionsCell alignCenter={true}>
              <ModalDialogButton type="button" danger={true} onClick={close}>
                {buttonText || defaultButtonText}
              </ModalDialogButton>
            </ModalDialogActionsCell>
          </ModalDialogActions>
        </Modal>
      </>
    );
  }
}

export default ModalAlertDialog;
