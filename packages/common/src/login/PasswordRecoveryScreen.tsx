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
  LogoLink
} from '../';
import PasswordRecoveryForm, {
  PasswordRecoveryFormModel
} from './PasswordRecoveryForm';
import { NextScreenLink } from '../NextScreenLink';

export interface PasswordRecoveryScreenProps {
  sessionStateContainer: SessionStateContainer;
}

export interface PasswordRecoveryScreenState {
  inProgress: boolean;
  success: boolean;
  errorMessage?: string;
}

export class PasswordRecoveryScreen extends Component<
  PasswordRecoveryScreenProps,
  PasswordRecoveryScreenState
> {
  state = {
    inProgress: false,
    success: false,
    errorMessage: undefined
  };

  handleFormSubmit = (formModel: PasswordRecoveryFormModel) => {
    this.setState({ inProgress: true, errorMessage: undefined });

    return this.props.sessionStateContainer
      .requestPasswordRecovery(formModel.usernameOrEmail)
      .then(() => this.setState({ inProgress: false, success: true }))
      .catch((e: string) =>
        this.setState({ inProgress: false, success: false, errorMessage: e })
      );
  };

  render() {
    const { props, state, handleFormSubmit } = this;
    const { isAuthenticated } = props.sessionStateContainer;
    const { inProgress, success, errorMessage } = state;

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
                <ActionScreenHeading>Forgot Password</ActionScreenHeading>
                <ActionScreenSubheading>
                  Type your email or username and we'll send you a link to reset
                  your password.
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <PasswordRecoveryForm
                onSubmit={handleFormSubmit}
                inProgress={inProgress}
                success={success}
                errorMessage={errorMessage}
              />
            </ActionScreenMainContainer>
          </ActionScreenMain>

          <ActionScreenAside>
            <ActionScreenAsideContainer>
              <NextScreenLink to="/login" label="Sign in" />
            </ActionScreenAsideContainer>
          </ActionScreenAside>
        </ActionScreenContentLayout>
      </ActionScreenLayout>
    );
  }
}

export default function PasswordRecoveryScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(sessionStateContainer: SessionStateContainer) => (
        <PasswordRecoveryScreen sessionStateContainer={sessionStateContainer} />
      )}
    </Subscribe>
  );
}
