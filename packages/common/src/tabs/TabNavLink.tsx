import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink } from 'react-router-dom';
import { Tab } from './Tab';

const excludedPropNames = ['active', 'disabled', 'small'];

export const TabNavLink = styled(Tab.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !excludedPropNames.includes(prop)
})();

TabNavLink.displayName = 'TabNavLink';

export default TabNavLink;
