import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IoIosSearch } from 'react-icons/io';
import {
  ScreenContentSection,
  NoContent,
  ButtonNavLink,
  LoadingScreen,
  StretchToContainer
} from '@igg/common';
import {
  ActionBlock,
  ActionBlockMain,
  ActionBlockContent,
  ActionBlockHeading,
  ActionBlockText,
  ActionBlockActions
} from '../shared/ActionBlock';
import { CardList, CardListItem } from '../shared/card';
import {
  DetailsScreenSection,
  DetailsScreenSectionMain,
  DetailsScreenSectionAside,
  DetailsScreenSectionHeader,
  DetailsScreenSectionBody
} from '../shared/detailsScreenElements';
import CardLikeButton from '../shared/CardLikeButton';
import { UserModel } from '../core/types';
import { UserInfoQuery } from '../core/UserInfoQuery';
import { PlayerCard } from '../players/PlayerCard';
import { PlayerCardList } from '../players/PlayerCardList';
import { TeamDetailsQuery } from './TeamDetailsQuery';
import { TeamCard } from './TeamCard';
import { TeamModel } from './types';

export interface TeamDetailsScreenRouteParams {
  urlSlug: string;
}

export interface TeamDetailsScreenProps {
  team: TeamModel;
  currentUser: UserModel;
}

export function TeamDetailsScreen({
  team,
  currentUser
}: TeamDetailsScreenProps) {
  const isOwnerView = team.owner && currentUser.id === team.owner.id;
  const isTeamMemberView =
    (team.members && team.members.some(m => m.id === currentUser.id)) || false;

  return (
    <ScreenContentSection>
      <DetailsScreenSection>
        <DetailsScreenSectionBody>
          <DetailsScreenSectionMain>
            <StretchToContainer>
              <TeamCard
                team={team}
                detailsLayout={true}
                allowJoin={!isTeamMemberView && !currentUser.team}
                currentUser={currentUser}
              />
            </StretchToContainer>
          </DetailsScreenSectionMain>

          <DetailsScreenSectionAside>
            {team.owner && (
              <StretchToContainer>
                <PlayerCard player={team.owner} contextLabel="Team Owner" />
              </StretchToContainer>
            )}
          </DetailsScreenSectionAside>
        </DetailsScreenSectionBody>
      </DetailsScreenSection>

      <DetailsScreenSection>
        <DetailsScreenSectionBody>
          <DetailsScreenSectionMain>
            <DetailsScreenSectionHeader>
              Members ({team.members ? team.members.length : 0})
            </DetailsScreenSectionHeader>

            {isOwnerView &&
              !!team.inviteRequests &&
              !!team.inviteRequests.length && (
                <ActionBlock>
                  <ActionBlockMain>
                    <ActionBlockContent mobileAlignCenter={true}>
                      <ActionBlockHeading>
                        {team.inviteRequests.length} invite request
                        {team.inviteRequests.length > 1 ? 's' : ''}
                      </ActionBlockHeading>
                      <ActionBlockText>
                        Overview your team's invite requests and either accept
                        new players or reject them.
                      </ActionBlockText>
                      <ActionBlockActions>
                        <ButtonNavLink
                          to={`/teams/${team.urlSlug}/members/invite-requests`}
                        >
                          View requests
                        </ButtonNavLink>
                      </ActionBlockActions>
                    </ActionBlockContent>
                  </ActionBlockMain>
                </ActionBlock>
              )}

            <CardList>
              {isOwnerView && (
                <CardListItem>
                  <CardLikeButton
                    to={`/teams/${team.urlSlug}/members/search`}
                    icon={<IoIosSearch />}
                    label="Search for new players"
                    // sublabel="200 players available"
                    sublabel="to invite to your team"
                    data-cy="aut-b-search-players"
                  />
                </CardListItem>
              )}

              {team.members && team.members.length ? (
                <PlayerCardList
                  players={team.members}
                  currentUser={currentUser}
                  isOwnerView={isOwnerView}
                />
              ) : (
                <NoContent message="No team members yet" />
              )}
            </CardList>
          </DetailsScreenSectionMain>

          <DetailsScreenSectionAside>
            {/* <DetailsScreenSectionHeader>
              Upcoming match
            </DetailsScreenSectionHeader>

            <NoContent
              message="Tournament data will be here"
              note="Under construction, hang tight!"
            /> */}
          </DetailsScreenSectionAside>
        </DetailsScreenSectionBody>
      </DetailsScreenSection>
    </ScreenContentSection>
  );
}

export function TeamDetailsScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TeamDetailsScreenRouteParams>) {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {userInfo => (
        <TeamDetailsQuery
          urlSlug={urlSlug}
          renderLoading={() => <LoadingScreen />}
        >
          {team => <TeamDetailsScreen team={team} currentUser={userInfo} />}
        </TeamDetailsQuery>
      )}
    </UserInfoQuery>
  );
}

export default TeamDetailsScreenConnected;
