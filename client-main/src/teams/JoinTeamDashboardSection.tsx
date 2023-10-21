import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { History } from 'history';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentSection,
  ScreenContentBody,
  ButtonNavLink,
  ScreenContentHeaderLayout,
  ScreenContentHeaderStart,
  ScreenContentHeaderEnd
} from '@igg/common';
import { ListActionBar, ListActionBarItem } from '../shared/ListActionBar';
import { SearchFilter } from '../shared/SearchFilter';
import { UserModel } from '../core/types';
import { TeamCardList } from './TeamCardList';
import { TeamListQuery } from './TeamListQuery';
import { TeamModel } from './types';

export interface JoinTeamDashboardSectionProps {
  currentUser: UserModel;
  teams: TeamModel[];
  // TODO: Refactor and pass a callback accepting filter params instead
  history: History;
}

export function JoinTeamDashboardSection({
  currentUser,
  teams,
  history
}: JoinTeamDashboardSectionProps) {
  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeaderLayout>
          <ScreenContentHeaderStart>
            <ScreenContentHeading>Join a Team</ScreenContentHeading>
            <ScreenContentSubheading>
              Search for teams in the IGGalaxy to join or establish your own
            </ScreenContentSubheading>
          </ScreenContentHeaderStart>

          <ScreenContentHeaderEnd alignBottom={true}>
            <ListActionBar>
              <ListActionBarItem>
                <SearchFilter
                  placeholder="Search Teams"
                  onSubmit={value => {
                    history.push(
                      `/teams?searchTerm=${encodeURIComponent(value || '')}`
                    );
                  }}
                />
              </ListActionBarItem>

              <ListActionBarItem grow={false}>
                <ButtonNavLink to="/teams" small={true} inverse={true}>
                  View all teams
                </ButtonNavLink>
              </ListActionBarItem>
            </ListActionBar>
          </ScreenContentHeaderEnd>
        </ScreenContentHeaderLayout>
      </ScreenContentHeader>

      <ScreenContentBody>
        <TeamCardList
          teams={teams}
          showAddButton={true}
          currentUser={currentUser}
        />
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export interface JoinTeamDashboardSectionConnectedProps
  extends RouteComponentProps {
  currentUser: UserModel;
}

export function JoinTeamDashboardSectionConnected({
  history,
  currentUser
}: JoinTeamDashboardSectionConnectedProps) {
  return (
    <TeamListQuery
      variables={{
        page: 1,
        pageSize: 5
      }}
    >
      {({ teams }) => (
        <JoinTeamDashboardSection
          currentUser={currentUser}
          teams={teams}
          history={history}
        />
      )}
    </TeamListQuery>
  );
}

export default withRouter(JoinTeamDashboardSectionConnected);
