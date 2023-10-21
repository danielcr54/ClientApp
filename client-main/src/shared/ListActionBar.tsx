import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

interface ListActionBarProps {
  alignRight?: boolean;
}

export const ListActionBar = styled('div')(
  ({ alignRight }: ListActionBarProps) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: alignRight ? 'flex-end' : 'flex-start',

    '&:not(:last-of-type)': {
      marginBottom: 15,

      [`@media ${deviceScreenQuery.medium}`]: {
        marginBottom: 40
      }
    },
    [`@media ${deviceScreenQuery.medium}`]: {
      width: 'auto'
    }
  })
);

export default ListActionBar;

export interface ListActionBarItemProps {
  grow?: boolean;
}

export const ListActionBarItem = styled('div')(
  ({ grow }: ListActionBarItemProps) => ({
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: grow !== false ? 1 : 0,

    '&:not(:last-of-type)': {
      marginRight: 15
    },

    [`@media ${deviceScreenQuery.small}`]: {
      flexGrow: 0
    }
  })
);

// TODO: Generalize to a more abstract kind of button
// and extract to a separate file and a `common` package

export interface ListActionLinkButtonProps {
  disabled?: boolean;
}

const disabledBgColor = 'rgba(255, 255, 255, 0.4)';
const disabledColor = colors.faded;

export const ListActionLinkButton = styled(NavLink)(
  ({ disabled }: ListActionLinkButtonProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 13px 7px',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1,
    border: 0,
    borderRadius: 3,
    textTransform: 'uppercase',
    backgroundColor: disabled ? disabledBgColor : 'white',
    transition: 'all 0.2s',
    color: disabled ? disabledColor : colors.main,
    textDecoration: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',

    '&:focus': {
      backgroundColor: disabled ? disabledBgColor : colors.white,
      color: disabled ? disabledColor : colors.main
    },

    '&:hover, &:hover:focus': {
      backgroundColor: disabled ? disabledBgColor : colors.main,
      color: disabled ? disabledColor : 'white',
      textDecoration: 'none',
      cursor: disabled ? 'default' : 'pointer'
    },

    '&:active, &:active:hover': {
      backgroundColor: disabled ? disabledBgColor : '#946fc7',
      color: disabled ? disabledColor : 'white'
    }
  })
);
