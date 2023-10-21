import React from 'react';
import { Form } from 'react-final-form';
import {
  FormErrorMap,
  FormElement,
  InputField,
  FormActions,
  SubmitButton
} from '@igg/common/lib';

export interface ChangeWalletPasswordModel {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export function validateChangeWalletPasswordForm(
  form: ChangeWalletPasswordModel
) {
  const errors: FormErrorMap<ChangeWalletPasswordModel> = {};

  return errors;
}

export interface ChangeWalletPasswordFormProps {
  onSubmit?: (form: ChangeWalletPasswordModel) => void;
  inProgress?: boolean;
  success?: boolean;
}

export class ChangeWalletPasswordForm extends React.Component<
  ChangeWalletPasswordFormProps
> {
  handleFormSubmit = (form: ChangeWalletPasswordModel) => {
    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') onSubmit(form);
  };
  render() {
    const { handleFormSubmit } = this;
    const { inProgress, success } = this.props;

    return (
      <Form
        onSubmit={handleFormSubmit}
        validate={validateChangeWalletPasswordForm}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            <p>Change Wallet Password</p> {/* TODO: STYLE */}
            <FormElement>
              <InputField
                name="password"
                type="password"
                label="Current Password"
              />
            </FormElement>
            <FormElement>
              <InputField
                name="newPassword"
                type="password"
                label="New Password"
              />
            </FormElement>
            <FormElement>
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
              />
            </FormElement>
            <FormActions>
              <SubmitButton
                inProgress={inProgress}
                success={success}
                progressText="Changing Password..."
                successText="Password Changed"
              >
                Change Wallet Password
              </SubmitButton>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
