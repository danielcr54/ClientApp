import React, { Component } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { Subscribe } from 'unstated';
import {
  ActionScreenLayout,
  ActionScreenHeader,
  ActionScreenContentLayout,
  ActionScreenMain,
  ActionScreenMainContainer,
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
import EmailVerificationResendForm, {
  EmailVerificationResendFormModel
} from './EmailVerificationResendForm';

export interface SignUpScreenProps {
  signUpStateContainer: SignUpStateContainer;
  sessionStateContainer: SessionStateContainer;
}

export class EmailVerificationResendScreen extends Component<
  SignUpScreenProps
> {
  handleResendFormSubmit = (formModel: EmailVerificationResendFormModel) => {
    const { signUpStateContainer } = this.props;
    return signUpStateContainer.resendVerificationLink(
      formModel.usernameOrEmail
    );
  };

  render() {
    const { props, handleResendFormSubmit } = this;
    const {
      isSendingLink,
      isLinkResendSuccess
    } = props.signUpStateContainer.state;
    const { isAuthenticated } = props.sessionStateContainer;

    // TODO: Should instead check if authenticated user has email confirmed
    if (isAuthenticated()) return <Redirect to="/" />;

    return (
      <ActionScreenLayout>
        <ActionScreenHeader>
          <LogoLink to="/" />
        </ActionScreenHeader>

        <ActionScreenContentLayout>
          <ActionScreenMain>
            <ActionScreenMainContainer>
              <ActionScreenContentHeader>
                <ActionScreenHeading>
                  Request an email verification link
                </ActionScreenHeading>
                <ActionScreenSubheading>
                  Didn't get your email confirmation link? No worries, we'll
                  send another one in a bit. Just provide your username or
                  email.
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <EmailVerificationResendForm
                onSubmit={handleResendFormSubmit}
                inProgress={isSendingLink}
                success={isLinkResendSuccess}
              />
            </ActionScreenMainContainer>
          </ActionScreenMain>

          <ActionScreenAside>
            <ActionScreenAsideContainer>
              <NextScreenLink
                to="/login"
                smallLabel="Already verified your email?"
                label="Sign in"
              />
            </ActionScreenAsideContainer>
          </ActionScreenAside>
        </ActionScreenContentLayout>
      </ActionScreenLayout>
    );
  }
}

export function EmailVerificationResendScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer, SignUpStateContainer]}>
      {(
        sessionStateContainer: SessionStateContainer,
        signUpStateContainer: SignUpStateContainer
      ) => (
        <EmailVerificationResendScreen
          signUpStateContainer={signUpStateContainer}
          sessionStateContainer={sessionStateContainer}
        />
      )}
    </Subscribe>
  );
}

export default EmailVerificationResendScreenConnected;
