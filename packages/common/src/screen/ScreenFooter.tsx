import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, linkColors, deviceScreenQuery } from '../styleSettings';

export const ScreenFooter = styled('footer')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderWidth: 0,
  borderStyle: 'solid',
  borderTopWidth: 1,
  borderTopColor: colors.lighterDark,
  fontSize: 13,

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

export const ScreenFooterContainer = styled('div')({
  flex: 1,
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  padding: '0 12px 10px',

  [`@media ${deviceScreenQuery.small}`]: {
    maxWidth: 925,
    padding: '0 20px 10px'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    maxWidth: 945,
    padding: '0 30px 10px'
  }
});

// Nested elements

export interface ScreenFooterCellProps {
  alignEnd?: boolean;
}

export const ScreenFooterCell = styled('div')(
  ({ alignEnd }: ScreenFooterCellProps) => ({
    flex: 1,
    padding: '10px 0',
    textAlign: 'center',

    [`@media ${deviceScreenQuery.medium}`]: {
      textAlign: alignEnd ? 'right' : 'left'
    }
  })
);

export const ScreenFooterMenu = styled('div')({});

export const ScreenFooterMenuItem = styled('div')({
  color: 'rgba(255, 255, 255, 0.55)'
});

export const ScreenFooterMenuLink = styled(
  ScreenFooterMenuItem.withComponent(NavLink)
)({
  color: linkColors.secondary,
  textDecoration: 'none',

  '&:focus': {
    color: linkColors.secondary
  },

  '&:hover, &:active, &:hover:active': {
    color: colors.white,
    textDecoration: 'none',
    cursor: 'pointer'
  },

  '&:not(:last-of-type)': {
    '&::after': {
      content: '"."',
      margin: '0 10px',
      color: colors.white
    }
  }
});

export const ScreenFooterCopyright = styled('div')({
  color: 'rgba(255, 255, 255, 0.55)'
});
