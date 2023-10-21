import React, { Component } from 'react';
import { Form } from 'react-final-form';
import {
  FormElement,
  InputField,
  FormActions,
  FormActionsContent,
  SubmitButton,
  FormErrorMap
} from '@igg/common/lib/forms';

export interface EmailVerificationResendFormModel {
  usernameOrEmail: string;
}

export function validateForm(formModel: EmailVerificationResendFormModel) {
  const errors: FormErrorMap<EmailVerificationResendFormModel> = {};

  if (!formModel.usernameOrEmail) {
    errors.usernameOrEmail = 'Please provide either username or email';
  }

  return errors;
}

export interface EmailVerificationResendProps {
  onSubmit: (formModel: EmailVerificationResendFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
}

export class EmailVerificationResendForm extends Component<
  EmailVerificationResendProps
> {
  render() {
    const { onSubmit, inProgress, success } = this.props;

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
              <FormActionsContent alignEnd={true}>
                <SubmitButton
                  inProgress={inProgress}
                  success={success}
                  progressText="Sending link..."
                  successText="Link sent"
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
}

export default EmailVerificationResendForm;
