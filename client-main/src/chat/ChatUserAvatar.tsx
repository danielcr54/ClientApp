import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { Avatar, AvatarProps } from '../shared/Avatar';
import { ChatContactModel } from './types';

const { colors } = styleSettings;

// Styled helpers

export interface ChatUserAvatarStyledProps {
  online?: boolean;
  inverseContext?: boolean;
}

const ChatUserAvatarRoot = styled('div')({
  position: 'relative'
});

const ChatUserAvatarAvatar = styled(Avatar)({
  zIndex: 0
});

const ChatUserAvatarImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const ChatUserAvatarAddon = styled('div')({
  position: 'absolute',
  zIndex: 1,
  bottom: -1,
  right: -1
});

const ChatUserOnlineStatusIcon = styled('div')(
  ({ online, inverseContext }: ChatUserAvatarStyledProps) => ({
    width: 9,
    height: 9,
    borderRadius: '50%',
    border: `2px solid ${
      inverseContext ? colors.white : colors.fadedLighterDark
    }`,
    backgroundColor: online ? colors.success : '#4b4562'
  })
);

// Exported component

export interface ChatUserAvatarProps extends AvatarProps {
  chatUser?: ChatContactModel;
  hideStatus?: boolean;
  inverseContext?: boolean;
}

export function ChatUserAvatar({
  chatUser,
  hideStatus,
  inverseContext,
  ...avatarProps
}: ChatUserAvatarProps) {
  return (
    <ChatUserAvatarRoot>
      <ChatUserAvatarAvatar {...avatarProps}>
        {
          chatUser && chatUser.user.profile.avatarUrl &&
          <ChatUserAvatarImage src={chatUser.user.profile.avatarUrl} alt={chatUser.user.displayName} />
        }
      </ChatUserAvatarAvatar>
      {!hideStatus && (
        <ChatUserAvatarAddon>
          <ChatUserOnlineStatusIcon
            online={chatUser && chatUser.user.isActive}
            inverseContext={inverseContext}
          />
        </ChatUserAvatarAddon>
      )}
    </ChatUserAvatarRoot>
  );
}
