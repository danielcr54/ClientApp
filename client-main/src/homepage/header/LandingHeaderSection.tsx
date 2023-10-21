import React, { Component } from 'react';
import { LandingNav } from '@igg/common';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import background from '../assets/header_img.png';
import ActionContainer from './ActionContainer';

export const HeadingContainer = styled('div')({
  width: '100%',
  height: '50vh',
  display: 'flex',
  alignItems: 'center',
  minHeight: 500,

  [`@media ${deviceScreenQuery.medium}`]: {
    height: 'calc(100vh - 86px)'
  }
});

export const LandingHeaderBackground = styled('div')({
  width: '100%',
  backgroundImage: 'url(' + background + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  backgroundSize: 'cover',
  paddingLeft: 30,
  height: 400,

  [`@media ${deviceScreenQuery.medium}`]: {
    marginBottom: 100,
    paddingLeft: 60,
    height: 600
  },

  [`@media ${deviceScreenQuery.large}`]: {
    backgroundPosition: 'bottom right',
    height: 800
  }
});

export const LandingHeaderContainer = styled('div')({
  width: '100%',
  maxWidth: 1175,
  height: '100%',
  textAlign: 'left',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export const NavPaddingMobile = styled('div')({
  width: '100%',
  padding: '0px 30px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px'
  }
});

export class LandingHeaderSection extends Component {
  render() {
    return (
      <>
        <NavPaddingMobile>
          <LandingNav />
        </NavPaddingMobile>
        <HeadingContainer>
          <LandingHeaderBackground className="fadeout-elements-header">
            <LandingHeaderContainer>
              <ActionContainer />
            </LandingHeaderContainer>
          </LandingHeaderBackground>
        </HeadingContainer>
      </>
    );
  }
}

export default LandingHeaderSection;
