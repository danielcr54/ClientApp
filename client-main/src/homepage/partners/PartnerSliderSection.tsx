import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentBody,
  ScreenContentHeader,
  ScreenContentHeading
} from '@igg/common';
import { PartnerSlider } from './PartnerSlider';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';

export const PaddingContainer = styled('div')({
  width: '100%',
  padding: '0px 30px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px'
  }
});

export const StyledScreenContentHeader = styled(ScreenContentHeader)({
  textAlign: 'center',

  [`@media ${deviceScreenQuery.small}`]: {
    textAlign: 'left'
  }
});

export class PartnerSliderSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <PaddingContainer>
          <StyledScreenContentHeader>
            <ScreenContentHeading>Intergalactic Partners</ScreenContentHeading>
          </StyledScreenContentHeader>
        </PaddingContainer>
        <ScreenContentBody>
          <PartnerSlider key={'partner-slider'} />
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default PartnerSliderSection;
