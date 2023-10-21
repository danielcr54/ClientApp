import React from 'react';
import Media from 'react-media';
import { Form } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import {
  FormElement,
  InputField,
  FormActions,
  SubmitButton,
  FormError,
  FormErrorMap
} from '../';
import { FormActionsContent } from '../forms';
import { deviceScreenQuery } from '../styleSettings';

export interface LoginFormModel {
  usernameOrEmail: string;
  password: string;
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
    <Form onSubmit={onSubmit} validate={validateForm}>
      {({ handleSubmit, submitErrors }) => (
        <form noValidate={true} onSubmit={handleSubmit}>
          {formError && renderErrorBlock(formError)}

          <FormElement>
            <InputField name="usernameOrEmail" label="Username or Email" />
          </FormElement>

          <FormElement>
            <InputField type="password" name="password" label="Password" />
          </FormElement>

          <Media query={deviceScreenQuery.medium}>
            {largeScreen => (
              <FormActions>
                <FormActionsContent
                  grow={true}
                  alignCenter={!largeScreen}
                  verticalAlignCenter={true}
                >
                  <NavLink to="/password-recovery">Forgot password?</NavLink>
                </FormActionsContent>

                <FormActionsContent alignEnd={true}>
                  <SubmitButton
                    inProgress={inProgress}
                    progressText="Signing in..."
                  >
                    Sign in
                  </SubmitButton>
                </FormActionsContent>
              </FormActions>
            )}
          </Media>
        </form>
      )}
    </Form>
  );
}

export default LoginForm;
