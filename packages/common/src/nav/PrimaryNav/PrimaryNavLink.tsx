import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { PrimaryNavItem, PrimaryNavItemProps } from './PrimaryNavItem';

const StyledPrimaryNavLink = styled(PrimaryNavItem.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !['isLink'].includes(prop)
})();

export function PrimaryNavLink(props: PrimaryNavItemProps & NavLinkProps) {
  return <StyledPrimaryNavLink isLink={true} {...props} />;
}

export default PrimaryNavLink;
