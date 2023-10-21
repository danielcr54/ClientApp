import React, { Component, ReactNode, MouseEvent } from 'react';
import { PreventDocumentScrollEffect } from './PreventDocumentScrollEffect';
import { ModalContainer } from './ModalContainer';
import { ModalContentContainer } from './ModalContentContainer';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalCloseButtonContainer } from './modalElements';
import { CloseModalButton } from '../buttons';

export interface ModalProps extends ModalContentProps {
  children?: ReactNode;
  isOpen?: boolean;
  onRequestClose?: () => void;
  closeOnBackdropClick?: boolean;
}

export class Modal extends Component<ModalProps> {
  handleBackdropClick = (e: any /* MouseEvent<HTMLElement> */) => {
    e.stopPropagation();
    this.requestClose();
  };

  requestClose = () => {
    const { onRequestClose } = this.props;
    if (typeof onRequestClose === 'function') onRequestClose();
  };

  render() {
    const {
      children,
      closeOnBackdropClick,
      onRequestClose,
      isOpen,
      ...modalContentProps
    } = this.props;
    const { requestClose, handleBackdropClick } = this;

    return (
      <ModalContainer isOpen={isOpen}>
        {isOpen && (
          <>
            <PreventDocumentScrollEffect />
            <ModalBackdrop
              isOpen={isOpen}
              onClick={
                closeOnBackdropClick !== false ? handleBackdropClick : void 0
              }
              dangerStyle={modalContentProps.dangerStyle}
            />

            <ModalContentContainer
              panelStyle={modalContentProps.panelStyle}
              dialogStyle={modalContentProps.dialogStyle}
            >
              <ModalContent {...modalContentProps}>
                {!modalContentProps.dialogStyle && (
                  <ModalCloseButtonContainer>
                    <CloseModalButton onClick={requestClose} />
                  </ModalCloseButtonContainer>
                )}

                {children}
              </ModalContent>
            </ModalContentContainer>
          </>
        )}
      </ModalContainer>
    );
  }
}

export default Modal;
