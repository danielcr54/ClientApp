import React from 'react';
import { GoSearch } from 'react-icons/go';
import {
  ScreenContentSection,
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentBody,
  NoContent,
  LoaderOverlay,
  ActionButton,
  LoadingScreen,
  ModalAlertDialog
} from '@igg/common';
import { getErrorMessage } from '../shared/errorHelpers';
import { UserModel } from '../core/types';
import { UserInfoQuery, USER_INFO_QUERY } from '../core/UserInfoQuery';
import TeamCardList from './TeamCardList';
import { TeamInviteRequestModel, TeamModel } from './types';
import { CancelTeamInviteRequestMutation } from './mutations/teamInviteRequestMutations';

// Helper

function renderItemActionsBlock(
  teamInviteRequests: TeamInviteRequestModel[],
  team: TeamModel,
  currentUser: UserModel
) {
  const teamInviteRequest = teamInviteRequests.find(
    inviteRequest =>
      inviteRequest.userId === currentUser.id &&
      inviteRequest.teamId === team.id
  );

  if (!teamInviteRequest) return null;

  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <CancelTeamInviteRequestMutation
          onError={error => alert(getErrorMessage(error))}
        >
          {(cancelTeamInviteRequest, { loading, error, data }) => {
            return (
              <ActionButton
                block={true}
                small={true}
                onClick={() =>
                  cancelTeamInviteRequest({
                    variables: {
                      input: {
                        teamInviteRequestId: teamInviteRequest.id
                      }
                    },
                    refetchQueries: [{ query: USER_INFO_QUERY }]
                  })
                }
                inProgress={loading}
                progressText="Cancelling..."
                success={
                  !!(
                    data &&
                    data.cancelTeamInviteRequest &&
                    data.cancelTeamInviteRequest.teamInviteRequest
                  )
                }
                successText="Cancelled!"
                error={!!error}
                errorText="Couldn't cancel a request"
              >
                Cancel
              </ActionButton>
            );
          }}
        </CancelTeamInviteRequestMutation>
      )}
    </ModalAlertDialog>
  );
}

export interface CurrentUserTeamInviteRequestListScreenProps {
  loading?: boolean;
  currentUser: UserModel;
  teamInviteRequests?: TeamInviteRequestModel[];
}

export function CurrentUserTeamInviteRequestListScreen({
  loading,
  currentUser,
  teamInviteRequests
}: CurrentUserTeamInviteRequestListScreenProps) {
  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>My Team Applications</ScreenContentHeading>
        <ScreenContentSubheading>
          These are your submitted team applications
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        {teamInviteRequests && teamInviteRequests.length ? (
          <LoaderOverlay loading={loading}>
            <TeamCardList
              teams={teamInviteRequests.map(
                inviteRequest => inviteRequest.team
              )}
              renderItemActionsBlock={team =>
                renderItemActionsBlock(teamInviteRequests, team, currentUser)
              }
            />
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="No team applications submitted"
            note="Search the IGGalaxy to find a team"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function CurrentUserTeamInviteRequestListScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {currentUser => (
        <CurrentUserTeamInviteRequestListScreen
          currentUser={currentUser}
          teamInviteRequests={currentUser.teamInviteRequests}
        />
      )}
    </UserInfoQuery>
  );
}

export default CurrentUserTeamInviteRequestListScreenConnected;
