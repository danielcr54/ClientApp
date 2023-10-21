import React from 'react';
import { NavLinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { MdPerson } from 'react-icons/md';
import { colors } from '@igg/common/lib/styleSettings';
import { UserModel } from '../core/types';
import { ItemImage, StyledItemImageNavLink } from './ItemImage';

// Visual components

interface UserAvatarStyleProps {
  large?: boolean;
  size?: number;
  dark?: boolean;
}

const UserAvatarIcon = styled('div')(
  ({ size, large }: UserAvatarStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: (size ? size : large ? 90 : 75) / 2,
    color: colors.white
  })
);

export interface StyledUserAvatarProps extends UserAvatarStyleProps {
  imageUrl?: string;
  imageAltLabel?: string;
}

export function StyledUserAvatar({
  imageUrl,
  imageAltLabel,
  large,
  size,
  dark
}: StyledUserAvatarProps) {
  return (
    <ItemImage
      large={large}
      size={size}
      dark={dark !== false}
      circle={true}
      imageUrl={imageUrl}
      imageAltLabel={imageAltLabel}
      renderFallback={() => (
        <UserAvatarIcon size={size}>
          <MdPerson />
        </UserAvatarIcon>
      )}
    />
  );
}

export interface UserAvatarProps extends StyledUserAvatarProps {
  user?: UserModel;
}

export function UserAvatar({ user, ...otherProps }: UserAvatarProps) {
  return (
    <StyledUserAvatar
      imageUrl={user && user.profile && user.profile.avatarUrl}
      imageAltLabel={user && (user.displayName || user.username)}
      {...otherProps}
    />
  );
}

// Specialized NavLink

export interface UserAvatarNavLinkProps
  extends UserAvatarProps,
    Partial<NavLinkProps> {}

export function UserAvatarNavLink({
  user,
  imageUrl,
  imageAltLabel,
  large,
  size,
  dark,
  ...navLinkProps
}: UserAvatarNavLinkProps) {
  const avatar = (
    <StyledUserAvatar
      imageUrl={imageUrl || (user && user.profile && user.profile.avatarUrl)}
      imageAltLabel={
        imageAltLabel || (user && user.profile && user.profile.avatarUrl)
      }
      large={large}
      size={size}
      dark={dark}
    />
  );

  return user ? (
    <StyledItemImageNavLink to={`/players/${user.username}`} {...navLinkProps}>
      {avatar}
    </StyledItemImageNavLink>
  ) : navLinkProps.to ? (
    <StyledItemImageNavLink to={navLinkProps.to} {...navLinkProps}>
      {avatar}
    </StyledItemImageNavLink>
  ) : (
    avatar
  );
}
