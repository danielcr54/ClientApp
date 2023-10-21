import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Subscribe } from 'unstated';
import { SessionStateContainer } from '@igg/auth';
import {
  ActionScreenLayout,
  ActionScreenFormContainer,
  ActionScreenContentHeader,
  ActionScreenHeading,
  ActionScreenSubheading,
  LandingNav,
  ActionScreenAside,
  ActionScreenAsideContainer,
  NextScreenLink,
  ActionScreenContentLayout,
  ActionScreenMain
} from '../';
import LoginForm, { LoginFormModel } from './LoginForm';
import { StarBackground } from '../StarBackground';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const PaddingContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto',
  padding: '0px 30px 50px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px 50px'
  }
});

export const FormContainer = styled('div')({
  marginTop: 50,
  display: 'flex',
  justifyContent: 'center'
});

export interface LoginScreenProps {
  sessionStateContainer: SessionStateContainer;
}

export class LoginScreen extends Component<LoginScreenProps> {
  handleFormSubmit = (loginFormModel: LoginFormModel) => {
    return this.props.sessionStateContainer.login(loginFormModel);
  };

  render() {
    const { props, handleFormSubmit } = this;
    const { state, isAuthenticated } = props.sessionStateContainer;
    const { isAuthenticating, authenticationError } = state;

    if (isAuthenticated()) return <Redirect to="/" />;

    return (
      <>
        <Helmet
          meta=
          {
            [
              {"property": "og:title", "content": "IG | Log In"},
              {"property": "og:url", "content": "https://www.iggalaxy.com"},
              {"property": "og:image", "content": "https://www.iggalaxy.com/ig.png"},
              {"property": "og:description", "content": "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."},
            ]
          }
        >
          <title>IG | Log In</title>
        </Helmet>
        <ActionScreenLayout>
          <StarBackground />
          <PaddingContainer>
            <LandingNav />
            <FormContainer>
              <ActionScreenFormContainer>
                <ActionScreenContentHeader>
                  <ActionScreenHeading>
                    Sign in to the IGGalaxy
                  </ActionScreenHeading>
                  <ActionScreenSubheading>
                    Build a profile of victories alone or with your team to
                    conquer the IGGalaxy! Raise the stakes and compete for cash
                    prizes!
                  </ActionScreenSubheading>
                </ActionScreenContentHeader>

                <LoginForm
                  onSubmit={handleFormSubmit}
                  inProgress={isAuthenticating}
                  formError={authenticationError}
                />
              </ActionScreenFormContainer>
            </FormContainer>
          </PaddingContainer>
          <ActionScreenContentLayout>
            <ActionScreenMain />
            <ActionScreenAside>
              <ActionScreenAsideContainer>
                <NextScreenLink
                  to="/signup"
                  smallLabel="New to the IGGalaxy?"
                  label="Sign Up"
                />
              </ActionScreenAsideContainer>
            </ActionScreenAside>
          </ActionScreenContentLayout>
        </ActionScreenLayout>
      </>
    );
  }
}

export default function LoginScreenConnected() {
  return (
    <Subscribe to={[SessionStateContainer]}>
      {(sessionStateContainer: SessionStateContainer) => (
        <LoginScreen sessionStateContainer={sessionStateContainer} />
      )}
    </Subscribe>
  );
}
