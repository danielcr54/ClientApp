import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Subscribe } from 'unstated';
import {
  ActionScreenLayout,
  ActionScreenHeader,
  ActionScreenHeaderStart,
  ActionScreenHeaderEnd,
  ActionScreenLogoutLink,
  ActionScreenContentLayout,
  ActionScreenMain,
  ActionScreenFormContainer,
  ActionScreenContentHeader,
  ActionScreenHeading,
  ActionScreenSubheading,
  ActionScreenAside,
  ActionScreenAsideContainer,
  LogoLink,
  NextScreenLink,
  Divider,
  SocialLoginBlock
} from '@igg/common';
import { SessionStateContainer } from '@igg/auth';
import { SidenoteContainer } from '../shared/SidenoteMessage';
import { UserModel } from '../core/types';
import { KycFormModel } from './types';
import { KycScreenMessageCard } from './KycScreenMessageCard';
import { KycSidenoteMessage } from './KycSidenoteMessage';
import KycForm from './KycForm';

export interface KycScreenProps {
  user: UserModel;
  submit: (form: KycFormModel) => Promise<any>;
  submitting?: boolean;
  submitSuccess?: boolean;
  submitError?: boolean;
  submitErrorMessage?: string;
}

export class KycScreen extends Component<KycScreenProps> {
  handleFormSubmit = (formModel: KycFormModel) => {
    const { submit } = this.props;
    if (typeof submit === 'function') {
      // TODO: Catch the promise for errors
      return submit(formModel);
    }

    return Promise.reject();
  };

  render() {
    const { handleFormSubmit } = this;
    const { user, submitting, submitSuccess } = this.props;

    if (user && user.isKycPassed) return <Redirect to="/" />;

    return (
      <ActionScreenLayout>
        <ActionScreenHeader>
          <ActionScreenHeaderStart>
            <LogoLink to="/" />
          </ActionScreenHeaderStart>
          <ActionScreenHeaderEnd>
            <ActionScreenLogoutLink to="/logout">Logout</ActionScreenLogoutLink>
          </ActionScreenHeaderEnd>
        </ActionScreenHeader>

        <ActionScreenContentLayout>
          <ActionScreenMain>
            <ActionScreenFormContainer>
              <ActionScreenContentHeader>
                <ActionScreenHeading>
                  Welcome to
                  <br /> Intergalactic Gaming
                </ActionScreenHeading>
                <ActionScreenSubheading>
                  We're almost done! Before we move forward, we need to confirm
                  your identity in order for you to join tournaments. We don't
                  store this information and never share it with anyone.
                </ActionScreenSubheading>
              </ActionScreenContentHeader>

              <KycScreenMessageCard />

              <SidenoteContainer>
                <KycSidenoteMessage />
              </SidenoteContainer>

              <KycForm
                onSubmit={handleFormSubmit}
                inProgress={submitting}
                success={submitSuccess}
              />
            </ActionScreenFormContainer>
          </ActionScreenMain>

          <ActionScreenAside />
        </ActionScreenContentLayout>
      </ActionScreenLayout>
    );
  }
}

export function KycScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(sessionStateContainer: SessionStateContainer) => (
        <KycScreen
          // TODO: Deal with a correct model
          user={sessionStateContainer.state.userInfo as UserModel}
          submit={() => Promise.resolve()}
        />
      )}
    </Subscribe>
  );
}

export default KycScreenConnected;
