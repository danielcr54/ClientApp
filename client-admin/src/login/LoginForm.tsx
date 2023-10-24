import React from 'react';
import { Form } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import { FormErrorMap, FormError, FormElement, InputField, FormActions, FormActionsContent, SubmitButton } from '@igg/common/lib';
import styled from '@emotion/styled';

const StyledForm = styled('form')({
  width: '100%'
});

export interface LoginFormModel {
  usernameOrEmail: string;
  password: string;
  forAdminPanel?: boolean;
}

function validateForm(formModel: LoginFormModel) {
  const errors: FormErrorMap<LoginFormModel> = {};

  if (!formModel.usernameOrEmail) {
    errors.usernameOrEmail = 'Please provide either username or email';
  }

  if (!formModel.password) {
    errors.password = 'Please provide the password';
  }

  return errors;
}

export interface LoginFormProps {
  onSubmit: (loginFormModel: LoginFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  formError?: string;
}

function renderErrorBlock(formError: string) {
  if (formError === 'Email not confirmed') {
    return (
      <FormError title="E-mail address not confirmed">
        <p>Please confirm your email address before attempting to log in.</p>
        <p>
          Lost your verification email?{' '}
          <NavLink to="/signup/verify/resend">request another link</NavLink>.
        </p>
      </FormError>
    );
  }
  return <FormError title="Login failed">{formError}</FormError>;
}

export function LoginForm({ onSubmit, inProgress, formError }: LoginFormProps) {
  return (
    <Form onSubmit={onSubmit} validate={validateForm} >
      {({ handleSubmit, submitErrors }) => (
        <StyledForm noValidate={true} onSubmit={handleSubmit}>
          {formError && renderErrorBlock(formError)}

          <FormElement>
            <InputField name="usernameOrEmail" label="Username or Email" />
          </FormElement>

          <FormElement>
            <InputField type="password" name="password" label="Password" />
          </FormElement>

          <FormActions>
            <FormActionsContent grow={true}>
              <SubmitButton
                inProgress={inProgress}
                progressText="Signing in..."
                block={true}
              >
                Sign in
              </SubmitButton>
            </FormActionsContent>
          </FormActions>
        </StyledForm>
      )}
    </Form>
  );
}

export default LoginForm;
