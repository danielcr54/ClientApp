import React from 'react';
import { ScreenContentSection, NoContent, LoadingScreen } from '@igg/common';
import {
  DetailsScreenSection,
  DetailsScreenSectionMain,
  DetailsScreenSectionAside,
  DetailsScreenSectionBody,
  DetailsScreenSectionHeader,
  DetailsCardContainer
} from '../shared/detailsScreenElements';
import { PlayerCard } from './PlayerCard';
import { UserModel } from '../core/types';
import PlayerAvailabilityCard from './PlayerAvailabilityCard';
import TeamCard from '../teams/TeamCard';
import { UserInfoQuery } from '../core/UserInfoQuery';
import { RouteComponentProps } from 'react-router';
import { PlayerDetailsQuery } from './PlayerDetailsQuery';

export interface PlayerDetailsScreenRouteParams {
  username: string;
}

export interface PlayerDetailsScreenProps {
  player: UserModel;
  currentUser: UserModel;
}

export function PlayerDetailsScreen({
  player,
  currentUser
}: PlayerDetailsScreenProps) {
  const isOwnerView =
    player.team && player.team.owner && player.team.owner.id === currentUser.id;
  const isTeamMemberView =
    (player.team &&
      player.team.members &&
      player.team.members.some(m => m.id === currentUser.id)) ||
    false;

  return (
    <ScreenContentSection>
      <DetailsScreenSection>
        <DetailsScreenSectionBody>
          <DetailsScreenSectionMain>
            <DetailsCardContainer>
              <PlayerCard
                player={player}
                detailsLayout={true}
                isOwnerView={isOwnerView}
                isTeamMemberView={isTeamMemberView}
                currentUser={currentUser}
                contextLabel={
                  player.team
                    ? player.teamRole
                      ? `Main role: ${player.teamRole}`
                      : ''
                    : player.id === currentUser.id
                    ? ''
                    : `${player.displayName} is available for your team`
                }
              />
            </DetailsCardContainer>

            <div>
              <DetailsScreenSectionHeader>
                Tournament Experience
              </DetailsScreenSectionHeader>

              <NoContent
                message={`${
                  player.displayName
                } has not participated in any tournaments yet.`}
              />
            </div>
          </DetailsScreenSectionMain>

          <DetailsScreenSectionAside>
            {player.team ? (
              <TeamCard
                team={player.team}
                currentUser={currentUser}
                contextLabel={`${player.displayName}'s team`}
              />
            ) : (
              currentUser.team && (
                <PlayerAvailabilityCard
                  player={player}
                  team={currentUser.team}
                />
              )
            )}
          </DetailsScreenSectionAside>
        </DetailsScreenSectionBody>
      </DetailsScreenSection>
    </ScreenContentSection>
  );
}

export function PlayerDetailsScreenConnected({
  match: {
    params: { username }
  }
}: RouteComponentProps<PlayerDetailsScreenRouteParams>) {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => (
        <PlayerDetailsQuery
          username={username}
          renderLoading={() => <LoadingScreen />}
        >
          {player => (
            <PlayerDetailsScreen player={player} currentUser={userInfo} />
          )}
        </PlayerDetailsQuery>
      )}
    </UserInfoQuery>
  );
}

export default PlayerDetailsScreenConnected;
