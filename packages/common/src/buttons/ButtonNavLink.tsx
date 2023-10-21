import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink } from 'react-router-dom';
import { Button } from './Button';

const excludedPropNames = [
  'block',
  'inverse',
  'transparent',
  'small',
  'xsmall',
  'large',
  'allowWrap',
  'glow',
  'disabled',
  'inProgress',
  'success',
  'error'
];

export const ButtonNavLink = styled(Button.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !excludedPropNames.includes(prop)
})();

ButtonNavLink.displayName = 'ButtonNavLink';

export default ButtonNavLink;
