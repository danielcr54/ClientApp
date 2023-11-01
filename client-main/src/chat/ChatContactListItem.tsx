import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { ChatContactModel } from './types';
import { ChatUserMediaObject } from './ChatUserMediaObject';
import ChatViewContext from './ChatViewContext';

const { deviceScreenQuery, colors } = styleSettings;

// Styled helpers

interface ChatContactListItemRootProps {
  active?: boolean
};

const ChatContactListItemRoot = styled('div')(
  ({ active }: ChatContactListItemRootProps) => ({
    width: '100%',
    padding: '6px 12px',
    backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'inherit',
  
    '&:hover, &:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      cursor: 'pointer'
    },
  
    [`@media ${deviceScreenQuery.medium}`]: {
      padding: '5px 12px 5px 14px'
    }
  })
);

const ChatContactListItemCountBadge = styled('div')({
  padding: '3px 6px 2px',
  fontSize: 13,
  borderRadius: 10,
  fontWeight: 500,
  backgroundColor: colors.default,
  color: colors.white,

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '2px 4px 1px',
    fontSize: 8,
    fontWeight: 400
  }
});

// Exported component

export interface ChatContactListItemProps {
  contact: ChatContactModel;
  onClick?: (contact: ChatContactModel) => void;
  inverseContext?: boolean;
}

export function ChatContactListItem({
  contact,
  onClick,
  inverseContext
}: ChatContactListItemProps) {
  function handleClick() {
    if (typeof onClick === 'function') {
      onClick(contact);
    }
  }

  const { unreadCount } = contact;

  const renderCountBadge = unreadCount
    ? () => (
        <ChatContactListItemCountBadge>
          {unreadCount}
        </ChatContactListItemCountBadge>
      )
    : void 0;

  return (
    <ChatViewContext.Consumer>
      {({ currentContact }) => (
        <ChatContactListItemRoot onClick={handleClick} active={currentContact.user.id === contact.user.id}>
          <ChatUserMediaObject
            contact={contact}
            inverseContext={inverseContext}
            renderAddon={renderCountBadge}
          />
        </ChatContactListItemRoot>
       )
      }
    </ChatViewContext.Consumer>
  );
}

export default ChatContactListItem;
