import React from 'react';
import styled from '@emotion/styled';
import { inputColors } from '../styleSettings';

const floatLabelSettings = {
  default: {
    fontSize: 15,
    paddingY: 16,
    paddingX: 20,
    activePaddingOffset: 4
  },

  small: {
    fontSize: 13,
    paddingY: 9,
    paddingX: 12,
    activePaddingOffset: 0
  }
};

export interface FloatLabelProps {
  active?: boolean;
  small?: boolean;
}

export const FloatLabel = styled('label')(
  ({ active, small }: FloatLabelProps) => {
    const settings = floatLabelSettings[small ? 'small' : 'default'];
    const defaultPaddings = `${settings.paddingY}px ${settings.paddingX}px`;
    const activePaddings = `${settings.paddingY -
      settings.activePaddingOffset}px ${
      settings.paddingX
    }px ${settings.paddingY + settings.activePaddingOffset}px`;

    return {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: active ? activePaddings : defaultPaddings,
      fontSize: settings.fontSize,
      lineHeight: 1.2,
      color: active ? 'white' : inputColors.placeholder,
      transformOrigin: `${settings.paddingX}px top`,
      transform: active && !small ? 'scale(0.7)' : 'none',
      transition: 'all 0.2s',
      pointerEvents: 'none',
      opacity: active && small ? 0 : 1,

      // Some CSS fallback assistance
      'input:focus ~ &, select:focus ~ &': {
        padding: activePaddings,
        color: 'white',
        transform: small ? 'none' : 'scale(0.7)',
        opacity: small ? 0 : 1
      }
    };
  }
);

FloatLabel.displayName = 'FloatLabel';

export default FloatLabel;
