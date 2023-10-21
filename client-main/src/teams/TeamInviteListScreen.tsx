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
  ActionButton,
  ModalAlertDialog
} from '@igg/common';
import { GoSearch } from 'react-icons/go';
import { getErrorMessage } from '../shared/errorHelpers';
import { UserModel } from '../core/types';
import PlayerCardList from '../players/PlayerCardList';
import { TeamMembersSectionNav } from './TeamMembersSectionNav';
import {
  TeamMembersMetadataQuery,
  TEAM_MEMBERS_METADATA_QUERY
} from './TeamMembersMetadataQuery';
import { TeamModel, TeamInviteModel } from './types';
import { RevokeTeamInviteMutation } from './mutations/teamInviteMutations';

// Helper

function renderItemActionsBlock(
  invites: TeamInviteModel[],
  team: TeamModel,
  user: UserModel
) {
  const teamInvite = invites.find(
    invite => invite.userId === user.id && invite.teamId === team.id
  );

  if (!teamInvite) return null;

  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <RevokeTeamInviteMutation
          onError={error => alert(getErrorMessage(error))}
        >
          {(revokeTeamInvite, { loading, error, data }) => (
            <ActionButton
              block={true}
              small={true}
              onClick={() =>
                revokeTeamInvite({
                  variables: {
                    input: {
                      teamInviteId: teamInvite.id
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
              progressText="Revoking..."
              success={
                !!(
                  data &&
                  data.revokeTeamInvite &&
                  data.revokeTeamInvite.teamInvite
                )
              }
              successText="Revoked!"
              error={!!error}
              errorText="Couldn't revoke an invite"
            >
              Revoke
            </ActionButton>
          )}
        </RevokeTeamInviteMutation>
      )}
    </ModalAlertDialog>
  );
}

export interface TeamInviteListScreenRouteParams {
  urlSlug: string;
}

export interface TeamInviteListScreenProps {
  loading?: boolean;
  team: TeamModel;
}

export function TeamInviteListScreen({
  loading,
  team
}: TeamInviteListScreenProps) {
  const { invites } = team;

  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>
          {team.name}'s Outgoing Invitations
        </ScreenContentHeading>
        <ScreenContentSubheading>
          Send invitations to Galacticans in the IGGalaxy
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        <TeamMembersSectionNav team={team} />

        {invites && invites.length ? (
          <LoaderOverlay loading={loading}>
            <PlayerCardList
              players={invites.map(invite => invite.user)}
              renderItemActionsBlock={player =>
                renderItemActionsBlock(invites, team, player)
              }
            />
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="No Galactic Recruits found"
            note="Search for new players or wait for them to send invite requests to join your team"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function TeamInviteListScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TeamInviteListScreenRouteParams>) {
  return (
    <TeamMembersMetadataQuery urlSlug={urlSlug}>
      {({ team, loading }) => (
        <TeamInviteListScreen team={team} loading={loading} />
      )}
    </TeamMembersMetadataQuery>
  );
}

export default TeamInviteListScreenConnected;
