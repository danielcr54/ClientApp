import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentHeading,
  ScreenContentBody
} from '@igg/common';
import styled from '@emotion/styled';
import { CardList } from 'shared/card';
import FragmentsIcon from '../assets/FragmentsIcon';
import GamerIcon from '../assets/GamerIcon';
import BalanceIcon from '../assets/BalanceIcon';
import KeyIcon from '../assets/KeyIcon';
import StereoIcon from '../assets/StereoIcon';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import IconContainer from 'shared/IconContainer';

export const BarriersTitle = styled('div')({
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

export class BarriersSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <ScreenContentBody>
          <BarriersTitle>
            <ScreenContentHeading data-cy="aut-l-barriers-header">The Barriers</ScreenContentHeading>
          </BarriersTitle>
          <StyledCardList data-cy="aut-a-barriers-bullets">
            <IconContainer
              text="Accessibility"
              icon={KeyIcon}
            />
            <IconContainer
              text="Gamer Retention"
              icon={GamerIcon}
            />
            <IconContainer
              text="Fragmented Landscape"
              icon={FragmentsIcon}
            />
            <IconContainer
              text="Instability"
              icon={BalanceIcon}
            />
            <IconContainer
              text="Stereotypes"
              icon={StereoIcon}
            />
          </StyledCardList>
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default BarriersSection;
