import React, { Component } from 'react';
import {
  FormErrorMap,
  FormElement,
  InputField,
  SubmitButton,
  FormError,
  FormActions,
  FormActionsContent
} from '@igg/common/lib';
import { Form } from 'react-final-form';

export interface BalanceFormProps {
  tronWeb: any;
  onSubmit: (formModel: BalanceFormModel) => Promise<any>;
  inProgress?: boolean;
  formError?: string;
}

export interface BalanceFormModel {
  address: string;
}

export default class BalanceForm extends React.Component<BalanceFormProps> {
  validate = (formModel: BalanceFormModel) => {
    const { tronWeb } = this.props;
    const errors: FormErrorMap<BalanceFormModel> = {};

    if (!formModel.address) {
      errors.address = 'Address is required';
    }

    if (!tronWeb.isAddress(formModel.address)) {
      errors.address = 'Not a valid base58 (TRX) address';
    }

    return errors;
  };

  render() {
    return (
      <Form onSubmit={this.props.onSubmit} validate={this.validate}>
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            {this.props.formError && (
              <FormError title="An unknown error occurred">
                {this.props.formError}
              </FormError>
            )}

            <FormElement>
              <InputField name="address" label="TRX/TRON Address" />
            </FormElement>

            <FormActions>
              <FormActionsContent alignEnd={true}>
                <SubmitButton
                  inProgress={this.props.inProgress}
                  progressText="Checking Account"
                >
                  Get Balances
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
