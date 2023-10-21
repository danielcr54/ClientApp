import React from 'react';
import { Form } from 'react-final-form';
import {
  FormElement,
  InputField,
  FormActions,
  FormActionsContent,
  SubmitButton,
  FormErrorMap
} from '../';

export interface PasswordResetFormModel {
  password: string;
}

function validateForm(formModel: PasswordResetFormModel) {
  const errors: FormErrorMap<PasswordResetFormModel> = {};

  if (!formModel.password) {
    errors.password = 'Please provide the new password';
  }

  return errors;
}

export interface PasswordResetFormProps {
  onSubmit: (formModel: PasswordResetFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
}

export function PasswordResetForm({
  onSubmit,
  inProgress,
  success
}: PasswordResetFormProps) {
  return (
    <Form onSubmit={onSubmit} validate={validateForm} validateOnBlur={true}>
      {({ handleSubmit, submitErrors }) => (
        <form noValidate={true} onSubmit={handleSubmit}>
          <FormElement>
            <InputField type="password" name="password" label="New password" />
          </FormElement>

          <FormActions>
            <FormActionsContent alignEnd={true}>
              <SubmitButton
                inProgress={inProgress}
                success={success}
                progressText="Resetting password..."
                successText="Password changed"
              >
                Reset
              </SubmitButton>
            </FormActionsContent>
          </FormActions>
        </form>
      )}
    </Form>
  );
}

export default PasswordResetForm;
