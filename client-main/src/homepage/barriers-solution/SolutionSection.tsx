import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentHeading,
  ScreenContentBody
} from '@igg/common';
import styled from '@emotion/styled';
import { CardList } from 'shared/card';
import CompetitiveIcon from '../assets/CompetitiveIcon';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import ExtensiveIcon from '../assets/ExtensiveIcon';
import TronIcon from '../assets/TronIcon';
import TokenizedIcon from '../assets/TokenizedIcon';
import SocialIcon from '../assets/SocialIcon';
import GalacticIcon from '../assets/GalacticIcon';
import IconContainer from 'shared/IconContainer';

export const SolutionTitle = styled('div')({
  textAlign: 'center',
  paddingBottom: 20,

  [`@media ${deviceScreenQuery.medium}`]: {
    textAlign: 'left'
  }
});

export const StyledCardList = styled(CardList)({
  display: 'grid',
  gridGap: 16,
  gridRowGap: 0,
  flexWrap: 'wrap',
  gridTemplateColumns: `repeat(2, minmax(150px, 1fr))`,
  padding: 0,

  [`@media ${deviceScreenQuery.medium}`]: {
    gridTemplateColumns: `repeat(3, minmax(270px, 1fr))`
  },

  '&:not(:last-of-type)': {
    marginBottom: 10
  }
});

export class SolutionSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <ScreenContentBody>
          <SolutionTitle>
            <ScreenContentHeading  data-cy="aut-l-solution-header">The Solution</ScreenContentHeading>
          </SolutionTitle>
          <StyledCardList data-cy="aut-a-solution-bullets">
            <IconContainer
              text="Competitive Gaming Ecosystem"
              icon={CompetitiveIcon}
            />
            <IconContainer
              text="Extensive Gamer-Centric Features"
              icon={ExtensiveIcon}
            />
            <IconContainer
              text="TRON Blockchain"
              icon={TronIcon}
            />
            <IconContainer
              text="Tokenized Landscape"
              icon={TokenizedIcon}
            />
            <IconContainer
              text="Social Features"
              icon={SocialIcon}
            />
            <IconContainer
              text="Galactic Grand Exchange"
              icon={GalacticIcon}
            />
          </StyledCardList>
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default SolutionSection;
