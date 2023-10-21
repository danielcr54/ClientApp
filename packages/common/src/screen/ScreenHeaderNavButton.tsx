import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styleSettings';

export interface ScreenHeaderNavButtonProps {
  disabled?: boolean;
  active?: boolean;
  fontSize?: number;
}

export const ScreenHeaderNavButton = styled('div')(
  ({ active, disabled, fontSize }: ScreenHeaderNavButtonProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 59, // TODO: Make it variable
    padding: '0 13px',
    fontSize: fontSize || 14,
    lineHeight: 1,
    backgroundColor: disabled
      ? 'transparent'
      : active
        ? colors.faded
        : 'transparent',
    transition: 'all 0.2s',
    color: disabled ? 'rgba(255, 255, 255, 0.3)' : 'white',

    '&:hover': {
      backgroundColor: disabled
        ? 'transparent'
        : colors[active ? 'faded' : 'fadedLighterDark'],
      cursor: disabled ? 'default' : 'pointer'
    },

    '&:active, &:active:hover': {
      backgroundColor: disabled ? 'transparent' : colors.faded
    }
  })
);

export default ScreenHeaderNavButton;
