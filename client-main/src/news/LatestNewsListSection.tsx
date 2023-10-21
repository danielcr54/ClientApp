import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentBody,
  ButtonNavLink
} from '@igg/common';
import { NewsCardList } from './NewsCardList';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';

export const LatestNewsHeadingContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '150px',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '80px'
  },

  [`@media ${deviceScreenQuery.xsmallDown}`]: {
    '& > *': {
      textAlign: 'center'
    }
  }
});

export const LatestNewsButtonContainer = styled('div')({
  [`@media ${deviceScreenQuery.small}`]: {
    alignSelf: 'flex-end'
  }
});

export class LatestNewsListSection extends Component {

  render() {
    return (
      <>
        <ScreenContentSection>
          <ScreenContentHeader>
            <LatestNewsHeadingContainer>
              <ScreenContentHeading data-cy="aut-l-latest-news-header">Latest News</ScreenContentHeading>
              <LatestNewsButtonContainer>
                <ButtonNavLink to="/news" inverse={true} data-cy="aut-b-view-all-news">View all</ButtonNavLink>
              </LatestNewsButtonContainer>
            </LatestNewsHeadingContainer>
          </ScreenContentHeader>

          <ScreenContentBody>
            <NewsCardList />
          </ScreenContentBody>
        </ScreenContentSection>
      </>
    );
  }
}

export default LatestNewsListSection;