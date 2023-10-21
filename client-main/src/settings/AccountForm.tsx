import React from 'react';
import { Form } from 'react-final-form';
import {
  FormActions,
  FormActionsContent,
  FormElement,
  SubmitButton,
  FormErrorMap,
  FormError,
  InputField
} from '@igg/common';
import { AccountFormModel } from './types';
import { cleanAccountFormModel } from '../utils';

export interface AccountFormProps {
  formData: AccountFormModel;
  onSubmit: (formModel: AccountFormModel) => Promise<any>;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function validateForm(form: AccountFormModel) {
  const errors: FormErrorMap<AccountFormModel> = {};

  if (!form.username) {
    errors.username = 'Username is required';
  }

  if (!form.email) {
    errors.email = 'Email is required';
  }

  // TODO: Check username and email availability

  return errors;
}

export function AccountForm({
  formData,
  inProgress,
  onSubmit,
  success,
  formError
}: AccountFormProps) {
  return (
    <Form initialValues={cleanAccountFormModel(formData)} onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError title={`Error updating the account settings`}>
                {formError}
              </FormError>
            )}

            <FormElement>
              <InputField name="username" label="Username" />
            </FormElement>

            <FormElement>
              <InputField name="email" type="email" label="Email" />
            </FormElement>

            <FormActions>
              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButton
                  inProgress={inProgress}
                  success={success}
                  progressText="Saving..."
                  successText="Saved!"
                >
                  Save changes
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default AccountForm;
