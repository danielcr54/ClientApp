import React from 'react';
import { LightButton, Modal, ModalState } from '@igg/common';
import MakeATransferForm from './MakeATransferForm';
import { WalletTransactionModel } from './types';

export interface MakeATransferButtonState {
  modalProcessing: boolean;
  modalSuccess: boolean;
}

export class MakeATransferButton extends React.Component<
  any,
  MakeATransferButtonState
> {
  state = {
    modalProcessing: false,
    modalSuccess: false
  };

  handleSubmit = (walletTransferFormModel: WalletTransactionModel) => {
    // TODO: Process form submission - to server
    this.setState({
      modalProcessing: true
    });
  };

  render() {
    const { modalProcessing, modalSuccess } = this.state;
    return (
      <ModalState>
        {({ isOpen, open, close }) => (
          <>
            <LightButton type="button" onClick={open}>
              Make A Transfer
            </LightButton>

            <Modal isOpen={isOpen} onRequestClose={close}>
              <MakeATransferForm
                onCancel={close}
                onSubmit={this.handleSubmit}
                inProgress={modalProcessing}
                success={modalSuccess}
              />
            </Modal>
          </>
        )}
      </ModalState>
    );
  }
}

export default MakeATransferButton;
