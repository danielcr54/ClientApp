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
  LoadingScreen,
  ActionButton,
  ModalAlertDialog
} from '@igg/common';
import { GoSearch } from 'react-icons/go';
import { UserModel } from '../core/types';
import { UserInfoQuery } from '../core/UserInfoQuery';
import PaginationLinks from '../shared/PaginationLinks';
import { getErrorMessage } from '../shared/errorHelpers';
import PlayerCardList from '../players/PlayerCardList';
import { PlayerListQuery } from '../players/PlayerListQuery';
import { TeamMembersSectionNav } from './TeamMembersSectionNav';
import {
  TeamMembersMetadataQuery,
  TEAM_MEMBERS_METADATA_QUERY
} from './TeamMembersMetadataQuery';
import { TeamModel, PageInfo } from './types';
import { InviteToTeamMutation } from './mutations/teamInviteMutations';
import { ListActionBar, ListActionBarItem } from 'shared/ListActionBar';
import { SearchFilter } from 'shared/SearchFilter';

// Helpers

function renderPlayerActionsBlock(
  currentUser: UserModel,
  player: UserModel,
  team: TeamModel
) {
  if (player.team) return null;

  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <InviteToTeamMutation onError={error => alert(getErrorMessage(error))}>
          {(inviteToTeam, { loading, error, data }) => (
            <>
              {currentUser.teamId !== player.teamId && (
                <ActionButton
                  block={true}
                  secondary={true}
                  onClick={() =>
                    inviteToTeam({
                      variables: {
                        input: {
                          teamId: team.id,
                          userId: player.id
                        }
                      },
                      refetchQueries: [
                        {
                          query: TEAM_MEMBERS_METADATA_QUERY,
                          variables: { urlSlug: team.urlSlug }
                        }
                      ]
                    })
                  }
                  inProgress={loading}
                  progressText="Inviting..."
                  success={
                    !!(
                      data &&
                      data.inviteToTeam &&
                      data.inviteToTeam.teamInvite
                    )
                  }
                  successText="Invite has been issued!"
                  error={!!error}
                  errorText="Couldn't issue an invite"
                  data-cy="aut-b-invite-to-join"
                >
                  Invite to join your team
                </ActionButton>
              )}
              { currentUser.teamId === player.teamId &&
                <ActionButton
                  block={true}
                  secondary={true}
                  success={true}
                  successText="Already in the team"
                >
                  Invite to join your team
                </ActionButton>
              }
            </>
          )}
        </InviteToTeamMutation>
      )}
    </ModalAlertDialog>
  );
}

export interface TeamPlayerSearchScreenRouteParams {
  urlSlug: string;
}

export interface TeamPlayerSearchScreenProps extends RouteComponentProps {
  loading?: boolean;
  team: TeamModel;
  players?: UserModel[];
  currentUser: UserModel;
  totalCount?: number;
  pageInfo?: PageInfo;
  searchTerm?: string;
  onSearchTermChange?: (searchTerm?: string) => void;
}

export function TeamPlayerSearchScreen({
  loading,
  team,
  currentUser,
  players,
  pageInfo,
  totalCount,
  searchTerm,
  history
}: TeamPlayerSearchScreenProps) {
  const { members } = team;

  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>Explore the IGGalaxy</ScreenContentHeading>
        <ScreenContentSubheading>
          Search for players in the IGGalaxy
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        <TeamMembersSectionNav team={team} />

        <ListActionBar>
          <ListActionBarItem>
            <SearchFilter
              placeholder="Search Players"
              value={searchTerm || ''}
              onChange={value => {
                history.push(`?searchTerm=${encodeURIComponent(value || '')}`);
              }}
            />
          </ListActionBarItem>
        </ListActionBar>

        {players && players.length ? (
          <LoaderOverlay loading={loading}>
            <PlayerCardList
              currentUser={currentUser}
              players={players}
              renderItemActionsBlock={player =>
                renderPlayerActionsBlock(currentUser, player, team)
              }
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
            message="Nothing Found!"
            note="Try searching again!"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function TeamPlayerSearchScreenConnected({
  match,
  history,
  location
}: RouteComponentProps<TeamPlayerSearchScreenRouteParams>) {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => (
        <TeamMembersMetadataQuery urlSlug={match.params.urlSlug}>
          {({ team, loading }) => {
            const queryParams = qs.parse(location.search);

            return (
              <PlayerListQuery variables={{ ...queryParams, pageSize: 9 }}>
                {({
                  players,
                  totalCount,
                  pageInfo,
                  searchTerm,
                  loading: playersLoading
                }) => (
                  <TeamPlayerSearchScreen
                    team={team}
                    currentUser={userInfo}
                    players={players}
                    loading={loading || playersLoading}
                    totalCount={totalCount}
                    pageInfo={pageInfo}
                    searchTerm={searchTerm}
                    history={history}
                    location={location}
                    match={match}
                  />
                )}
              </PlayerListQuery>
            );
          }}
        </TeamMembersMetadataQuery>
      )}
    </UserInfoQuery>
  );
}

export default TeamPlayerSearchScreenConnected;
