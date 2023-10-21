import React, { Component, FormEvent } from 'react';
import { Form } from 'react-final-form';
import {
  FormElement,
  InputField,
  LabeledCheckboxField,
  FormActions,
  FormActionsContent,
  FormErrorMap,
  SubmitButton,
  Modal,
  ModalState,
  FormError
} from '@igg/common';
import { SignUpFormModel } from './types';
import { LinkLikeButton } from '@igg/common/lib';
import { TermsAndConditionsModalContent } from './TermsAndConditionsModalContent';
import { render } from 'react-dom';

export function validateForm(formModel: SignUpFormModel) {
  const errors: FormErrorMap<SignUpFormModel> = {};

  if (!formModel.username) {
    errors.username = 'Username is required';
  }

  if (!formModel.email) {
    errors.email = 'Email is required';
  }

  if (!formModel.password) {
    errors.password = 'Please set some password';
  }

  if (!formModel.termsConfirmed) {
    errors.termsConfirmed =
      'You have to agree to the Terms of Service to proceed';
  }

  return errors;
}

export interface SignUpFormProps {
  formData?: SignUpFormModel;
  onSubmit: (signUpFormModel: SignUpFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
}

export class SignUpForm extends Component<SignUpFormProps> {
  preventSpaceOnKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ') {
      // prevent if user typed space character in username field
      e.preventDefault();
    }
  }

  render() {
    const { preventSpaceOnKeyPress } = this;

    return (
      <Form
        initialValues={this.props.formData}
        onSubmit={this.props.onSubmit}
        validate={validateForm}
      >
        {({ handleSubmit, submitErrors, values, form }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            {this.props.formError && (
              <FormError title="Sign up failed">
                {this.props.formError}
              </FormError>
            )}

            <FormElement>
              <InputField
                onKeyPress={preventSpaceOnKeyPress}
                name="username"
                label="Username"
              />
            </FormElement>

            <FormElement>
              <InputField
                onKeyPress={preventSpaceOnKeyPress}
                name="email"
                label="Email address"
              />
            </FormElement>

            <FormElement>
              <InputField type="password" name="password" label="Password" />
            </FormElement>

            <FormActions>
              <FormActionsContent grow={true} verticalAlignCenter={true}>
                <LabeledCheckboxField
                  name="termsConfirmed"
                  staticLabel={true}
                  label={
                    <>
                      I confirm that I have read and agree with the platform's{' '}
                      <a href="/legal/terms-of-use.pdf">terms of use</a>
                    </>
                  }
                />
              </FormActionsContent>
            </FormActions>

            <FormActions>
              <FormActionsContent alignEnd={true}>
                <SubmitButton
                  disabled={false}
                  inProgress={this.props.inProgress}
                  success={this.props.success}
                  progressText="Signing up..."
                  successText="Signed up!"
                >
                  Sign up
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}

export default SignUpForm;
