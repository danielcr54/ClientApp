import React from 'react';
import styled from '@emotion/styled';
import { IoIosClose } from 'react-icons/io';
import * as styleSettings from '../styleSettings';

const { colors } = styleSettings;
const defaultButtonSize = 48;

interface CloseModalButtonStyledProps {
  size?: boolean;
}

export const StyledCloseModalButton = styled('button')(
  ({ size }: CloseModalButtonStyledProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: defaultButtonSize,
    height: defaultButtonSize,
    fontSize: 22,
    border: 'none',
    borderRadius: '50%',
    textAlign: 'center',
    backgroundColor: '#73608e',
    color: colors.white,
    outline: 'none',
    transition: 'all 0.2s',

    '&:hover, &:active': {
      backgroundColor: colors.main,
      color: 'white',
      cursor: 'pointer'
    },

    '&:focus': {
      backgroundColor: '#ddd9e9'
    }
  })
);

export interface CloseModalButtonProps extends CloseModalButtonStyledProps {
  onClick?: () => void;
}

export function CloseModalButton(props: CloseModalButtonProps) {
  return (
    <StyledCloseModalButton {...props}>
      <IoIosClose />
    </StyledCloseModalButton>
  );
}

export default CloseModalButton;
