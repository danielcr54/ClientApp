import React, { ReactNode } from 'react';
import { GoCheck as CheckmarkIcon } from 'react-icons/go';
import { IoIosWarning as ErrorIcon } from 'react-icons/io';
import { SpinnerIcon } from '../icons';
import { Button, ButtonProps } from './Button';
import { ButtonIcon } from './buttonElements';

export interface ActionButtonProps extends ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  progressText?: string;
  successText?: string;
  errorText?: string;
}

export function ActionButton({
  children,
  disabled,
  progressText,
  successText,
  errorText,
  ...buttonProps
}: ActionButtonProps) {
  const { inProgress, success, error } = buttonProps;
  const { large, small } = buttonProps;
  const iconSize = large ? 20 : small ? 12 : 16;

  return (
    <Button
      type="button"
      {...buttonProps}
      disabled={disabled || inProgress || success}
    >
      {inProgress ? (
        <>
          <ButtonIcon small={small} large={large}>
            <SpinnerIcon size={iconSize} />
          </ButtonIcon>

          <span>{progressText || 'Processing...'}</span>
        </>
      ) : error ? (
        <>
          <ButtonIcon small={small} large={large}>
            <ErrorIcon />
          </ButtonIcon>

          <span>{errorText || 'Error'}</span>
        </>
      ) : success ? (
        <>
          <ButtonIcon small={small} large={large}>
            <CheckmarkIcon />
          </ButtonIcon>

          <span>{successText || 'Success!'}</span>
        </>
      ) : (
        children || 'Submit'
      )}
    </Button>
  );
}

export default ActionButton;
