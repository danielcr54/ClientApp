import React from 'react';
import { ActionButton, ActionButtonProps, ModalAlertDialog } from '@igg/common';
import { getErrorMessage } from '../shared/errorHelpers';
import { USER_INFO_QUERY } from '../core/UserInfoQuery';
import { TeamModel } from './types';
import { RequestTeamInviteMutation } from './mutations/teamInviteRequestMutations';

export interface RequestTeamInviteButtonProps extends ActionButtonProps {
  team: TeamModel;
}

export function RequestTeamInviteButton({
  team,
  ...buttonProps
}: RequestTeamInviteButtonProps) {
  return (
    <ModalAlertDialog>
      {({ open: alert }) => (
        <RequestTeamInviteMutation
          onError={error => alert(getErrorMessage(error))}
        >
          {(requestTeamInvite, mutationResult) => {
            const { loading, data, error } = mutationResult;
            const teamInviteRequest =
              (data &&
                data.requestTeamInvite &&
                data.requestTeamInvite.teamInviteRequest) ||
              void 0;

            function handleClick() {
              requestTeamInvite({
                variables: {
                  input: {
                    teamId: team.id
                  }
                },
                refetchQueries: [{ query: USER_INFO_QUERY }]
              });
            }

            return (
              <ActionButton
                {...buttonProps}
                onClick={handleClick}
                inProgress={loading}
                progressText="Requesting..."
                error={!!error}
                errorText="Error! Please try again."
                success={!!teamInviteRequest}
                successText="Request sent!"
              >
                Request an invite
              </ActionButton>
            );
          }}
        </RequestTeamInviteMutation>
      )}
    </ModalAlertDialog>
  );
}

export default RequestTeamInviteButton;
