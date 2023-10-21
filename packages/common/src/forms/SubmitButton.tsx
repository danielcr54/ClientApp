import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { GoCheck as CheckmarkIcon } from 'react-icons/go';
import { IoIosWarning as ErrorIcon } from 'react-icons/io';
import { deviceScreenQuery } from '../styleSettings';
import { Button, ButtonProps, ButtonIcon } from '../buttons';
import { SpinnerIcon } from '../icons';

const SubmitButtonRoot = styled(Button)(({ block }: ButtonProps) => ({
  minWidth: 150,
  width: '100%',

  [`@media ${deviceScreenQuery.medium}`]: {
    width: block ? '100%' : 'auto'
  }
}));

export interface SubmitButtonProps extends ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  progressText?: string;
  successText?: string;
  errorText?: string;
}

export function SubmitButton({
  children,
  disabled,
  progressText,
  successText,
  errorText,
  ...buttonProps
}: SubmitButtonProps) {
  const { inProgress, success, error } = buttonProps;

  return (
    <SubmitButtonRoot
      type="submit"
      {...buttonProps}
      disabled={disabled || inProgress || success}
    >
      {inProgress ? (
        <>
          <ButtonIcon>
            <SpinnerIcon />
          </ButtonIcon>

          <span>{progressText || 'Processing...'}</span>
        </>
      ) : error ? (
        <>
          <ButtonIcon>
            <ErrorIcon />
          </ButtonIcon>

          <span>{errorText || 'Error'}</span>
        </>
      ) : success ? (
        <>
          <ButtonIcon>
            <CheckmarkIcon />
          </ButtonIcon>

          <span>{successText || 'Success!'}</span>
        </>
      ) : (
        children || 'Submit'
      )}
    </SubmitButtonRoot>
  );
}

export default SubmitButton;
