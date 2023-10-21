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
  ButtonRow,
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
import { TeamModel, TeamInviteRequestModel } from './types';
import {
  AcceptTeamInviteRequestMutation,
  RejectTeamInviteRequestMutation
} from './mutations/teamInviteRequestMutations';

// Helper

function renderItemActionsBlock(
  inviteRequests: TeamInviteRequestModel[],
  team: TeamModel,
  user: UserModel
) {
  const teamInviteRequest = inviteRequests.find(
    inviteRequest =>
      inviteRequest.userId === user.id && inviteRequest.teamId === team.id
  );

  if (!teamInviteRequest) return null;

  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <AcceptTeamInviteRequestMutation
          onError={error => alert(getErrorMessage(error))}
        >
          {(
            acceptTeamInviteRequest,
            { loading: accepting, error: acceptError, data: acceptData }
          ) => {
            return (
              <RejectTeamInviteRequestMutation
                onError={error => alert(getErrorMessage(error))}
              >
                {(
                  rejectTeamInviteRequest,
                  { loading: rejecting, error: rejectError, data: rejectData }
                ) => {
                  return (
                    <ButtonRow>
                      <ActionButton
                        block={true}
                        small={true}
                        secondary={true}
                        onClick={() =>
                          acceptTeamInviteRequest({
                            variables: {
                              input: {
                                teamInviteRequestId: teamInviteRequest.id
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
                        inProgress={accepting}
                        progressText="Accepting..."
                        success={
                          !!(
                            acceptData &&
                            acceptData.acceptTeamInviteRequest &&
                            acceptData.acceptTeamInviteRequest.teamInviteRequest
                          )
                        }
                        successText="Invite issued!"
                        error={!!acceptError}
                        errorText="Couldn't accept a request"
                      >
                        Accept
                      </ActionButton>

                      <ActionButton
                        block={true}
                        small={true}
                        inverse={true}
                        onClick={() =>
                          rejectTeamInviteRequest({
                            variables: {
                              input: {
                                teamInviteRequestId: teamInviteRequest.id
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
                        inProgress={rejecting}
                        progressText="Rejecting..."
                        success={
                          !!(
                            rejectData &&
                            rejectData.rejectTeamInviteRequest &&
                            rejectData.rejectTeamInviteRequest.teamInviteRequest
                          )
                        }
                        successText="Rejected!"
                        error={!!rejectError}
                        errorText="Couldn't reject a request"
                      >
                        Reject
                      </ActionButton>
                    </ButtonRow>
                  );
                }}
              </RejectTeamInviteRequestMutation>
            );
          }}
        </AcceptTeamInviteRequestMutation>
      )}
    </ModalAlertDialog>
  );
}

export interface TeamInviteRequestListScreenRouteParams {
  urlSlug: string;
}

export interface TeamInviteRequestListScreenProps {
  loading?: boolean;
  team: TeamModel;
}

export function TeamInviteRequestListScreen({
  loading,
  team
}: TeamInviteRequestListScreenProps) {
  const { inviteRequests } = team;

  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>
          {team.name}'s Galactic Recruits
        </ScreenContentHeading>
        <ScreenContentSubheading>
          Accept or reject any incoming applications.
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        <TeamMembersSectionNav team={team} />

        {inviteRequests && inviteRequests.length ? (
          <LoaderOverlay loading={loading}>
            <PlayerCardList
              players={inviteRequests.map(inviteRequest => inviteRequest.user)}
              renderItemActionsBlock={player =>
                renderItemActionsBlock(inviteRequests, team, player)
              }
            />
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="You have no Galactic Recruits"
            note="Don't forget to check regularly to see if you have any new applicants."
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function TeamInviteRequestListScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TeamInviteRequestListScreenRouteParams>) {
  return (
    <TeamMembersMetadataQuery urlSlug={urlSlug}>
      {({ team, loading }) => (
        <TeamInviteRequestListScreen team={team} loading={loading} />
      )}
    </TeamMembersMetadataQuery>
  );
}

export default TeamInviteRequestListScreenConnected;
