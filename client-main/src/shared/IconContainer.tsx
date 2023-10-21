import React, { Component, ComponentType } from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';

export const ImageTextContainer = styled('div')(({ betaSection }: IconContainerProps) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 25,
  alignSelf: 'flex-start',
  flexDirection: betaSection ? 'row' : 'column',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
}));

export const IconImage = styled('div')(({ betaSection }: IconContainerProps) => ({
  marginRight: betaSection ? 20 : 0,
  width: betaSection ? 52 : 40,
  height: betaSection ? 52 : 40,
  minWidth: betaSection ? 52 : 40,
  backgroundColor: betaSection ? '#3c3554' : 'transparent',
  borderRadius: betaSection ? 13 : 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: betaSection ? 0 : 10,

  [`@media ${deviceScreenQuery.medium}`]: {
    marginRight: betaSection ? 20 : 15,
    marginBottom: 0
  }
}));

export const IconText = styled('div')(({ betaSection }: IconContainerProps) => ({
  fontSize: 17,
  lineHeight: 1.5,
  textAlign: betaSection ? 'left' : 'center',

  [`@media ${deviceScreenQuery.medium}`]: {
    textAlign: 'left'
  }
}));

export interface IconContainerProps {
  betaSection?: boolean;
  text?: string;
  icon?: ComponentType;
}

export class IconContainer extends Component<IconContainerProps> {
  render() {
    const {
      betaSection, text, icon
    } = this.props;

    const Icon = icon;

    return (
      <ImageTextContainer betaSection={betaSection}>
        <IconImage betaSection={betaSection}>
          {Icon && <Icon />}
        </IconImage>
        <IconText betaSection={betaSection}>{ text }</IconText>
      </ImageTextContainer>
    );
  }
}

export default IconContainer;
