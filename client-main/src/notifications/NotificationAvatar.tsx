import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { Avatar, AvatarProps } from '../shared/Avatar';
import { UserModel } from '../core/types';

const { colors } = styleSettings;

// Styled helpers

export interface NotificationAvatarStyledProps {
  online?: boolean;
  inverseContext?: boolean;
}

const NotificationAvatarRoot = styled('div')({
  position: 'relative',
  marginRight: 20
});

const NotificationAvatarAvatar = styled(Avatar)({
  zIndex: 0,
  backgroundColor: colors.dark
});

// Exported component

export interface NotificationAvatarProps extends AvatarProps {
  currentUser?: UserModel;
  inverseContext?: boolean;
}

export function NotificationAvatar({
  currentUser,
  ...avatarProps
}: NotificationAvatarProps) {
  return (
    <NotificationAvatarRoot>
      <NotificationAvatarAvatar {...avatarProps}>A</NotificationAvatarAvatar>
    </NotificationAvatarRoot>
  );
}
