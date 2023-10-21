import React from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export interface ButtonTabProps {
  active?: boolean;
  disabled?: boolean;
}

const buttonTabBorderColor = '#393350';

export const ButtonTab = styled('button')(
  ({ active, disabled }: ButtonTabProps) => ({
    flex: '1 1 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 34,
    padding: '6px 10px',
    fontSize: 13,
    fontWeight: 400,
    border: `1px solid ${active ? 'white' : buttonTabBorderColor}`,
    backgroundColor: active ? 'white' : 'transparent',
    color: active ? 'rgba(35, 31, 50, 0.81)' : 'white',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s',
    cursor: disabled ? 'default' : 'pointer',
    outline: 'none',

    '&:hover, &:focus, &:active': {
      textDecoration: 'none'
    },

    '&:hover, &:active': {
      backgroundColor: active ? 'white' : 'rgba(255, 255, 255, 0.1)',
      color: active ? 'rgba(35, 31, 50, 0.81)' : 'white',
      borderColor: active ? 'white' : buttonTabBorderColor
    },

    '&:not(:last-of-type)': {
      borderRight: 0
    },

    '&:first-of-type': {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2
    },

    '&:last-of-type': {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2
    },

    [`@media ${deviceScreenQuery.small}`]: {
      fontSize: 16
    }
  })
);

ButtonTab.displayName = 'ButtonTab';

export default ButtonTab;
