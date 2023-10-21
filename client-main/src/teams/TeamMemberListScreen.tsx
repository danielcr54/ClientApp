import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  ScreenContentSection,
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentBody,
  NoContent,
  LoaderOverlay,
  ActionButton
} from '@igg/common';
import { GoSearch } from 'react-icons/go';
import PlayerCardList from '../players/PlayerCardList';
import { TeamMembersSectionNav } from './TeamMembersSectionNav';
import { TeamMembersMetadataQuery } from './TeamMembersMetadataQuery';
import { TeamModel } from './types';

export interface TeamMemberListScreenRouteParams {
  urlSlug: string;
}

export interface TeamMemberListScreenProps {
  loading?: boolean;
  team: TeamModel;
}

export function TeamMemberListScreen({
  loading,
  team
}: TeamMemberListScreenProps) {
  const { members } = team;

  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>{team.name}'s Team Page</ScreenContentHeading>
        <ScreenContentSubheading>
          Here are your fellow Galacticans where you can view their stats
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        <TeamMembersSectionNav team={team} />

        {members && members.length ? (
          <LoaderOverlay loading={loading}>
            <PlayerCardList players={members} />
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="No members currently"
            note="Search for new players to invite or wait for them to send invite requests to join your team"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function TeamMemberListScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TeamMemberListScreenRouteParams>) {
  return (
    <TeamMembersMetadataQuery urlSlug={urlSlug}>
      {({ team, loading }) => (
        <TeamMemberListScreen team={team} loading={loading} />
      )}
    </TeamMembersMetadataQuery>
  );
}

export default TeamMemberListScreenConnected;
