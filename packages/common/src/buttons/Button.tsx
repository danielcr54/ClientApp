import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { buttonColors } from '../styleSettings';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  inverse?: boolean;
  transparent?: boolean;
  secondary?: boolean;
  danger?: boolean;
  small?: boolean;
  xsmall?: boolean;
  large?: boolean;
  allowWrap?: boolean;
  glow?: boolean;
  disabled?: boolean;
  inProgress?: boolean;
  success?: boolean;
  error?: boolean;
  noPadding?: boolean;
}

export const Button = styled('button')(
  ({
    block,
    inverse,
    transparent,
    secondary,
    danger,
    small,
    xsmall,
    large,
    allowWrap,
    glow,
    noPadding,
    disabled,
    inProgress,
    success,
    error
  }: ButtonProps) => {
    // TODO: Implement in a cleaner way
    const buttonStyleColors =
      buttonColors[
        transparent
          ? 'transparent'
          : inverse
          ? 'inverse'
          : secondary
          ? 'secondary'
          : danger
          ? 'danger'
          : 'default'
      ];

    return {
      flexGrow: block ? 1 : 0,
      display: block ? 'flex' : 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: block ? '100%' : 'auto',
      padding: noPadding
        ? 0
        : large
        ? '22px 22px 21px'
        : small
        ? '8px 13px 7px'
        : xsmall
        ? '5px 8px 4px'
        : '14px 20px 13px',
      fontSize: small || xsmall ? 10 : 13,
      fontWeight: 500,
      lineHeight: 1,
      border: 0,
      borderRadius: 2,
      textTransform: 'uppercase',
      backgroundColor: error
        ? buttonStyleColors.error.background
        : success
        ? buttonStyleColors.success.background
        : disabled
        ? buttonStyleColors.disabled.background
        : buttonStyleColors.background,
      boxShadow:
        disabled || !glow ? 'none' : `0 0 14px -2px ${buttonStyleColors.glow}`,
      transition: 'all 0.2s',
      color: error
        ? buttonStyleColors.error.foreground
        : success
        ? buttonStyleColors.success.foreground
        : disabled
        ? buttonStyleColors.disabled.foreground
        : buttonStyleColors.foreground,
      whiteSpace: allowWrap ? 'normal' : 'nowrap',
      outline: 'none',
      textDecoration: 'none',

      '&:hover': {
        backgroundColor: error
          ? buttonStyleColors.error.background
          : success
          ? buttonStyleColors.success.background
          : disabled
          ? buttonStyleColors.disabled.background
          : buttonStyleColors.hover.background,
        color: error
          ? buttonStyleColors.error.foreground
          : success
          ? buttonStyleColors.success.foreground
          : disabled
          ? buttonStyleColors.disabled.foreground
          : buttonStyleColors.hover.foreground,
        textDecoration: 'none',
        cursor: disabled ? 'default' : 'pointer'
      },

      '&:active, &:active:hover': {
        backgroundColor: error
          ? buttonStyleColors.error.background
          : success
          ? buttonStyleColors.success.background
          : disabled
          ? buttonStyleColors.disabled.background
          : buttonStyleColors.active.background,
        color: error
          ? buttonStyleColors.error.foreground
          : success
          ? buttonStyleColors.success.foreground
          : disabled
          ? buttonStyleColors.disabled.foreground
          : buttonStyleColors.active.foreground,
        textDecoration: 'none',
        boxShadow:
          disabled || !glow ? 'none' : `0 0 0 0 ${buttonStyleColors.glow}`
      }
    };
  }
);

Button.displayName = 'Button';

export default Button;
