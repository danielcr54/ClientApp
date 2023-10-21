import React from 'react';
import { RouteComponentProps } from 'react-router';
import qs from 'query-string';
import {
  ScreenContentSection,
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentBody,
  NoContent,
  LoaderOverlay,
  ScreenContentHeaderLayout,
  ScreenContentHeaderStart,
  ScreenContentHeaderEnd
} from '@igg/common';
import { GoSearch } from 'react-icons/go';
import { ListActionBar, ListActionBarItem } from '../shared/ListActionBar';
import { SearchFilter } from '../shared/SearchFilter';
import PaginationLinks from '../shared/PaginationLinks';
import { UserInfoQuery } from '../core/UserInfoQuery';
import { UserModel } from '../core/types';
import { TeamListQuery } from './TeamListQuery';
import { TeamCardList } from './TeamCardList';
import { TeamModel, PageInfo } from './types';

export interface TeamListScreenProps extends RouteComponentProps {
  loading?: boolean;
  searchTerm?: string;
  teams: TeamModel[];
  totalCount?: number;
  pageInfo?: PageInfo;
  currentUser?: UserModel;
  currentTeam?: TeamModel;
}

export function TeamListScreen({
  loading,
  searchTerm,
  teams,
  totalCount,
  pageInfo,
  history,
  currentTeam,
  currentUser
}: TeamListScreenProps) {
  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeaderLayout>
          <ScreenContentHeaderStart>
            <ScreenContentHeading>
              {currentTeam ? 'Teams in the IGGalaxy' : 'Join a team'}
            </ScreenContentHeading>
            <ScreenContentSubheading>
              {currentTeam
                ? 'Search for teams in the IGGalaxy'
                : 'Search for teams on the IG platform to join one or create your own'}
            </ScreenContentSubheading>
          </ScreenContentHeaderStart>

          <ScreenContentHeaderEnd alignBottom={true}>
            <ListActionBar>
              <ListActionBarItem>
                <SearchFilter
                  placeholder="Search Teams"
                  value={searchTerm || ''}
                  onChange={value => {
                    history.push(
                      `?searchTerm=${encodeURIComponent(value || '')}`
                    );
                  }}
                />
              </ListActionBarItem>
            </ListActionBar>
          </ScreenContentHeaderEnd>
        </ScreenContentHeaderLayout>
      </ScreenContentHeader>

      <ScreenContentBody>
        {teams.length ? (
          <LoaderOverlay loading={loading}>
            <TeamCardList
              teams={teams}
              showAddButton={!currentTeam}
              currentUser={currentUser}
            />

            {pageInfo && totalCount && (
              <PaginationLinks
                currentPage={pageInfo.page}
                totalPages={Math.ceil(totalCount / pageInfo.pageSize)}
              />
            )}
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="Nothing found!"
            note="Try searching again!"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function TeamListScreenConnected(props: any) {
  return (
    <UserInfoQuery>
      {currentUser => {
        return (
          <TeamListQuery
            variables={{
              ...qs.parse(props.location.search),
              pageSize: currentUser.team ? 9 : 8
            }}
          >
            {({ teams, totalCount, pageInfo, loading, searchTerm }) => (
              <TeamListScreen
                teams={teams}
                loading={loading}
                totalCount={totalCount}
                pageInfo={pageInfo}
                searchTerm={searchTerm}
                history={props.history}
                location={props.location}
                match={props.match}
                currentTeam={currentUser.team}
                currentUser={currentUser}
              />
            )}
          </TeamListQuery>
        );
      }}
    </UserInfoQuery>
  );
}
export default TeamListScreenConnected;
