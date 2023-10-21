import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const ActionScreenLogoutLink = styled(NavLink)({
  fontSize: 13,
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none'
  }
});

ActionScreenLogoutLink.displayName = 'ActionScreenLogoutLink';

export default ActionScreenLogoutLink;
