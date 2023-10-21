import React from 'react';
import { NavLinkProps } from 'react-router-dom';
import { ItemImage, StyledItemImageNavLink } from '../shared/ItemImage';
import { TeamModel } from './types';

export interface TeamLogoProps {
  team?: TeamModel;
  imageUrl?: string;
  imageAltLabel?: string;
  large?: boolean;
  size?: number;
  dark?: boolean;
}

export function TeamLogo({
  team,
  imageUrl,
  imageAltLabel,
  large,
  size,
  dark
}: TeamLogoProps) {
  return (
    <ItemImage
      large={large}
      size={size}
      dark={dark !== false}
      imageUrl={imageUrl || (team && team.logoUrl)}
      imageAltLabel={imageAltLabel || (team && team.name)}
    />
  );
}

// Specialized NavLink

export interface TeamLogoNavLinkProps
  extends TeamLogoProps,
    Partial<NavLinkProps> {}

export function TeamLogoNavLink({
  team,
  imageUrl,
  imageAltLabel,
  large,
  size,
  dark,
  ...navLinkProps
}: TeamLogoNavLinkProps) {
  const logo = (
    <ItemImage
      large={large}
      size={size}
      dark={dark !== false}
      imageUrl={imageUrl || (team && team.logoUrl)}
      imageAltLabel={imageAltLabel || (team && team.name)}
    />
  );

  return team ? (
    <StyledItemImageNavLink to={`/teams/${team.urlSlug}`} {...navLinkProps}>
      {logo}
    </StyledItemImageNavLink>
  ) : navLinkProps.to ? (
    <StyledItemImageNavLink to={navLinkProps.to} {...navLinkProps}>
      {logo}
    </StyledItemImageNavLink>
  ) : (
    logo
  );
}
