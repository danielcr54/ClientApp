import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from '@emotion/styled';

export const FooterMenu = styled('nav')({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start'
});

export default FooterMenu;

export interface FooterMenuItemProps {
  primary?: boolean;
}

export const FooterMenuItem = styled('div')(
  {
    fontSize: 12,
    color: '#666',
    textDecoration: 'none',
    transition: 'all, 0.2s',

    '&:hover, &:focus, &:active, &.active': {
      color: 'white',
      textDecoration: 'none'
    },

    '&:not(:last-of-type)': {
      marginRight: 15
    }
  },
  ({ primary }: FooterMenuItemProps) => {
    if (!primary) return {};

    return {
      color: 'white',

      '&:hover, &.active': {
        color: '#5394de'
      }
    };
  }
);

export type FooterMenuLinkProps = FooterMenuItemProps & NavLinkProps;

export const FooterMenuLink = FooterMenuItem.withComponent(
  styled(({ primary, ...restProps }: FooterMenuLinkProps) => (
    <NavLink {...restProps} />
  ))({})
);

export const FooterMenuDivider = styled('div')({
  width: 2,
  height: 15,
  margin: '0 10px 0 0',
  backgroundColor: 'rgba(255, 255, 255, 0.2)'
});
