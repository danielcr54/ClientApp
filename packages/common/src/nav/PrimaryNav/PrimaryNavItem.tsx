import React from 'react';
import styled from '@emotion/styled';

export interface PrimaryNavItemProps {
  isLink?: boolean;
  active?: boolean;
}

export const PrimaryNavItem = styled('div')(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 55,
    height: 46,
    fontSize: 11,
    fontWeight: 400,
    cursor: 'pointer',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s',

    '&:hover, &:focus, &:active': {
      textDecoration: 'none'
    }
  },
  ({ active, isLink }: PrimaryNavItemProps) => {
    if (!isLink) return;

    // TODO: To be moved to "theme" settings later
    const textColor = '#73608e';
    const hoverTextColor = 'white';
    const activeTextColor = 'white';
    const bgColor = 'transparent';
    const hoverBgColor = '#37294c';
    const activeBgColor = '#442c61';

    return {
      backgroundColor: bgColor,
      color: active ? activeTextColor : textColor,

      '&:hover': {
        color: hoverTextColor,
        backgroundColor: hoverBgColor
      },

      '&.active': {
        color: activeTextColor,
        backgroundColor: activeBgColor
      }
    };
  }
);

PrimaryNavItem.displayName = 'PrimaryNavItem';

export default PrimaryNavItem;

export const PrimaryNavItemIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: 55,
  padding: 8,
  textAlign: 'center'
});

export interface PrimaryNavItemLabelProps {
  expanded?: boolean;
}

export const PrimaryNavItemLabel = styled('div')(
  ({ expanded }: PrimaryNavItemLabelProps) => ({
    flex: 1,
    width: expanded ? '100%' : 0,
    padding: 8,
    paddingLeft: 0,
    paddingRight: expanded ? 8 : 0,
    opacity: expanded ? 1 : 0,
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'opacity 0.3s, padding 0.3s',
    whiteSpace: expanded ? 'normal' : 'nowrap',
    textOverflow: 'ellipsis'
  })
);
