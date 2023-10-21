import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Subscribe } from 'unstated';
import { SessionStateContainer } from '@igg/auth';
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
  StaticText
} from '@igg/common';
import { NavLink } from 'react-router-dom';

export interface SignUpScreenProps {
  sessionStateContainer: SessionStateContainer;
}

export class SignUpSuccessScreen extends Component<SignUpScreenProps> {
  render() {
    const { isAuthenticated } = this.props.sessionStateContainer;

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
                <ActionScreenHeading>Preparing to Launch!</ActionScreenHeading>
                <ActionScreenSubheading>
                  We have sent you an email containing a link to confirm your
                  details
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <StaticText>
                <p>
                  Didn't get the email?{' '}
                  <NavLink to="/signup/verify/resend">
                    Request another one
                  </NavLink>
                  .
                </p>
              </StaticText>
            </ActionScreenMainContainer>
          </ActionScreenMain>

          <ActionScreenAside>
            <ActionScreenAsideContainer>
              <NextScreenLink
                to="/login"
                smallLabel="I've already been verified"
                label="Sign in"
              />
            </ActionScreenAsideContainer>
          </ActionScreenAside>
        </ActionScreenContentLayout>
      </ActionScreenLayout>
    );
  }
}

export function SignUpSuccessScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(sessionStateContainer: SessionStateContainer) => (
        <SignUpSuccessScreen sessionStateContainer={sessionStateContainer} />
      )}
    </Subscribe>
  );
}

export default SignUpSuccessScreenConnected;
