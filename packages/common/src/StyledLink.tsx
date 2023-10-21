import React from 'react';
import styled from '@emotion/styled';
import { colors } from './styleSettings';

export interface StyledLinkProps {
  underline?: 'hover' | 'always' | 'never';
  disabled?: boolean;
}

const linkDisabledColor = '#4B4562';

export const StyledLink = styled('a')(
  ({ underline, disabled }: StyledLinkProps) => {
    underline = typeof underline === 'undefined' ? 'hover' : underline;

    return {
      display: 'inline-flex',
      alignItems: 'center',
      padding: 0,
      border: 'none',
      borderRadius: 0,
      fontSize: '1em',
      backgroundColor: 'transparent',
      color: disabled ? linkDisabledColor : colors.secondary,
      textAlign: 'left',
      textDecoration: underline === 'always' ? 'underline' : 'none',
      outline: 'none',

      '&:hover, &:active': {
        textDecoration:
          underline === 'always' || underline === 'hover'
            ? 'underline'
            : 'none',
        backgroundColor: 'transparent',
        color: disabled ? linkDisabledColor : colors.white,
        cursor: disabled ? 'default' : 'pointer'
      }
    };
  }
);

export default StyledLink;
