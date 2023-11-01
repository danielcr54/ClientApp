import React, { Component } from 'react';
import {
  ScreenLayout,
  ScreenContent,
  ScreenContentHeading,
  ScreenContentSection,
  StarBackground,
  LandingNav
} from '@igg/common';
import AppFooter from 'core/AppFooter';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import background from './artwork_img.png';
import BetaForm from './BetaForm';
import { BetaFormModel } from './types';
import { BetaStateContainer } from './BetaStateContainer';
import { Subscribe } from '@igg/auth/node_modules/unstated';
import Helmet from 'react-helmet';
import './custom.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { config } from 'config';

export const BetaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0px',
  justifyContent: 'space-between',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

export const BetaContent = styled('div')({
  width: '49%',
  [`@media ${deviceScreenQuery.smallDown}`]: {
    marginBottom: 35,
    width: '100%'
  }
});

export const StyledScreenContentContainer = styled('div')({
  maxWidth: 1300,
  width: '100%',
  margin: '0 auto'
});

export const BetaImage = styled('div')({
  width: '60%',

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '80%',
    marginTop: 60
  }
});

export const FormHeader = styled('div')({
  width: '100%',
  fontSize: 35,
  marginBottom: 20,
  fontWeight: 500
});

export const FormDate = styled('div')({
  width: '100%',
  fontSize: 20,
  marginBottom: 25
});

export const LimitedMaxWidthContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto'
});

export const PaddingContainer = styled('div')({
  width: '100%',
  padding: '0px 30px 50px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px 50px'
  }
});

export function formatDate() {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const date = new Date();
  return date.toLocaleDateString('en-GB', options);
}

export interface BetaSignupScreenProps {
  betaStateContainer: BetaStateContainer;
}

export class BetaSignupScreen extends Component<BetaSignupScreenProps> {
  captcha : any;
  recaptchaToken: string;

  handleFormSubmit = (formModel: BetaFormModel) => {
    const { betaStateContainer } = this.props;
    return betaStateContainer.signUp(formModel, this.recaptchaToken).catch((reason: any) => {
      const { signUpValidationErrors } = betaStateContainer.state;
      if (signUpValidationErrors) {
        return Promise.resolve(signUpValidationErrors);
      }

      return Promise.reject(reason);
    });
  };

  verifyCaptcha = (recaptchaToken: string | null) => {
    if(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    }
  }

  componentDidMount() {
    this.captcha.execute();
  }

  render() {
    const { props, handleFormSubmit } = this;

    const {
      isSigningUp,
      isSignUpSuccess,
      signUpError
    } = props.betaStateContainer.state;

    return (
      <>
        <Helmet
          meta={[
            { property: 'og:title', content: 'IG | Sign Up' },
            { property: 'og:url', content: 'https://www.iggalaxy.com' },
            {
              property: 'og:image',
              content: 'https://www.iggalaxy.com/ig.png'
            },
            {
              property: 'og:description',
              content:
                "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."
            }
          ]}
        >
          <title>IG | Sign Up</title>
        </Helmet>

        <ScreenLayout>
          <StarBackground />
          <LimitedMaxWidthContainer>
            <PaddingContainer>
              <LandingNav />
              <BetaContainer>
                <BetaContent>
                  <ScreenContentHeading>
                    Embrace the Unexpected.
                    <br />
                    Unite the Unknown.
                  </ScreenContentHeading>
                  <BetaImage className="fadeout-element">
                    <img src={background} width="100%" />
                  </BetaImage>
                </BetaContent>
                <BetaContent>
                  <FormHeader>Galactianship Application</FormHeader>
                  <FormDate>Date Issued: {formatDate()}</FormDate>
                  <BetaForm
                    onSubmit={handleFormSubmit}
                    inProgress={isSigningUp}
                    success={isSignUpSuccess}
                    formError={signUpError}
                    captchaRender={() => (
                      <>
                        <ReCAPTCHA
                          ref={(el) => { this.captcha = el}}
                          sitekey={config.reCaptcha.siteKey}
                          size="invisible"
                          onChange={(value) => this.verifyCaptcha(value)}
                        />
                      </>
                    )}
                  />
                </BetaContent>
              </BetaContainer>
            </PaddingContainer>
            <AppFooter />
          </LimitedMaxWidthContainer>
        </ScreenLayout>
      </>
    );
  }
}

export function BetaSignupScreenConnected() {
  return (
    <Subscribe to={[BetaStateContainer]}>
      {(betaStateContainer: BetaStateContainer) => (
        <BetaSignupScreen betaStateContainer={betaStateContainer} />
      )}
    </Subscribe>
  );
}

export default BetaSignupScreenConnected;
