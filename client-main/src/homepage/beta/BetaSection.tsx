import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentBody,
  ScreenContentHeading,
  ButtonNavLink
} from '@igg/common';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import BetaIcon from '../assets/BetaIcon';
import PremiumIcon from '../assets/PremiumIcon';
import GoldIcon from '../assets/GoldIcon';
import EsportsIcon from '../assets/EsportsIcon';
import IconContainer from 'shared/IconContainer';

export const BetaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0px',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

interface BetaContentProps {
  isImageContainer?: boolean;
}

export const BetaContent = styled('div')(
  ({ isImageContainer }: BetaContentProps) => ({
    width: '50%',
    order: isImageContainer ? 1 : 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [`@media ${deviceScreenQuery.xsmallDown}`]: {
      marginBottom: isImageContainer ? 0 : 60,
      width: '100%',
      flexDirection: 'column',
      order: isImageContainer ? 2 : 1
    }
  })
);

export const BetaButtonContainer = styled('div')({
  marginTop: 15
});

export const BetaTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center'
});

export const BetaWidthContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  [`@media ${deviceScreenQuery.large}`]: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export const BetaColumnControl = styled('div')({});

export class BetaSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <ScreenContentBody>
          <BetaContainer>
            <BetaContent isImageContainer={true}  data-cy="aut-a-beta-bullets">
              <BetaWidthContainer>
                <BetaColumnControl>
                  <IconContainer
                    betaSection={true}
                    text="5000 IG Gold (IGG)"
                    icon={GoldIcon}
                  />
                  <IconContainer
                    betaSection={true}
                    text="Exclusive Access to Our Beta Platform"
                    icon={BetaIcon}
                  />
                </BetaColumnControl>
                <BetaColumnControl>
                  <IconContainer
                    betaSection={true}
                    text="Access to Exclusive Esports Competitions"
                    icon={EsportsIcon}
                  />
                  <IconContainer
                    betaSection={true}
                    text="Three Month Free Premium Membership"
                    icon={PremiumIcon}
                  />
                </BetaColumnControl>
              </BetaWidthContainer>
            </BetaContent>
            <BetaContent>
              <BetaTextContent>
                <ScreenContentHeading data-cy="aut-l-beta-header">
                  Exclusive Access to our Beta Platform
                </ScreenContentHeading>
                <BetaButtonContainer>
                  <ButtonNavLink to="/signup" data-cy="aut-b-beta-sign-up">Sign Up</ButtonNavLink>
                </BetaButtonContainer>
              </BetaTextContent>
            </BetaContent>
          </BetaContainer>
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default BetaSection;
