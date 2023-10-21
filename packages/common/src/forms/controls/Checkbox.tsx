import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { FaCheck } from 'react-icons/fa';
import { colors } from '../../styleSettings';

export interface CheckboxStyledProps {
  size?: number;
  large?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

const checkboxSelector = 'input[type="checkbox"]';

const StyledCheckbox = styled('input')(({ disabled }: CheckboxStyledProps) => ({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: disabled ? 'default' : 'pointer'
}));

const StyledCustomCheckbox = styled('div')(
  ({ large, size, disabled, focused }: CheckboxStyledProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: size ? size : large ? 24 : 16,
    height: size ? size : large ? 24 : 16,
    border: `1px solid ${disabled ? 'rgba(255, 255, 255, 0.5)' : colors.white}`,
    borderRadius: 1,
    color: disabled ? 'rgba(255, 255, 255, 0.5)' : colors.white,
    boxShadow:
      focused && !disabled ? '0 0 0px 3px rgba(156, 115, 215, 0.5)' : 'none',
    transition: 'all 0.2s'
  })
);

const Checkmark = styled('div')(
  ({ large, size, disabled }: CheckboxStyledProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: (size ? size : large ? 24 : 16) / 2,
    color: 'transparent',

    [`${checkboxSelector}:checked ~ &`]: {
      color: disabled ? 'rgba(255, 255, 255, 0.5)' : colors.white
    },

    [`${checkboxSelector}:focus ~ &`]: {}
  })
);

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  CheckboxStyledProps;

export function Checkbox({
  large,
  size,
  disabled,
  focused,
  ...otherProps
}: CheckboxProps) {
  return (
    <StyledCustomCheckbox
      large={large}
      size={size}
      disabled={disabled}
      focused={focused}
    >
      <StyledCheckbox type="checkbox" disabled={disabled} {...otherProps} />

      <Checkmark large={large} size={size} disabled={disabled}>
        <FaCheck />
      </Checkmark>
    </StyledCustomCheckbox>
  );
}
