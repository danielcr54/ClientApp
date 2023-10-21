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

export interface PasswordRecoveryFormModel {
  usernameOrEmail: string;
}

function validateForm(formModel: PasswordRecoveryFormModel) {
  const errors: FormErrorMap<PasswordRecoveryFormModel> = {};

  if (!formModel.usernameOrEmail) {
    errors.usernameOrEmail = 'Please provide either username or email';
  }

  return errors;
}

export interface PasswordRecoveryFormProps {
  onSubmit: (formModel: PasswordRecoveryFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  errorMessage?: string;
}

export function PasswordRecoveryForm({
  onSubmit,
  inProgress,
  success,
  errorMessage
}: PasswordRecoveryFormProps) {
  return (
    <Form onSubmit={onSubmit} validate={validateForm} validateOnBlur={true}>
      {({ handleSubmit, submitErrors }) => (
        <form noValidate={true} onSubmit={handleSubmit}>
          <FormElement>
            <InputField
              name="usernameOrEmail"
              label="Username or Email"
              autoFocus={true}
            />
          </FormElement>

          <FormActions>
            <FormActionsContent grow={true} alignEnd={true}>
              <SubmitButton
                inProgress={inProgress}
                success={success}
                progressText="Sending link..."
                successText="Link sent"
                error={Boolean(errorMessage)}
                errorText={errorMessage}
              >
                Send link
              </SubmitButton>
            </FormActionsContent>
          </FormActions>
        </form>
      )}
    </Form>
  );
}

export default PasswordRecoveryForm;
