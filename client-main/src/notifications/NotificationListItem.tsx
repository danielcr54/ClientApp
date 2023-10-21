import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaBtc } from 'react-icons/fa';
import { Button, styleSettings, ButtonRow, ActionButton } from '@igg/common';
import { NotificationModel, NotificationType } from './types';
import { USER_INFO_QUERY } from '../core/UserInfoQuery';
import { NOTIFICATIONS_QUERY } from './NotificationQuery';
import RemoveNotificationMutation, {
  RemoveNotificationMutationFn
} from './NotificationMutation';
import { NotificationAvatar } from './NotificationAvatar';
import {
  AcceptTeamInviteRequestMutation,
  RejectTeamInviteRequestMutation
} from '../teams/mutations/teamInviteRequestMutations';
import {
  AcceptTeamInviteMutation,
  RejectTeamInviteMutation
} from '../teams/mutations/teamInviteMutations';
import { getErrorMessage } from '../shared/errorHelpers';

const { deviceScreenQuery, colors } = styleSettings;

const NotificationListItemRoot = styled('div')({
  display: 'flex',
  padding: '15px 5px'
});

const NotificationListItemFigure = styled('img')({
  marginRight: 25,
  width: 48,
  height: 48,
  objectFit: 'cover',
  borderRadius: 24
});

const NotificationListItemTronLinkIcon = styled(FaBtc)({
  marginRight: 25,
  width: 48,
  height: 48,
  borderRadius: 24,
  fontSize: '400%'
});

const NotificationListItemBody = styled('div')({
  // To do
  flexBasis: 'calc( 100% - 48px )'
});

const NotificationListItemTitle = styled('h3')({
  color: colors.white,
  fontSize: 14,
  marginBottom: 5,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const NotificationListItemTimeBadge = styled('span')({
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2px 4px',
  fontSize: 12,
  color: 'rgba(255, 255, 255, 0.55)'
});

const NotificationListItemText = styled('p')({
  color: 'rgba(255,255,255,0.55)',
  fontSize: 12
});

const NotificationListItemActions = styled('div')({
  display: 'flex',
  marginTop: 12,
  justifyContent: 'flex-start'
});

const NotificationListItemActionButton = styled(Button)({
  marginRight: 5
});

export interface NotificationListItemProps {
  notification: NotificationModel;
  removeNotification: RemoveNotificationMutationFn;
}

export class NotificationListItem extends Component<NotificationListItemProps> {
  componentDidMount() {
    const { notification, removeNotification } = this.props;

    if (
      notification.type !== NotificationType.TEAM_INVITE &&
      notification.type !== NotificationType.TEAM_INVITE_REQUEST
    ) {
      removeNotification({
        variables: { notificationId: notification.id }
      });
    }
  }

  render() {
    const { notification } = this.props;

    return (
      <NotificationListItemRoot>
        {notification.avatarUrl && (
          <NotificationListItemFigure
            src={notification.avatarUrl}
            alt={notification.title}
          />
        )}
        {!notification.avatarUrl &&
          notification.type === NotificationType.TEAM_CREATE_ENABLED && (
            <NotificationListItemTronLinkIcon />
          )}
        <NotificationListItemBody>
          <NotificationListItemTitle>
            {notification.title}
            {notification.eventTime && (
              <NotificationListItemTimeBadge>
                {notification.eventTime.toLocaleTimeString()}
              </NotificationListItemTimeBadge>
            )}
          </NotificationListItemTitle>
          {notification.description && (
            <NotificationListItemText>
              {notification.description}
            </NotificationListItemText>
          )}
          {notification.type === NotificationType.TEAM_INVITE_REQUEST &&
            notification.meta &&
            notification.meta.teamInviteRequestId && (
              <NotificationListItemActions>
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
                          {
                            loading: rejecting,
                            error: rejectError,
                            data: rejectData
                          }
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
                                        teamInviteRequestId: notification.meta
                                          ? notification.meta
                                              .teamInviteRequestId || ''
                                          : ''
                                      }
                                    },
                                    refetchQueries: [
                                      { query: USER_INFO_QUERY }
                                    ]
                                  })
                                }
                                inProgress={accepting}
                                progressText="Accepting..."
                                success={
                                  !!(
                                    acceptData &&
                                    acceptData.acceptTeamInviteRequest &&
                                    acceptData.acceptTeamInviteRequest
                                      .teamInviteRequest
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
                                        teamInviteRequestId: notification.meta
                                          ? notification.meta
                                              .teamInviteRequestId || ''
                                          : ''
                                      }
                                    },
                                    refetchQueries: [
                                      { query: USER_INFO_QUERY }
                                    ]
                                  })
                                }
                                inProgress={rejecting}
                                progressText="Rejecting..."
                                success={
                                  !!(
                                    rejectData &&
                                    rejectData.rejectTeamInviteRequest &&
                                    rejectData.rejectTeamInviteRequest
                                      .teamInviteRequest
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
              </NotificationListItemActions>
            )}

          {notification.type === NotificationType.TEAM_INVITE &&
            notification.meta &&
            notification.meta.teamInviteId && (
              <NotificationListItemActions>
                <AcceptTeamInviteMutation
                  onError={error => alert(getErrorMessage(error))}
                >
                  {(
                    acceptTeamInvite,
                    { loading: accepting, error: acceptError, data: acceptData }
                  ) => {
                    return (
                      <RejectTeamInviteMutation
                        onError={error => alert(getErrorMessage(error))}
                      >
                        {(
                          rejectTeamInvite,
                          {
                            loading: rejecting,
                            error: rejectError,
                            data: rejectData
                          }
                        ) => {
                          return (
                            <ButtonRow>
                              <ActionButton
                                block={true}
                                small={true}
                                secondary={true}
                                onClick={() =>
                                  acceptTeamInvite({
                                    variables: {
                                      input: {
                                        teamInviteId: notification.meta
                                          ? notification.meta.teamInviteId || ''
                                          : ''
                                      }
                                    },
                                    refetchQueries: [
                                      { query: USER_INFO_QUERY }
                                    ]
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
                                  rejectTeamInvite({
                                    variables: {
                                      input: {
                                        teamInviteId: notification.meta
                                          ? notification.meta.teamInviteId || ''
                                          : ''
                                      }
                                    },
                                    refetchQueries: [
                                      { query: USER_INFO_QUERY }
                                    ]
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
                                errorText="Couldn't reject a request"
                              >
                                Reject
                              </ActionButton>
                            </ButtonRow>
                          );
                        }}
                      </RejectTeamInviteMutation>
                    );
                  }}
                </AcceptTeamInviteMutation>
              </NotificationListItemActions>
            )}
        </NotificationListItemBody>
      </NotificationListItemRoot>
    );
  }
}

export interface NotificationListItemConnectedProps {
  notification: NotificationModel;
}

export function NotificationListItemConnected({
  notification
}: NotificationListItemConnectedProps) {
  return (
    <RemoveNotificationMutation>
      {removeNotification => (
        <NotificationListItem
          notification={notification}
          removeNotification={removeNotification}
        />
      )}
    </RemoveNotificationMutation>
  );
}

export default NotificationListItemConnected;
