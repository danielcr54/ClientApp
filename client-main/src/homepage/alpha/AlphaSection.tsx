import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentBody,
  ScreenContentHeading,
  ActionScreenSubheading
} from '@igg/common';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import laptop from '../assets/laptop.png';

export const LandingAlphaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0px',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

export const LandingAlphaContent = styled('div')({
  width: '50%',

  [`@media ${deviceScreenQuery.xsmallDown}`]: {
    marginBottom: 35,
    width: '100%'
  }
});

export const AlphaImage = styled('img')({
  width: '100%',
  height: '100%'
});

export const AlphaTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: 120,

  [`@media ${deviceScreenQuery.xsmallDown}`]: {
    paddingRight: 0,

    '& > *': {
      textAlign: 'center'
    }
  }
});

export class AlphaSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <ScreenContentBody>
          <LandingAlphaContainer>
            <LandingAlphaContent>
              <AlphaTextContent>
                <ScreenContentHeading data-cy="aut-l-alpha-header">
                  Alpha Launch Initiated
                </ScreenContentHeading>
                <ActionScreenSubheading data-cy="aut-l-alpha-subheader">
                  Build your profile as a Galactican to participate in
                  tournaments, challenge friends and be part of our valued
                  community.
                </ActionScreenSubheading>
              </AlphaTextContent>
            </LandingAlphaContent>
            <LandingAlphaContent>
              <AlphaImage src={laptop} data-cy="aut-a-alpha-image" />
            </LandingAlphaContent>
          </LandingAlphaContainer>
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default AlphaSection;
