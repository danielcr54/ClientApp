import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styleSettings';

export interface DropdownContentProps {
  visible?: boolean;
  stretch?: boolean;
  alignRight?: boolean;
}

export const DropdownContent = styled('div')(
  ({ alignRight, visible, stretch }: DropdownContentProps) => {
    return {
      display: 'block',
      visibility: visible ? 'visible' : 'hidden',
      position: 'absolute',
      zIndex: 200,
      top: '100%',
      width: stretch ? '100%' : 'auto',
      borderRadius: 0,
      borderWidth: 0,
      backgroundColor: colors.faded,
      color: 'white',
      boxShadow: '0 5px 18px -5px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.2s',
      right: alignRight ? 0 : 'auto',
      opacity: visible ? 1 : 0,
      // transform: visible
      //   ? 'scale(1) scaleY(1)'
      //   : `scaleX(${stretch ? 1 : 0.95}) scaleY(0.9)`,
      transformOrigin: alignRight ? 'top right' : 'top left'
    };
  }
);

DropdownContent.displayName = 'DropdownContent';

export default DropdownContent;
