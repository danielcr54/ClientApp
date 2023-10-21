import React from 'react';
import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from '../styleSettings';

export interface ScreenNavbarProps {
  stacked?: boolean;
  expanded?: boolean;
}

export const ScreenNavbar = styled('div')(
  ({ stacked, expanded }: ScreenNavbarProps) => ({
    position: 'fixed',
    top: 60,
    zIndex: 98,
    display: 'flex',
    flexDirection: stacked ? 'column' : 'row',
    width: stacked ? (expanded ? 200 : 58) : '100%',
    borderBottom: stacked ? 'none' : `1px solid ${colors.lighterDark}`,
    borderRight: stacked ? `1px solid ${colors.lighterDark}` : 'none',
    backgroundColor: colors.fadedLighterDark,
    transition: 'all 0.2s, width 0.3s',

    [`@media ${deviceScreenQuery.medium}`]: {
      top: 60,
      bottom: 0,
      left: 0
    }
  })
);

// Positioning containers

export const ScreenNavbarStart = styled('div')(
  ({ stacked }: ScreenNavbarProps) => ({
    flex: 1,
    display: 'flex',
    flexDirection: stacked ? 'column' : 'row'
  })
);

export const ScreenNavbarEnd = styled('div')(
  ({ stacked }: ScreenNavbarProps) => ({
    display: 'flex',
    flexDirection: stacked ? 'column' : 'row'
  })
);

// Various helpers

export interface ScreenNavbarExpandButtonProps {
  expanded?: boolean;
}

export const ScreenNavbarExpandButton = styled('div')(
  ({ expanded }: ScreenNavbarExpandButtonProps) => ({
    position: 'absolute',
    top: 170,
    right: -1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 38,
    fontSize: 13,
    color: 'white',
    cursor: 'pointer',

    '& > *': {
      zIndex: 1,
      transform: expanded ? 'rotate(180deg)' : 'none',
      transition: 'all 0.2s'
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 0,
      top: 0,
      bottom: 0,
      right: 0,
      width: 0,
      borderTop: '7px solid transparent',
      borderBottom: '7px solid transparent',
      borderLeft: 0,
      borderRight: '15px solid #413d52',
      transition: 'all 0.2s'
    },

    '&:hover::before': {
      borderRightColor: '#73608e'
    },

    '&:active::before': {
      borderRightColor: colors.main
    }
  })
);
