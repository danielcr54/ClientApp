import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styleSettings';

const buttonSize = 48;

export const CircleIconButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: buttonSize,
  height: buttonSize,
  fontSize: 16,
  border: 'none',
  borderRadius: '50%',
  textAlign: 'center',
  backgroundColor: colors.faded,
  color: colors.white,
  outline: 'none',
  transition: 'all 0.2s',

  '&:hover': {
    // TODO: Calculate instead
    backgroundColor: '#514a6f',
    color: colors.white
  }
});

export default CircleIconButton;
