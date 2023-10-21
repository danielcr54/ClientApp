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
  LoaderOverlay
} from '@igg/common';
import { GoSearch } from 'react-icons/go';
import { ListActionBar, ListActionBarItem } from '../shared/ListActionBar';
import PaginationLinks from '../shared/PaginationLinks';
import { SearchFilter } from '../shared/SearchFilter';
import { UserModel } from '../core/types';
import { PageInfo } from '../teams/types';
import { PlayerCardList } from './PlayerCardList';
import { PlayerListQuery } from './PlayerListQuery';

export interface PlayerListScreenProps extends RouteComponentProps {
  loading?: boolean;
  searchTerm?: string;
  players: UserModel[];
  totalCount?: number;
  pageInfo?: PageInfo;
}

export function PlayerListScreen({
  loading,
  searchTerm,
  players,
  totalCount,
  pageInfo,
  history
}: PlayerListScreenProps) {
  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>Find a player</ScreenContentHeading>
        <ScreenContentSubheading>
          Search for players on the IG platform
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        <ListActionBar alignRight={true}>
          <ListActionBarItem>
            <SearchFilter
              placeholder="Search players"
              value={searchTerm}
              onChange={value => {
                history.push(`?searchTerm=${encodeURIComponent(value || '')}`);
              }}
            />
          </ListActionBarItem>
        </ListActionBar>

        {players.length ? (
          <LoaderOverlay loading={loading}>
            <PlayerCardList players={players} />

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
            message="No players found"
            note="Try changing some filter criteria"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function PlayerListScreenConnected(props: any) {
  return (
    <PlayerListQuery
      variables={{ ...qs.parse(props.location.search), pageSize: 9 }}
    >
      {({ loading, searchTerm, players, totalCount, pageInfo }) => (
        <PlayerListScreen
          players={players}
          loading={loading}
          totalCount={totalCount}
          pageInfo={pageInfo}
          searchTerm={searchTerm}
          history={props.history}
          location={props.location}
          match={props.match}
        />
      )}
    </PlayerListQuery>
  );
}

export default PlayerListScreenConnected;
