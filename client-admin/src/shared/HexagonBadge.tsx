import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

// Note: `size` is a height of the hexagon

interface HexagonBadgeStyleProps {
  size: number;
}

const badgeRectStyle = (size: number) => ({
  width: Math.floor(Math.sqrt(3) * (size / 2)),
  height: size / 2,
  // transform: 'rotate(-30deg) skewX(30deg)',
  // borderRadius: size / 40,
  backgroundColor: colors.paleMain,
  transformOrigin: '50% 50%',
  borderRadius: '1px/2px'
  // borderRadius: `${size / 20}px/${size / 12}px`
});

const HexagonBadgeRoot = styled('div')(({ size }: HexagonBadgeStyleProps) => ({
  ...badgeRectStyle(size),
  display: 'inline-flex',
  position: 'relative',
  marginTop: size / 4,
  marginBottom: size / 4,

  '&::before': {
    ...badgeRectStyle(size),
    position: 'absolute',
    transform: 'rotate(60deg)',
    content: '" "'
  },

  '&::after': {
    ...badgeRectStyle(size),
    position: 'absolute',
    transform: 'rotate(120deg)',
    content: '" "'
  }
}));

const HexagonBadgeContent = styled('div')(
  ({ size }: HexagonBadgeStyleProps) => ({
    ...badgeRectStyle(size),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    fontSize: 9,
    backgroundColor: 'transparent',
    color: 'white'
  })
);

export interface HexagonBadgeProps {
  size?: number;
  children?: ReactNode;
  className?: string;
}

export function HexagonBadge({ size, className, children }: HexagonBadgeProps) {
  size = size || 28;

  return (
    <HexagonBadgeRoot className={className} size={size}>
      <HexagonBadgeContent size={size}>{children}</HexagonBadgeContent>
    </HexagonBadgeRoot>
  );
}

export interface HexagonBadgeListProps {
  spacing?: number;
}

export const HexagonBadgeList = styled('div')(
  ({ spacing }: HexagonBadgeListProps) => ({
    display: 'inline-flex',
    color: 'rgba(255, 255, 255, 0.55)',

    '& > *:not(:last-of-type)': {
      marginRight: typeof spacing !== 'undefined' ? spacing : 5
    }
  })
);
