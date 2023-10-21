import React, { Component } from 'react';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';
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
import PasswordResetForm, { PasswordResetFormModel } from './PasswordResetForm';
import { NextScreenLink } from '../NextScreenLink';

export interface PasswordResetScreenProps {
  passwordResetToken: string;
  sessionStateContainer: SessionStateContainer;
}

export interface PasswordResetScreenState {
  inProgress: boolean;
  success: boolean;
}

export class PasswordResetScreen extends Component<
  PasswordResetScreenProps,
  PasswordResetScreenState
> {
  state = {
    inProgress: false,
    success: false
  };

  handleFormSubmit = (formModel: PasswordResetFormModel) => {
    const { passwordResetToken, sessionStateContainer } = this.props;

    this.setState({ inProgress: true });

    return sessionStateContainer
      .resetPassword({
        password: formModel.password,
        passwordResetToken
      })
      .then(() => {
        this.setState({ inProgress: false, success: true });
      })
      .catch(() => {
        this.setState({ inProgress: false });
      });
  };

  render() {
    const { props, state, handleFormSubmit } = this;
    const { isAuthenticated } = props.sessionStateContainer;
    const { inProgress, success } = state;

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
                <ActionScreenHeading>Password Reset</ActionScreenHeading>
                <ActionScreenSubheading>
                  Type in the new password
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <PasswordResetForm
                onSubmit={handleFormSubmit}
                inProgress={inProgress}
                success={success}
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

export interface PasswordResetScreenRouteParams {
  passwordResetToken: string;
}

export function PasswordResetScreenConnected({
  match
}: RouteComponentProps<PasswordResetScreenRouteParams>) {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(sessionStateContainer: SessionStateContainer) => (
        <PasswordResetScreen
          sessionStateContainer={sessionStateContainer}
          passwordResetToken={match.params.passwordResetToken}
        />
      )}
    </Subscribe>
  );
}

export default withRouter(PasswordResetScreenConnected);
