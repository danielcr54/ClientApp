import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from '../styleSettings';

export interface TabProps {
  active?: boolean;
  small?: boolean;
}

export const Tab = styled('div')(({ active, small }: TabProps) => ({
  flexShrink: 0,
  marginBottom: -1,
  padding: small ? '8px 0' : '10px 0',
  borderStyle: 'solid',
  borderWidth: 0,
  borderBottomWidth: 1,
  fontSize: small ? 12 : 14,
  fontWeight: 400,
  borderColor: active ? colors.brightMain : 'transparent',
  color: active ? colors.brightMain : colors.white,
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
  transition: 'all 0.2s',

  '&:hover': {
    borderColor: colors.white
  },

  '&.active': {
    borderColor: colors.brightMain,
    color: colors.brightMain
  },

  '&:hover, &:focus, &:active': {
    textDecoration: 'none'
  },

  '&:not(:last-of-type)': {
    marginRight: 20
  },

  [`@media ${deviceScreenQuery.small}`]: {
    paddingTop: small ? 8 : 11,
    paddingBottom: small ? 8 : 11,
    fontSize: small ? 13 : 15,

    '&:not(:last-of-type)': {
      marginRight: 25
    }
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    paddingTop: small ? 8 : 12,
    paddingBottom: small ? 8 : 12,
    fontSize: small ? 13 : 16,

    '&:not(:last-of-type)': {
      marginRight: 30
    }
  }
}));

Tab.displayName = 'Tab';

export default Tab;
