import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink } from 'react-router-dom';
import { ButtonTab } from './ButtonTab';

const excludedPropNames = ['active', 'disabled'];

export const ButtonTabNavLink = styled(ButtonTab.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !excludedPropNames.includes(prop)
})();

ButtonTabNavLink.displayName = 'ButtonTabNavLink';

export default ButtonTabNavLink;
