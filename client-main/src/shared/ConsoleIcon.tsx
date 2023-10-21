import React from 'react';
import styled from '@emotion/styled';
import { IoLogoPlaystation, IoLogoXbox } from 'react-icons/io';
import { number } from 'prop-types';

const iconComponents = {
  ps4: IoLogoPlaystation,
  xbox: IoLogoXbox
};

interface StyledConsoleIconProps {
  size?: string | number;
}

const StyledConsoleIcon = styled('div')(({ size }: StyledConsoleIconProps) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: size ? size : 20,
  color: 'white',

  '&:not(:last-of-type)': {
    marginRight: 10
  }
}));

export interface ConsoleIconProps {
  consoleId?: string;
  size?: string | number;
}

export function ConsoleIcon({ consoleId, size }: ConsoleIconProps) {
  if (!consoleId) return null;

  const IconComponent = iconComponents[consoleId];
  return IconComponent ? (
    <StyledConsoleIcon size={size}>
      <IconComponent />
    </StyledConsoleIcon>
  ) : null;
}
