import React, { HTMLProps, ReactNode } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown } from 'react-icons/io';
import * as styleSettings from '../styleSettings';

const { inputColors, fonts } = styleSettings;

interface SelectLikeButtonStyledProps {
  small?: boolean;
  xsmall?: boolean;
}

const SelectLikeButtonRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  width: '100%'
});

const SelectLikeButtonButton = styled('div')(
  ({ small, xsmall }: SelectLikeButtonStyledProps) => ({
    display: 'flex',
    width: '100%',
    padding: xsmall 
            ? '6px 10px' 
            : small 
                ? '9px 30px 9px 15px' 
                : '16px 35px 16px 20px',
    fontSize: xsmall ? 11 : 13,
    lineHeight: 1.2,
    fontFamily: fonts.main,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: inputColors.border,
    backgroundColor: inputColors.bg,
    color: inputColors.placeholder,
    outline: 'none',
    transition: 'all 0.2s',
    appearance: 'none',

    '&:focus': {
      borderColor: 'transparent',
      backgroundColor: inputColors.bgFocus,
      color: inputColors.textFocus
    },

    '&:hover': {
      backgroundColor: inputColors.bgFocus,
      color: inputColors.textFocus,
      cursor: 'pointer'
    },

    '&:disabled': {
      borderColor: inputColors.borderDisabled,
      backgroundColor: inputColors.bgDisabled,
      color: inputColors.textDisabled
    }
  })
);

const SelectLikeButtonAddon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 'auto',
  padding: 10,
  fontSize: 18,
  pointerEvents: 'none'
});

export interface SelectLikeButtonProps extends SelectLikeButtonStyledProps {
  onClick?: () => void;
  children?: ReactNode;
}

export function SelectLikeButton({
  onClick,
  children,
  small,
  xsmall
}: SelectLikeButtonProps) {
  return (
    <SelectLikeButtonRoot onClick={onClick}>
      <SelectLikeButtonButton xsmall={xsmall} small={small}>{children}</SelectLikeButtonButton>
      <SelectLikeButtonAddon>
        <IoIosArrowDown />
      </SelectLikeButtonAddon>
    </SelectLikeButtonRoot>
  );
}

export default SelectLikeButton;
