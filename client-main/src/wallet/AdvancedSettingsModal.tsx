import React from 'react';
import { Modal, ModalHeader, ModalState } from '@igg/common';
import {
  FrozenTrxForm,
  CreateWalletPasswordForm,
  ChangeWalletPasswordForm
} from './forms';
// import { FrozenTrxForm, WalletPasswordForm, VoteForm } from './forms';

export interface AdvancedSettingsModalProps {
  passwordSet: boolean;
  label?: string;
}

export class AdvancedSettingsModal extends React.Component<
  AdvancedSettingsModalProps
> {
  render() {
    const { label, passwordSet } = this.props;
    return (
      <ModalState>
        {({ isOpen, open, close }) => (
          <>
            <a style={{ cursor: 'pointer' }} onClick={open}>
              {label ? label : 'Advanced Settings'}
            </a>
            <Modal isOpen={isOpen} onRequestClose={close}>
              <ModalHeader>Advanced Options</ModalHeader>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
                officia dignissimos, ad dolor porro repudiandae corporis quaerat
                suscipit. Hic error natus nihil iusto ab at, cumque neque
                necessitatibus quia perspiciatis?
              </p>
              <FrozenTrxForm />
              {(() => {
                return passwordSet ? (
                  <ChangeWalletPasswordForm />
                ) : (
                  <CreateWalletPasswordForm />
                );
              })()}
              {/* <VoteForm /> */}
            </Modal>
          </>
        )}
      </ModalState>
    );
  }
}
