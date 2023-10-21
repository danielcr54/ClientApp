import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Subscribe } from 'unstated';
import {
  ActionScreenLayout,
  ActionScreenHeader,
  ActionScreenContentLayout,
  ActionScreenMain,
  ActionScreenFormContainer,
  ActionScreenContentHeader,
  ActionScreenHeading,
  ActionScreenSubheading,
  ActionScreenAside,
  ActionScreenAsideContainer,
  LogoLink,
  NextScreenLink
} from '@igg/common';
import { SessionStateContainer } from '@igg/auth';
import { SignUpStateContainer } from './SignUpStateContainer';
import { SignUpFormModel } from './types';
import SignUpForm from './SignUpForm';

export interface SignUpScreenProps {
  signUpStateContainer: SignUpStateContainer;
  sessionStateContainer: SessionStateContainer;
}

export class SignUpScreen extends Component<SignUpScreenProps> {
  handleFormSubmit = (formModel: SignUpFormModel) => {
    const { signUpStateContainer } = this.props;
    return signUpStateContainer.signUp(formModel).catch((reason: any) => {
      const { signUpValidationErrors } = signUpStateContainer.state;
      if (signUpValidationErrors) {
        return Promise.resolve(signUpValidationErrors);
      }

      return Promise.reject(reason);
    });
  };

  render() {
    const { props, handleFormSubmit } = this;
    const { isAuthenticated } = props.sessionStateContainer;
    if (isAuthenticated()) return <Redirect to="/" />;

    const {
      isSigningUp,
      isSignUpSuccess,
      signUpError
    } = props.signUpStateContainer.state;
    if (isSignUpSuccess) return <Redirect to="/signup/success" />;

    return (
      <ActionScreenLayout>
        <ActionScreenHeader>
          <LogoLink to="/" />
        </ActionScreenHeader>

        <ActionScreenContentLayout>
          <ActionScreenMain>
            <ActionScreenFormContainer>
              <ActionScreenContentHeader>
                <ActionScreenHeading>Create your Account</ActionScreenHeading>
                <ActionScreenSubheading>
                  Create your account below to access the IGGalaxy
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <SignUpForm
                onSubmit={handleFormSubmit}
                inProgress={isSigningUp}
                success={isSignUpSuccess}
                formError={signUpError}
              />

              {/* <Divider />

              <SocialLoginBlock /> */}
            </ActionScreenFormContainer>
          </ActionScreenMain>

          <ActionScreenAside>
            <ActionScreenAsideContainer>
              <NextScreenLink
                to="/login"
                smallLabel="Already been to the IGGalaxy?"
                label="Sign in"
              />
            </ActionScreenAsideContainer>
          </ActionScreenAside>
        </ActionScreenContentLayout>
      </ActionScreenLayout>
    );
  }
}

export function SignUpScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer, SignUpStateContainer]}>
      {(
        sessionStateContainer: SessionStateContainer,
        signUpStateContainer: SignUpStateContainer
      ) => (
        <SignUpScreen
          signUpStateContainer={signUpStateContainer}
          sessionStateContainer={sessionStateContainer}
        />
      )}
    </Subscribe>
  );
}

export default SignUpScreenConnected;
