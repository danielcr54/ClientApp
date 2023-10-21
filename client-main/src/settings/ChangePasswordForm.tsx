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
import { ChangePasswordModel } from './types';

export interface ChangePasswordFormProps {
  onSubmit: (formModel: ChangePasswordModel) => Promise<any>;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export function validateForm(form: ChangePasswordModel) {
  const errors: FormErrorMap<ChangePasswordModel> = {};

  if (!form.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!form.newPassword) {
    errors.newPassword = 'New password is required';
  }

  if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Confirmation password does not match';
  }

  return errors;
}

export function ChangePasswordForm({
  inProgress,
  onSubmit,
  success,
  formError
}: ChangePasswordFormProps) {
  return (
    <Form onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            {formError && (
              <FormError title={`Error changing the password`}>
                {formError}
              </FormError>
            )}

            <FormElement>
              <InputField
                name="currentPassword"
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
                label="Confirm Password"
              />
            </FormElement>

            <FormActions>
              <FormActionsContent grow={true} alignEnd={true}>
                <SubmitButton
                  inProgress={inProgress}
                  success={success}
                  progressText="Changing password..."
                  successText="Password changed!"
                >
                  Change password
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}

export default ChangePasswordForm;
