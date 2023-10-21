import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const spinAnimation = keyframes({
  '0%': { transform: `rotate(0deg)` },
  '100%': { transform: `rotate(359deg)` }
});

export interface SpinnerIconProps {
  size: number;
  spaceRight?: boolean;
}

export const SpinnerIconRoot = styled('div')(
  {
    display: 'inline-flex',

    '&:after': {
      content: '" "',
      display: 'block',
      borderRadius: '50%',
      border: '1px solid #fff',
      borderColor: '#fff transparent #fff transparent',
      animation: `${spinAnimation} 1.2s infinite linear`
    }
  },
  ({ size, spaceRight }: SpinnerIconProps) => ({
    marginRight: spaceRight ? size / 2 : 0,
    '&:after': {
      width: size,
      height: size
    }
  })
);

export function SpinnerIcon({ size }: Partial<SpinnerIconProps>) {
  return <SpinnerIconRoot size={size || 16} />;
}

export default SpinnerIcon;
