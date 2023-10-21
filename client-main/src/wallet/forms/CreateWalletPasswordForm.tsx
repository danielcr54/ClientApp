import React from 'react';
import { Form } from 'react-final-form';
import {
  FormErrorMap,
  FormElement,
  InputField,
  FormActions,
  SubmitButton
} from '@igg/common/lib';

export interface CreateWalletPasswordModel {
  password: string;
  confirmPassword: string;
}

export function validateCreateWalletPasswordForm(
  form: CreateWalletPasswordModel
) {
  const errors: FormErrorMap<CreateWalletPasswordModel> = {};

  return errors;
}

export interface CreateWalletPasswordFormProps {
  onSubmit?: (form: CreateWalletPasswordModel) => void;
  inProgress?: boolean;
  success?: boolean;
}

export class CreateWalletPasswordForm extends React.Component<
  CreateWalletPasswordFormProps
> {
  handleFormSubmit = (form: CreateWalletPasswordModel) => {
    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') onSubmit(form);
  };
  render() {
    const { handleFormSubmit } = this;
    const { inProgress, success } = this.props;

    return (
      <Form
        onSubmit={handleFormSubmit}
        validate={validateCreateWalletPasswordForm}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            <p>Create Wallet Password</p> {/* TODO: STYLE */}
            <FormElement>
              <InputField name="password" type="password" label="Password" />
            </FormElement>
            <FormElement>
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
              />
            </FormElement>
            <FormActions>
              <SubmitButton
                inProgress={inProgress}
                success={success}
                progressText="Setting Password..."
                successText="Password Set"
              >
                Create Wallet Password
              </SubmitButton>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
