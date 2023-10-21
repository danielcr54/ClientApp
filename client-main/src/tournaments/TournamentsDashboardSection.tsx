import React, { Component } from 'react';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSection,
  ScreenContentBody,
  LoadingScreen
} from '@igg/common';
import { TournamentCardList } from './TournamentCardList';
import { FifaTournamentListQuery } from './data/FifaTournamentListQuery';
import { UserInfoQuery } from '../core/UserInfoQuery';

export class TournamentsDashboardSection extends Component {
  render() {
    return (
      <UserInfoQuery
        renderLoading={() => <LoadingScreen />}
        forceRefetch={true}
      >
        {currentUser => (
          <FifaTournamentListQuery
            variables={{ pageSize: 6 }}
            renderLoading={() => <LoadingScreen />}
          >
            {({ tournaments, totalCount, pageInfo, loading }) => (
              <ScreenContentSection>
                <ScreenContentHeader>
                  <ScreenContentHeading>Tournaments</ScreenContentHeading>
                </ScreenContentHeader>

                <ScreenContentBody>
                  <TournamentCardList
                    tournaments={tournaments}
                    currentUser={currentUser}
                  />
                </ScreenContentBody>
              </ScreenContentSection>
            )}
          </FifaTournamentListQuery>
        )}
      </UserInfoQuery>
    );
  }
}

export default TournamentsDashboardSection;
