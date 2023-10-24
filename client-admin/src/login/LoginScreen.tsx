import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import { LogoLink, ActionScreenHeading, NextScreenLink } from '@igg/common/lib';
import { Subscribe } from '@igg/auth/node_modules/unstated';
import { SessionStateContainer } from '@igg/auth/lib';
import LoginForm, { LoginFormModel } from './LoginForm';
import LoginImage from './login.png';

export const ScreenContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

export const LoginContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '30px 30px',
  flexDirection: 'column',

  [`@media ${deviceScreenQuery.small}`]: {
    width: '50%'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '30%',
    padding: '30px 60px'
  }
});

export const Header = styled('div')({
  width: '100%',
  height: 50,
  display: 'flex',
  alignItems: 'center'
});

export const HeaderTextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 15
});

const NavLogoBrand = styled('div')({
  fontFamily: 'RadioSpace',
  fontSize: 15,
});

const NavLogoText = styled('div')({
  fontSize: 10,
  textTransform: 'uppercase'
});

const LoginFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%'
});

const ImageContainer = styled('div')({
  backgroundImage: 'url(' + LoginImage + ')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  paddingBottom: 60,
  paddingRight: 60,
  width: '50%',

  [`@media ${deviceScreenQuery.xsmallDown}`]: {
    display: 'none'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '70%'
  }
});

export interface LoginScreenProps {
  sessionStateContainer: SessionStateContainer;
}

export class LoginScreen extends Component<LoginScreenProps> {
  handleFormSubmit = (loginFormModel: LoginFormModel) => {
    loginFormModel.forAdminPanel = true;
    return this.props.sessionStateContainer.login(loginFormModel);
  };

  render() {
    const { props, handleFormSubmit } = this;
    const { state, isAuthenticated } = props.sessionStateContainer;
    const { isAuthenticating, authenticationError } = state;

    if (isAuthenticated()) return <Redirect to="/" />;
    
    return (
      <ScreenContainer>
        <LoginContainer>
          <Header>
            <LogoLink to="/" />
            <HeaderTextContainer>
              <NavLogoBrand>
                Intergalactic Gaming
              </NavLogoBrand>
              <NavLogoText>
                Admin Panel
              </NavLogoText>
            </HeaderTextContainer>
          </Header>
          <LoginFormContainer>
            <ActionScreenHeading>
              Sign In
            </ActionScreenHeading>
            <LoginForm
              onSubmit={handleFormSubmit}
              inProgress={isAuthenticating}
              formError={authenticationError}
            />
          </LoginFormContainer>
        </LoginContainer>
        <ImageContainer>
          <NextScreenLink
            to="/"
            label="Access Webplatform"
          />
        </ImageContainer>
      </ScreenContainer>
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
