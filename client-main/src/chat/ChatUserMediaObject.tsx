import React, { ReactNode } from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { ChatContactModel } from './types';
import { ChatUserAvatar } from './ChatUserAvatar';

const { deviceScreenQuery, colors } = styleSettings;

// Styled helpers

interface ChatUserMediaObjectStyledProps {
  active?: boolean;
  inverseContext?: boolean;
}

const ChatUserMediaObjectRoot = styled('div')(
  ({ active, inverseContext }: ChatUserMediaObjectStyledProps) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // padding: '6px 12px',
    fontSize: 18,
    color: inverseContext ? 'rgba(35, 31, 50, 0.7)' : colors.white,
    transition: 'all 0.2s',

    [`@media ${deviceScreenQuery.medium}`]: {
      fontSize: 13
      // padding: '5px 12px 5px 14px'
    }
  })
);

const ChatUserMediaObjectFigure = styled('div')({
  marginRight: 10
});

const ChatUserMediaObjectMain = styled('div')({
  flex: 1,
  overflow: 'hidden'
});

const ChatUserMediaObjectAddon = styled('div')({
  paddingLeft: 10,

  [`@media ${deviceScreenQuery.medium}`]: {
    paddingLeft: 5
  }
});

const ChatUserMediaObjectName = styled('div')({
  maxWidth: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: colors.white
});

// Exported component

export interface ChatUserMediaObjectProps {
  contact: ChatContactModel;
  onClick?: (contact: ChatContactModel) => void;
  inverseContext?: boolean;
  renderAddon?: () => ReactNode;
  className?: string;
}

export function ChatUserMediaObject({
  contact,
  onClick,
  inverseContext,
  renderAddon,
  className
}: ChatUserMediaObjectProps) {
  function handleClick() {
    if (typeof onClick === 'function') {
      onClick(contact);
    }
  }

  return (
    <ChatUserMediaObjectRoot
      onClick={handleClick}
      inverseContext={inverseContext}
      className={className}
    >
      <ChatUserMediaObjectFigure>
        <Media query={deviceScreenQuery.medium}>
          {largeScreen => (
            <ChatUserAvatar
              chatUser={contact}
              size={largeScreen ? 25 : 32}
              inverseContext={inverseContext}
            />
          )}
        </Media>
      </ChatUserMediaObjectFigure>
      <ChatUserMediaObjectMain>
        <ChatUserMediaObjectName>
          {contact.user.displayName}
        </ChatUserMediaObjectName>
      </ChatUserMediaObjectMain>

      {typeof renderAddon === 'function' && (
        <ChatUserMediaObjectAddon>{renderAddon()}</ChatUserMediaObjectAddon>
      )}
    </ChatUserMediaObjectRoot>
  );
}

export default ChatUserMediaObject;
