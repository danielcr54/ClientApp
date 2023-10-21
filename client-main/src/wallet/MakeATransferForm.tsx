import React from 'react';
import { Form, Field } from 'react-final-form';
import { ModalHeader } from '@igg/common';
import {
  FormRow,
  FormCol,
  FormActions,
  FormElement,
  SubmitButton,
  CancelButton,
  FormErrorMap,
  InputField,
  SelectField
} from '@igg/common/lib/forms';
import { WalletTransactionModel } from './types';

export function validateTransferForm(transferForm: WalletTransactionModel) {
  const errors: FormErrorMap<WalletTransactionModel> = {};

  if (!transferForm.toAddress) {
    errors.toAddress = 'Recipient address is required';
  }

  if (!transferForm.token) {
    errors.token = 'Please select a token';
  }

  if (!transferForm.amount || transferForm.amount <= 0) {
    errors.amount = 'Minimum transfer amount: 1';
  }

  // TODO-1: Check the user isn't trying to send more tokens than they have
  // TODO-2: Check the user isn't trying to send more than their specified limit (FUTURE-FEATURE: Settings)

  return errors;
}

export interface TransferFormProps {
  onSubmit?: (walletTransferFormModel: WalletTransactionModel) => void;
  onCancel: () => void;
  inProgress?: boolean;
  success?: boolean;
}

export class MakeATransferForm extends React.Component<TransferFormProps> {
  handleFormSubmit = (walletTransferFormModel: WalletTransactionModel) => {
    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') onSubmit(walletTransferFormModel);
  };

  render() {
    const { handleFormSubmit } = this;
    const { inProgress, success } = this.props;

    return (
      <Form
        onSubmit={handleFormSubmit}
        validate={validateTransferForm}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            <ModalHeader>Make A Transfer</ModalHeader>
            <FormElement>
              <InputField
                name="toAddress"
                type="text"
                label="Recipient Address"
                placeholder=""
              />
            </FormElement>
            <FormRow>
              <FormCol>
                <FormElement>
                  <InputField
                    name="amount"
                    type="number"
                    label="Amount"
                    min="1"
                    placeholder=""
                  />
                </FormElement>
              </FormCol>
              <FormCol>
                <FormElement>
                  <SelectField name="token" label="Token">
                    <option value="TRX">TRX (9,999,999)</option>
                    <option value="IGG">IGG (1,234)</option>
                    <option value="PRO" disabled={true}>
                      PRO (0)
                    </option>
                    <option value="TWX">TWX (123,456)</option>
                  </SelectField>
                </FormElement>
              </FormCol>
            </FormRow>

            <FormActions>
              <FormRow>
                <FormCol>
                  <CancelButton
                    onClick={this.props.onCancel}
                    disabled={inProgress}
                  >
                    Cancel
                  </CancelButton>
                </FormCol>
                <FormCol>
                  <SubmitButton
                    inProgress={inProgress}
                    success={success}
                    progressText="Processing..."
                    successText="Transaction Successful!"
                  >
                    Continue
                  </SubmitButton>
                </FormCol>
              </FormRow>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}

export default MakeATransferForm;
