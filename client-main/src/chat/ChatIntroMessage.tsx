import React from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import {
  Button,
  ActionButton,
  ModalAlertDialog,
  styleSettings
} from '@igg/common';
import { ChatContactModel } from './types';
import { ChatUserAvatar } from './ChatUserAvatar';
import { TeamLogo } from '../teams/TeamLogo';
import { InviteToTeamMutation } from '../teams/mutations/teamInviteMutations';
import { TEAM_MEMBERS_METADATA_QUERY } from '../teams/TeamMembersMetadataQuery';
import ChatViewContext from './ChatViewContext';
import { getErrorMessage } from '../shared/errorHelpers';

const { deviceScreenQuery, colors } = styleSettings;

const ChatIntroMessageRoot = styled('div')({
  padding: 20,
  display: 'flex',
  alignItems: 'flex-start',
  borderRadius: 4,
  backgroundColor: colors.fadedLighterDark
});

const ChatAvatarContainer = styled('div')({
  display: 'flex'
});

const ChatIntroContent = styled('div')({
  paddingLeft: 20,
  color: colors.white
});

const ChatIntroContentHeader = styled('h2')({
  marginBottom: 10,
  fontSize: 17,
  fontWeight: 400,
  color: colors.white
});

const ChatIntroContentMessage = styled('p')({
  marginBottom: 10
});

const ChatIntroContentAction = styled('div')({
  display: 'flex',
  padding: 5
});

const ChatIntroActionButton = styled(Button)({
  marginRight: 10
});

const StyledChatUserAvatar = styled(ChatUserAvatar)({
  marginLeft: -5
});

export interface ChatIntroMessageProps {
  contact: ChatContactModel;
}

export function ChatIntroMessage({ contact }: ChatIntroMessageProps) {
  return (
    <ChatIntroMessageRoot>
      <ChatViewContext.Consumer>
        {({ currentUser }) => {
          const isSameTeam =
            currentUser && currentUser.teamId && contact.user.teamId
              ? currentUser.teamId === contact.user.teamId
              : false;
          const isTeamOwner =
            currentUser && currentUser.team
              ? currentUser.team.ownerId === currentUser.id
              : false;

          return (
            <>
              <Media query={deviceScreenQuery.medium}>
                {largeScreen => (
                  <>
                    {largeScreen && (
                      <ChatAvatarContainer>
                        {isSameTeam && (
                          <TeamLogo
                            size={36}
                            team={currentUser ? currentUser.team : undefined}
                          />
                        )}
                        <StyledChatUserAvatar
                          hideStatus={true}
                          chatUser={contact}
                          size={36}
                        />
                      </ChatAvatarContainer>
                    )}
                  </>
                )}
              </Media>
              <ChatIntroContent>
                <ChatIntroContentHeader>
                  {`New Life Form Detected!`}
                </ChatIntroContentHeader>
                <ChatIntroContentMessage>
                  {`Introduce yourself to ${contact.user.displayName}!`}
                </ChatIntroContentMessage>
                <ChatIntroContentAction>
                  {!isSameTeam && isTeamOwner && (
                    <ModalAlertDialog>
                      {({ open: alert }) => (
                        <InviteToTeamMutation
                          onError={error => alert(getErrorMessage(error))}
                        >
                          {(inviteToTeam, { loading, error, data }) => (
                            <ActionButton
                              small={true}
                              secondary={true}
                              onClick={() =>
                                inviteToTeam({
                                  variables: {
                                    input: {
                                      teamId: currentUser
                                        ? currentUser.teamId || ''
                                        : '',
                                      userId: contact.user.id
                                    }
                                  },
                                  refetchQueries: [
                                    {
                                      query: TEAM_MEMBERS_METADATA_QUERY,
                                      variables: {
                                        urlSlug:
                                          currentUser && currentUser.team
                                            ? currentUser.team.urlSlug
                                            : ''
                                      }
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
                            >
                              Invite to your team
                            </ActionButton>
                          )}
                        </InviteToTeamMutation>
                      )}
                    </ModalAlertDialog>
                  )}
                  {/* <ChatIntroActionButton
                    small={true}
                    inverse={true}
                    onClick={onFollowClick}
                  >
                    Follow
                  </ChatIntroActionButton> */}
                </ChatIntroContentAction>
              </ChatIntroContent>
            </>
          );
        }}
      </ChatViewContext.Consumer>
    </ChatIntroMessageRoot>
  );
}

export default ChatIntroMessage;
