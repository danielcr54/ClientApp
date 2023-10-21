import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ScreenContentHeading, ActionScreenSubheading } from '@igg/common/lib';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';

export const TokenTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'center',

  [`@media ${deviceScreenQuery.small}`]: {
    textAlign: 'left'
  }
});

export interface TokenSliderContentProps {
  heading: string;
  text: string;
}

export class TokenSliderContent extends Component<TokenSliderContentProps> {
  render() {
    const {
      heading, text
    } = this.props;

    return (
      <TokenTextContent>
        <ScreenContentHeading>{ heading }</ScreenContentHeading>
        <ActionScreenSubheading>{ text }</ActionScreenSubheading>
      </TokenTextContent>
    );
  }
}

export default TokenSliderContent;
