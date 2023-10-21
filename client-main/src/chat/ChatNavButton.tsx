import React from 'react';
import styled from '@emotion/styled';
import Media from 'react-media';
import { IoIosClose } from 'react-icons/io';
import { ScreenHeaderNavButton, ChatIcon, styleSettings } from '@igg/common';
import { ChatContactModel } from './types';
import ChatContactsQuery from './ChatUserQuery';
import { ChatConversationSubscription } from './ChatConversationQuery';

const { deviceScreenQuery, colors } = styleSettings;

const ChatCountBadge = styled('span')({
  display: 'block',
  marginLeft: -8,
  padding: '1px 4px',
  border: '1px solid black',
  borderRadius: 10,
  fontSize: 10,
  backgroundColor: colors.main,
  color: 'white'
});

const ChatCloseIcon = styled(IoIosClose)({
  color: 'white'
});

export interface ChatNavButtonProps {
  messageCount?: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ChatNavButton({
  isExpanded,
  messageCount,
  onToggle
}: ChatNavButtonProps) {
  return (
    <ScreenHeaderNavButton fontSize={24} onClick={onToggle} active={isExpanded} data-cy="aut-b-header-chat">
      <Media query={deviceScreenQuery.medium}>
        {largeScreen => (
          <>
            {
              (!isExpanded || largeScreen) &&
              <>
                <ChatIcon />
                {messageCount !== 0 && <ChatCountBadge>{messageCount}</ChatCountBadge>}
              </>
            }
            {
              isExpanded && !largeScreen &&
              <ChatCloseIcon />
            }
          </>
        )}
      </Media>
    </ScreenHeaderNavButton>
  );
}

export interface ChatNavButtonConnectedProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function ChatNavButtonConnected({
  isExpanded,
  onToggle
}: ChatNavButtonConnectedProps) {
  return (
    <ChatContactsQuery>
      {(
        conversations: ChatContactModel[],
        loading: boolean,
        subscribeToNewContacts: () => void,
        refetch: () => void
      ) => {
        let messageCount = 0;
        conversations.forEach(contact => {
          if (contact.unreadCount) {
            messageCount += contact.unreadCount;
          }
        });
        return (
          <>
            <ChatConversationSubscription onNewMessage={() => refetch()} />
            <ChatNavButton
              isExpanded={isExpanded}
              onToggle={onToggle}
              messageCount={messageCount}
            />
          </>
        );
      }}
    </ChatContactsQuery>
  );
}

export default ChatNavButtonConnected;
