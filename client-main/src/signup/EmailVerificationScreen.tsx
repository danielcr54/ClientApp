import React, { Component } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
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
  NextScreenLink,
  StaticText,
  SpinnerIcon
} from '@igg/common';
import { SessionStateContainer } from '@igg/auth';
import { SignUpStateContainer } from './SignUpStateContainer';

export interface SignUpScreenProps {
  signUpStateContainer: SignUpStateContainer;
  sessionStateContainer: SessionStateContainer;
  emailVerificationToken?: string;
}

export class EmailVerificationScreen extends Component<SignUpScreenProps> {
  componentDidMount() {
    const { signUpStateContainer, emailVerificationToken } = this.props;
    if (!emailVerificationToken) {
      signUpStateContainer.setState({
        verifyEmailError: "Email verification token isn't provided"
      });
      return;
    }

    signUpStateContainer.verifyEmail({
      emailVerificationToken
    });
  }

  render() {
    const { props } = this;
    const {
      isVerifyingEmail,
      verifyEmailError
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
                <ActionScreenHeading>Email Verification</ActionScreenHeading>
                <ActionScreenSubheading>
                  {isVerifyingEmail
                    ? "Please wait while we're trying to verify your email..."
                    : verifyEmailError
                    ? 'The email verification failed for some reason.'
                    : 'Your email address has been successfully verified'}
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              {isVerifyingEmail ? (
                <StaticText>
                  <SpinnerIcon size={50} />
                </StaticText>
              ) : verifyEmailError ? (
                <StaticText>
                  <p>
                    No worries!{' '}
                    <NavLink to="/signup/verify/resend">
                      Request another link
                    </NavLink>
                    .
                  </p>
                </StaticText>
              ) : (
                <StaticText>
                  <p>
                    Head right to <NavLink to="/login">Login</NavLink>.
                  </p>
                </StaticText>
              )}
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

export interface EmailVerificationScreenRouteParams {
  emailVerificationToken?: string;
}

export function EmailVerificationScreenConnected({
  match
}: RouteComponentProps<EmailVerificationScreenRouteParams>) {
  return (
    <Subscribe to={[SessionStateContainer, SignUpStateContainer]}>
      {(
        sessionStateContainer: SessionStateContainer,
        signUpStateContainer: SignUpStateContainer
      ) => (
        <EmailVerificationScreen
          signUpStateContainer={signUpStateContainer}
          sessionStateContainer={sessionStateContainer}
          emailVerificationToken={match.params.emailVerificationToken}
        />
      )}
    </Subscribe>
  );
}

export default withRouter(EmailVerificationScreenConnected);
