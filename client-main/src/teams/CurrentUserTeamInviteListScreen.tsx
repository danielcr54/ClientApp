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
  ButtonRow,
  ActionButton,
  LoadingScreen,
  ModalAlertDialog
} from '@igg/common';
import { getErrorMessage } from '../shared/errorHelpers';
import { UserModel } from '../core/types';
import { UserInfoQuery, USER_INFO_QUERY } from '../core/UserInfoQuery';
import TeamCardList from './TeamCardList';
import { TeamInviteModel, TeamModel } from './types';
import {
  AcceptTeamInviteMutation,
  RejectTeamInviteMutation
} from './mutations/teamInviteMutations';

// Helper

function renderItemActionsBlock(
  teamInvites: TeamInviteModel[],
  team: TeamModel,
  currentUser: UserModel
) {
  const teamInvite = teamInvites.find(
    invite => invite.userId === currentUser.id && invite.teamId === team.id
  );

  if (!teamInvite) return null;

  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <AcceptTeamInviteMutation
          onError={error => alert(getErrorMessage(error))}
        >
          {(
            acceptTeamInvite,
            { loading: accepting, error: acceptError, data: acceptData }
          ) => (
            <RejectTeamInviteMutation
              onError={error => alert(getErrorMessage(error))}
            >
              {(
                rejectTeamInvite,
                { loading: rejecting, error: rejectError, data: rejectData }
              ) => (
                <ButtonRow>
                  <ActionButton
                    block={true}
                    small={true}
                    secondary={true}
                    onClick={() =>
                      acceptTeamInvite({
                        variables: {
                          input: {
                            teamInviteId: teamInvite.id
                          }
                        },
                        refetchQueries: [{ query: USER_INFO_QUERY }]
                      })
                    }
                    inProgress={accepting}
                    progressText="Accepting..."
                    success={
                      !!(
                        acceptData &&
                        acceptData.acceptTeamInvite &&
                        acceptData.acceptTeamInvite.teamInvite
                      )
                    }
                    successText="Joined a team!"
                    error={!!acceptError}
                    errorText="Couldn't accept an invite"
                  >
                    Accept
                  </ActionButton>

                  <ActionButton
                    block={true}
                    small={true}
                    inverse={true}
                    onClick={() =>
                      rejectTeamInvite({
                        variables: {
                          input: {
                            teamInviteId: teamInvite.id
                          }
                        },
                        refetchQueries: [{ query: USER_INFO_QUERY }]
                      })
                    }
                    inProgress={rejecting}
                    progressText="Rejecting..."
                    success={
                      !!(
                        rejectData &&
                        rejectData.rejectTeamInvite &&
                        rejectData.rejectTeamInvite.teamInvite
                      )
                    }
                    successText="Rejected!"
                    error={!!rejectError}
                    errorText="Couldn't reject an invite"
                  >
                    Reject
                  </ActionButton>
                </ButtonRow>
              )}
            </RejectTeamInviteMutation>
          )}
        </AcceptTeamInviteMutation>
      )}
    </ModalAlertDialog>
  );
}

export interface CurrentUserTeamInviteListScreenProps {
  loading?: boolean;
  currentUser: UserModel;
  teamInvites?: TeamInviteModel[];
}

export function CurrentUserTeamInviteListScreen({
  loading,
  teamInvites,
  currentUser
}: CurrentUserTeamInviteListScreenProps) {
  return (
    <ScreenContentSection>
      <ScreenContentHeader>
        <ScreenContentHeading>My Team Offers</ScreenContentHeading>
        <ScreenContentSubheading>
          These are your offers from teams, choose carefully!
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentBody>
        {teamInvites && teamInvites.length ? (
          <LoaderOverlay loading={loading}>
            <TeamCardList
              teams={teamInvites.map(invite => invite.team)}
              renderItemActionsBlock={team =>
                renderItemActionsBlock(teamInvites, team, currentUser)
              }
            />
          </LoaderOverlay>
        ) : (
          <NoContent
            icon={GoSearch}
            message="No offers available"
            note="Don't wait around, search the IGGalaxy to find a team"
          />
        )}
      </ScreenContentBody>
    </ScreenContentSection>
  );
}

export function CurrentUserTeamInviteListScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />}>
      {currentUser => (
        <CurrentUserTeamInviteListScreen
          currentUser={currentUser}
          teamInvites={currentUser.teamInvites}
        />
      )}
    </UserInfoQuery>
  );
}

export default CurrentUserTeamInviteListScreenConnected;
